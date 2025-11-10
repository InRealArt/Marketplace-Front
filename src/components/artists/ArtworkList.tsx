'use client'
import React, { useTransition } from 'react'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import ArtworkCard from '@/components/Card/ArtworkCard'
import ArtworksFilter from '@/components/artists/ArtworksFilter'
import ArtworksEmptyState from '@/components/EmptyStates/ArtworksEmptyState'
import Pagination from '@/components/ui/Pagination'
import { ItemPhysicalType } from '@/types'

interface ArtworkListProps {
  artworks: ItemPhysicalType[]
  totalPages: number
  currentPage: number
  totalResults: number
  priceRanges: { value: string, label: string }[]
  sizes: { value: string, label: string }[]
  materials: { value: string, label: string }[]
  types: { value: string, label: string }[]
  title?: string
  className?: string
}

const ArtworkList = ({
  artworks,
  totalPages,
  currentPage,
  totalResults,
  priceRanges,
  sizes,
  materials,
  types,
  title,
  className = ''
}: ArtworkListProps) => {
  const [, startTransition] = useTransition()

  const [params, setParams] = useQueryStates({
    page: parseAsInteger.withDefault(1).withOptions({ shallow: false, startTransition }),
    priceRange: parseAsString.withDefault('').withOptions({ shallow: false, startTransition }),
    size: parseAsString.withDefault('').withOptions({ shallow: false, startTransition }),
    material: parseAsString.withDefault('').withOptions({ shallow: false, startTransition }),
    type: parseAsString.withDefault('').withOptions({ shallow: false, startTransition })
  })

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setParams({ page: newPage })
    }
  }

  const handleResetFilters = () => {
    setParams({ 
      page: 1, 
      priceRange: '', 
      size: '', 
      material: '', 
      type: '' 
    })
  }

  // Check if any filters are active
  const hasActiveFilters = 
    params.priceRange !== '' || 
    params.size !== '' || 
    params.material !== '' || 
    params.type !== ''

  return (
    <div className={`${className}`}>
      {/* Optional title */}
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
          {title}
        </h2>
      )}

      {/* Filters */}
      <ArtworksFilter
        priceRanges={priceRanges}
        sizes={sizes}
        materials={materials}
        types={types}
        params={params}
        setParams={setParams}
        artworksLength={totalResults}
      />

      {/* Artworks grid or empty state */}
      {artworks.length === 0 ? (
        <ArtworksEmptyState 
          hasFilters={hasActiveFilters}
          onResetFilters={handleResetFilters}
        />
      ) : (
        <>
          {/* Artworks grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artworks.map(artwork => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mt-8"
          />
        </>
      )}
    </div>
  )
}

export default ArtworkList

