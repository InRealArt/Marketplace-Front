'use client'

import { useTransition } from 'react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { Input } from '@/components/ui/input'
import ArtworkCard from '@/components/client/artwork/ArtworkCard'
import ArtworkCardSkeleton from '@/components/client/artwork/ArtworkCardSkeleton'
import Pagination from '@/components/ui/Pagination'

// Type pour les items retournés par getItemsByMedium (basé sur le retour de Prisma)
type ArtworkItem = Awaited<ReturnType<typeof import('@/data/item/getItemsByMedium').getItemsByMedium>>[0]

interface PaginationInfo {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  currentItemsCount: number
  totalItems: number
  itemsPerPage: number
}

interface ArtworksClientProps {
  artworks: ArtworkItem[]
  paginationInfo: PaginationInfo
  mediumName: string
}

export default function ArtworksClient({ artworks, paginationInfo, mediumName }: ArtworksClientProps) {
  const [isLoading, startTransition] = useTransition()

  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger
      .withDefault(1)
      .withOptions({ shallow: false, startTransition })
  )

  const [search, setSearch] = useQueryState('query', {
    defaultValue: '',
    shallow: false,
    startTransition
  })

  const handleNextPage = () => {
    if (paginationInfo.hasNextPage) {
      setPage(page + 1)
    }
  }
  
  const handlePreviousPage = () => {
    if (paginationInfo.hasPreviousPage) {
      setPage(page - 1)
    }
  }
  
  const handlePageChange = (newPage: number) => {
    // Vérifier que la page demandée existe
    if (newPage >= 1 && newPage <= paginationInfo.totalPages) {
      setPage(newPage)
    }
  }
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value)

  // Filtrer les œuvres selon la recherche
  const filteredArtworks = artworks.filter(artwork => 
    search === '' || 
    artwork.name.toLowerCase().includes(search.toLowerCase()) ||
    artwork.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      {isLoading ? (
        <div className="grid grid-cols-1 gap-x-12 gap-y-20 sm:grid-cols-2 sm:gap-x-16 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-20">
          {Array.from({ length: paginationInfo.itemsPerPage }).map((_, index) => (
            <div key={index}>
              <ArtworkCardSkeleton />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtworks.map(artwork => (
              <div key={artwork.id}>
                <ArtworkCard
                  artistName=""
                  artworkName={artwork.name}
                  price={0}
                  dimensions=""
                  technique={mediumName}
                  imageUrl={artwork.mainImageUrl || undefined}
                  slug={artwork.slug || ''}
                />
              </div>
            ))}
          </div>

          {/* Pagination sous la grille - seulement si nécessaire */}
          {paginationInfo.totalPages > 1 && (
            <Pagination
              currentPage={paginationInfo.currentPage}
              totalPages={paginationInfo.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {filteredArtworks.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            {search ? `No artwork found for this search.` : `No artwork available.`}
          </p>
        </div>
      )}
    </>
  )
} 