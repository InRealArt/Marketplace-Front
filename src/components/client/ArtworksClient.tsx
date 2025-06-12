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
    artwork.description.toLowerCase().includes(search.toLowerCase()) ||
    (artwork.user.firstName && artwork.user.firstName.toLowerCase().includes(search.toLowerCase())) ||
    (artwork.user.lastName && artwork.user.lastName.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <>
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div className="text-gray-400 text-sm">
            {paginationInfo.totalItems > 0 && (
              <span>
                {paginationInfo.totalItems} artwork{paginationInfo.totalItems > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </header>

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
          <div className="grid grid-cols-1 gap-x-16 gap-y-20 sm:grid-cols-2 sm:gap-x-16 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-24">
            {filteredArtworks.map(artwork => {
              const artistName = [artwork.user.firstName, artwork.user.lastName]
                .filter(Boolean)
                .join(' ')
              
              const physicalPrice = artwork.physicalItem ? Number(artwork.physicalItem.price) : undefined
              const nftPrice = artwork.nftItem ? Number(artwork.nftItem.price) : undefined
              const isSold = artwork.physicalItem?.status === 'sold' || artwork.nftItem?.status === 'sold'
              
              return (
                <div key={artwork.id}>
                  <ArtworkCard
                    title={artwork.name}
                    artist={artistName || undefined}
                    year={artwork.physicalItem?.creationYear || undefined}
                    medium={artwork.medium?.name || mediumName}
                    physicalPrice={physicalPrice}
                    nftPrice={nftPrice}
                    isSold={isSold}
                    imageUrl={artwork.mainImageUrl || undefined}
                    width={artwork.physicalItem?.width ? Number(artwork.physicalItem.width) : undefined}
                    height={artwork.physicalItem?.height ? Number(artwork.physicalItem.height) : undefined}
                  />
                </div>
              )
            })}
          </div>

          {/* Pagination sous la grille - seulement si nécessaire */}
          {paginationInfo.totalPages > 1 && (
            <Pagination
              currentPage={paginationInfo.currentPage}
              totalPages={paginationInfo.totalPages}
              onPageChange={handlePageChange}
              onNext={handleNextPage}
              onPrevious={handlePreviousPage}
              disabled={isLoading}
              hasNext={paginationInfo.hasNextPage}
              hasPrevious={paginationInfo.hasPreviousPage}
            />
          )}
        </>
      )}

      {filteredArtworks.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            {search ? `Aucune œuvre trouvée pour cette recherche.` : `Aucune œuvre disponible.`}
          </p>
        </div>
      )}
    </>
  )
} 