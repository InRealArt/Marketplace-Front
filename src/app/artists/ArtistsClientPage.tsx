'use client'
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createParamUpdater } from '@/lib/utils/urlUtils'
import ArtistsFilter from '@/components/artists/ArtistsFilter'
import ArtistCard from '@/components/Card/ArtistCard'
import Pagination from '@/components/ui/Pagination'
import { ArtistWithRelations } from '@/types'

interface ArtistsClientPageProps {
  artists: ArtistWithRelations[]
  nationalities: { code: string; label: string }[]
  totalPages: number
  currentPage: number
  totalResults: number
  initialParams: {
    page: number
    nationality: string
    q: string
  }
}

export default function ArtistsClientPage({
  artists,
  nationalities,
  totalPages,
  currentPage,
  totalResults,
  initialParams
}: ArtistsClientPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Create URL parameter updater using utility function
  const setParams = createParamUpdater(
    router,
    searchParams,
    '/artists',
    initialParams,
    { page: 1, nationality: '', q: '' } // Default values to omit from URL
  )

  return (
    <div className="m-auto mt-10">
      <ArtistsFilter
        nationalities={nationalities}
        params={initialParams}
        setParams={setParams}
        artistsLength={totalResults}
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {artists.map(artist => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
      
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setParams({ page })}
        className="mt-8"
      />
    </div>
  )
}
