import { z } from 'zod'
import { getItemsByMedium } from '@/data/item/getItemsByMedium'
import { getAllItems } from '@/data/item/getAllItems'
import { getNewItems } from '@/data/item/getNewItems'
import ArtworkClient from '@/components/client/ArtworksClient'
import { getTotalItemsByMedium } from '@/data/item/getTotalItemsByMedium'
import { getTotalItems } from '@/data/item/getTotalItems'
import { getTotalNewItems } from '@/data/item/getTotalNewItems'
import { getTotalItemsFiltered } from '@/data/item/getTotalItemsFiltered'
import { getTotalNewItemsFiltered } from '@/data/item/getTotalNewItemsFiltered'
import { getTotalItemsByMediumFiltered } from '@/data/item/getTotalItemsByMediumFiltered'
import { getArtworkMediumByName } from '@/data/artworkMedium/getArtworkMediumByName'
import { getMaxPrice } from '@/data/item/getMaxPrice'
import { getAllTechniques } from '@/data/artworkTechnique/getAllTechniques'
import { FiltersSection } from '@/components/client/filter'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const MAX_ITEMS_PER_PAGE = 2

const querySchema = z.object({
  query: z.string().optional(),
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(MAX_ITEMS_PER_PAGE),
  price_min: z.coerce.number().optional().default(0),
  price_max: z.coerce.number().optional().default(500000),
  technique: z.coerce.number().optional().default(0),
  sort: z.string().optional().default('price')
})

interface ArtworksGridProps {
  searchParams: SearchParams
  mediumName?: string
  showNewItems?: boolean
}

export default async function ArtworksGrid({ searchParams, mediumName, showNewItems }: ArtworksGridProps) {
  const searchParamsResolved = await searchParams
  const query = querySchema.parse(searchParamsResolved)
  
  console.log('ArtworksGrid query:', query)
  
  try {
    let rawArtworks
    let totalArtworks
    let filteredTotalArtworks: number
    let artworkMedium: any = null

    // Récupérer le prix maximum de la base de données
    const maxPrice = await getMaxPrice()
    
    // Récupérer toutes les techniques disponibles
    const techniques = await getAllTechniques()

    const filterOptions = {
      priceMin: query.price_min,
      priceMax: query.price_max,
      techniqueId: query.technique
    }

    // Si showNewItems est true, récupérer les nouveautés
    if (showNewItems) {
      // Récupérer les nouveaux items
      rawArtworks = await getNewItems({
        page: query.page,
        limit: query.limit === 2 ? 6 : query.limit, // Utiliser 6 par défaut pour les nouveautés
        priceMin: query.price_min,
        priceMax: query.price_max,
        techniqueId: query.technique
      })
      
      // Compter le total des nouveaux items (sans filtres)
      totalArtworks = await getTotalNewItems()
      
      // Compter le total des nouveaux items filtrés
      filteredTotalArtworks = await getTotalNewItemsFiltered(filterOptions)
    } else if (mediumName) {
      // Si un mediumName est fourni, filtrer par ce medium
      artworkMedium = await getArtworkMediumByName(mediumName)
      
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
        limit: query.limit,
        priceMin: query.price_min,
        priceMax: query.price_max,
        techniqueId: query.technique
      })
      
      // Compter le total par medium (sans filtres)
      totalArtworks = await getTotalItemsByMedium(artworkMedium.id)
      
      // Compter le total par medium filtré
      filteredTotalArtworks = await getTotalItemsByMediumFiltered(artworkMedium.id, filterOptions)
    } else {
      // Récupérer toutes les œuvres
      rawArtworks = await getAllItems({
        page: query.page,
        limit: query.limit,
        priceMin: query.price_min,
        priceMax: query.price_max,
        techniqueId: query.technique
      })
      
      // Compter le total de tous les items (sans filtres)
      totalArtworks = await getTotalItems()
      
      // Compter le total de tous les items filtrés
      filteredTotalArtworks = await getTotalItemsFiltered(filterOptions)
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
    })) as typeof rawArtworks

    const totalPages = Math.ceil(filteredTotalArtworks / query.limit)
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
      totalItems: filteredTotalArtworks,
      itemsPerPage: query.limit
    }

    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Section des filtres */}
          <div className="mb-8">
            <FiltersSection 
              totalItems={totalArtworks}
              filteredItemsCount={filteredTotalArtworks}
              maxPrice={maxPrice} 
              techniques={techniques}
            />
          </div>
          
          <ArtworkClient 
            artworks={artworks} 
            paginationInfo={paginationInfo}
            mediumName={showNewItems ? 'Nouveautés' : (mediumName || 'Artwork')}
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