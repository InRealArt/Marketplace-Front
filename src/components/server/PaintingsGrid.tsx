import { z } from 'zod'
import { getItemsByMedium } from '@/data/item/getItemsByMedium'
import PaintingsClient from '@/components/client/PaintingsClient'
import { ARTWORK_MEDIUMS } from '@/lib/constants/mediums'
import prisma from '@/lib/prisma'
import { getTotalPaintings } from '@/data/item/getTotalPaintings'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const querySchema = z.object({
  query: z.string().optional(),
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(1)
})

export default async function PaintingsGrid(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const query = querySchema.parse(searchParams)
  
  try {
    // Récupérer les peintures pour la page actuelle
    const rawPaintings = await getItemsByMedium(ARTWORK_MEDIUMS.PEINTURE, {
      page: query.page,
      limit: query.limit
    })

    // Convertir les valeurs Decimal en nombres pour éviter l'erreur de sérialisation
    const paintings = rawPaintings.map(painting => ({
      ...painting,
      physicalItem: painting.physicalItem ? {
        ...painting.physicalItem,
        price: Number(painting.physicalItem.price),
        height: painting.physicalItem.height ? Number(painting.physicalItem.height) : null,
        width: painting.physicalItem.width ? Number(painting.physicalItem.width) : null,
        weight: painting.physicalItem.weight ? Number(painting.physicalItem.weight) : null,
        unitHeight: painting.physicalItem.unitHeight ? Number(painting.physicalItem.unitHeight) : null,
        unitWidth: painting.physicalItem.unitWidth ? Number(painting.physicalItem.unitWidth) : null,
        unitWeight: painting.physicalItem.unitWeight ? Number(painting.physicalItem.unitWeight) : null
      } : null,
      nftItem: painting.nftItem ? {
        ...painting.nftItem,
        price: Number(painting.nftItem.price)
      } : null
    })) as Awaited<ReturnType<typeof getItemsByMedium>>

    // Calculer le nombre total de peintures pour la pagination
    const totalPaintings = await getTotalPaintings()

    const totalPages = Math.ceil(totalPaintings / query.limit)
    const hasNextPage = query.page < totalPages
    const hasPreviousPage = query.page > 1
    const currentItemsCount = paintings.length

    // Informations de pagination plus précises
    const paginationInfo = {
      currentPage: query.page,
      totalPages: totalPages,
      hasNextPage: hasNextPage,
      hasPreviousPage: hasPreviousPage,
      currentItemsCount: currentItemsCount,
      totalItems: totalPaintings,
      itemsPerPage: query.limit
    }

    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <PaintingsClient 
            paintings={paintings} 
            paginationInfo={paginationInfo}
          />
        </div>
      </section>
    )
  } catch (error) {
    console.error('Error loading paintings:', error)
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">
            Error loading paintings
          </div>
        </div>
      </section>
    )
  }
} 