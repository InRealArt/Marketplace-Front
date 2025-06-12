'use client'

import { useTransition } from 'react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { Input } from '@/components/ui/input'
import ArtworkCard from '@/components/client/artwork/ArtworkCard'
import ArtworkCardSkeleton from '@/components/client/artwork/ArtworkCardSkeleton'
import Pagination from '@/components/ui/Pagination'

// Type pour les items retournés par getItemsByMedium (basé sur le retour de Prisma)
type PaintingItem = Awaited<ReturnType<typeof import('@/data/item/getItemsByMedium').getItemsByMedium>>[0]

interface PaginationInfo {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  currentItemsCount: number
  totalItems: number
  itemsPerPage: number
}

interface PaintingsClientProps {
  paintings: PaintingItem[]
  paginationInfo: PaginationInfo
}

export default function PaintingsClient({ paintings, paginationInfo }: PaintingsClientProps) {
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

  // Filtrer les peintures selon la recherche
  const filteredPaintings = paintings.filter(painting => 
    search === '' || 
    painting.name.toLowerCase().includes(search.toLowerCase()) ||
    painting.description.toLowerCase().includes(search.toLowerCase()) ||
    (painting.user.firstName && painting.user.firstName.toLowerCase().includes(search.toLowerCase())) ||
    (painting.user.lastName && painting.user.lastName.toLowerCase().includes(search.toLowerCase()))
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
            {filteredPaintings.map(painting => {
              const artistName = [painting.user.firstName, painting.user.lastName]
                .filter(Boolean)
                .join(' ')
              
              const physicalPrice = painting.physicalItem ? Number(painting.physicalItem.price) : undefined
              const nftPrice = painting.nftItem ? Number(painting.nftItem.price) : undefined
              const isSold = painting.physicalItem?.status === 'sold' || painting.nftItem?.status === 'sold'
              
              return (
                <div key={painting.id}>
                  <ArtworkCard
                    title={painting.name}
                    artist={artistName || undefined}
                    year={painting.physicalItem?.creationYear || undefined}
                    medium={painting.medium?.name || 'Peinture'}
                    physicalPrice={physicalPrice}
                    nftPrice={nftPrice}
                    isSold={isSold}
                    imageUrl={painting.mainImageUrl || undefined}
                    width={painting.physicalItem?.width ? Number(painting.physicalItem.width) : undefined}
                    height={painting.physicalItem?.height ? Number(painting.physicalItem.height) : undefined}
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

      {filteredPaintings.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            {search ? 'Aucune peinture trouvée pour cette recherche.' : 'Aucune peinture disponible.'}
          </p>
        </div>
      )}
    </>
  )
} 