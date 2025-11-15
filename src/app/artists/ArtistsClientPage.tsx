'use client'
import React, { useTransition } from 'react'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import ArtistsFilter from '@/components/artists/ArtistsFilter'
import ArtistList from '@/components/artists/ArtistList'
import ArtistsEmptyState from '@/components/EmptyStates/ArtistsEmptyState'
import Pagination from '@/components/ui/Pagination'
import { ArtistWithRelations } from '@/types'

interface ArtistsClientPageProps {
  artists: ArtistWithRelations[]
  nationalities: { code: string; label: string }[]
  totalPages: number
  currentPage: number
  totalResults: number
}

export default function ArtistsClientPage({
  artists,
  nationalities,
  totalPages,
  currentPage,
  totalResults
}: ArtistsClientPageProps) {
  const [, startTransition] = useTransition()

  const [params, setParams] = useQueryStates({
    page: parseAsInteger.withDefault(1).withOptions({ shallow: false, startTransition }),
    nationality: parseAsString.withDefault('').withOptions({ shallow: false, startTransition }),
    q: parseAsString.withDefault('').withOptions({ shallow: false, startTransition })
  })

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setParams({ page: newPage })
    }
  }

  const handleResetFilters = () => {
    setParams({ 
      page: 1, 
      nationality: '', 
      q: '' 
    })
  }

  // Check if any filters are active
  const hasActiveFilters = params.nationality !== '' || params.q !== ''

  return (
    <div className="relative m-auto mt-10">
      <ArtistsFilter
        nationalities={nationalities}
        params={params}
        setParams={setParams}
        artistsLength={totalResults}
      />
      
      {/* Show empty state if no artists found */}
      {artists.length === 0 ? (
        <ArtistsEmptyState 
          hasFilters={hasActiveFilters}
          onResetFilters={handleResetFilters}
        />
      ) : (
        <>
          <ArtistList artists={artists} />
          
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
