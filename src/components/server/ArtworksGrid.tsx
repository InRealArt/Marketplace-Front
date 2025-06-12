import { z } from 'zod'
import { getItemsByMedium } from '@/data/item/getItemsByMedium'
import { getAllItems } from '@/data/item/getAllItems'
import ArtworkClient from '@/components/client/ArtworksClient'
import { getTotalItemsByMedium } from '@/data/item/getTotalItemsByMedium'
import { getTotalItems } from '@/data/item/getTotalItems'
import { getArtworkMediumByName } from '@/data/artworkMedium/getArtworkMediumByName'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const MAX_ITEMS_PER_PAGE = 2

const querySchema = z.object({
  query: z.string().optional(),
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(MAX_ITEMS_PER_PAGE)
})

interface ArtworksGridProps {
  searchParams: SearchParams
  mediumName?: string
}

export default async function ArtworksGrid({ searchParams, mediumName }: ArtworksGridProps) {
  const searchParamsResolved = await searchParams
  const query = querySchema.parse(searchParamsResolved)
  
  try {
    let rawArtworks
    let totalArtworks

    // Si un mediumName est fourni, filtrer par ce medium
    if (mediumName) {
      const artworkMedium = await getArtworkMediumByName(mediumName)
      
      if (!artworkMedium) {
        return (
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="text-center text-red-500">
                Medium "{mediumName}" non trouvé
              </div>
            </div>
          </section>
        )
      }
      
      // Récupérer les œuvres par medium
      rawArtworks = await getItemsByMedium(artworkMedium.id, {
        page: query.page,
        limit: query.limit
      })
      
      // Compter le total par medium
      totalArtworks = await getTotalItemsByMedium(artworkMedium.id)
    } else {
      // Récupérer toutes les œuvres
      rawArtworks = await getAllItems({
        page: query.page,
        limit: query.limit
      })
      
      // Compter le total de tous les items
      totalArtworks = await getTotalItems()
    }

    // Convertir les valeurs Decimal en nombres pour éviter l'erreur de sérialisation
    const artworks = rawArtworks.map(artwork => ({
      ...artwork,
      physicalItem: artwork.physicalItem ? {
        ...artwork.physicalItem,
        price: Number(artwork.physicalItem.price),
        height: artwork.physicalItem.height ? Number(artwork.physicalItem.height) : null,
        width: artwork.physicalItem.width ? Number(artwork.physicalItem.width) : null,
        weight: artwork.physicalItem.weight ? Number(artwork.physicalItem.weight) : null,
        unitHeight: artwork.physicalItem.unitHeight ? Number(artwork.physicalItem.unitHeight) : null,
        unitWidth: artwork.physicalItem.unitWidth ? Number(artwork.physicalItem.unitWidth) : null,
        unitWeight: artwork.physicalItem.unitWeight ? Number(artwork.physicalItem.unitWeight) : null
      } : null,
      nftItem: artwork.nftItem ? {
        ...artwork.nftItem,
        price: Number(artwork.nftItem.price)
      } : null
    })) as Awaited<ReturnType<typeof getItemsByMedium>>

    const totalPages = Math.ceil(totalArtworks / query.limit)
    const hasNextPage = query.page < totalPages
    const hasPreviousPage = query.page > 1
    const currentItemsCount = artworks.length

    // Informations de pagination plus précises
    const paginationInfo = {
      currentPage: query.page,
      totalPages: totalPages,
      hasNextPage: hasNextPage,
      hasPreviousPage: hasPreviousPage,
      currentItemsCount: currentItemsCount,
      totalItems: totalArtworks,
      itemsPerPage: query.limit
    }

    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <ArtworkClient 
            artworks={artworks} 
            paginationInfo={paginationInfo}
            mediumName={mediumName || 'Artwork'}
          />
        </div>
      </section>
    )
  } catch (error) {
    console.error(`Error loading ${mediumName ? mediumName.toLowerCase() : 'artworks'}:`, error)
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">
            Erreur lors du chargement des œuvres
          </div>
        </div>
      </section>
    )
  }
} 