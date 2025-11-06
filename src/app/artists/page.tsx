import { Suspense } from 'react'
import { fetchArtists } from '@/lib/artists'
import { filterArtists, extractNationalities, paginateItems } from '@/lib/utils/artistUtils'
import { parseArtistSearchParams } from '@/lib/utils/urlUtils'
import ArtistsClientPage from './ArtistsClientPage'
import ArtistsHero from '@/components/artists/ArtistsHero'
import ArtistsLoadingSkeleton from '@/components/artists/ArtistsLoadingSkeleton'
import Container from '@/components/Common/Container'

interface ArtistsPageProps {
  searchParams: Promise<{
    page?: string
    nationality?: string
    q?: string
  }>
}

async function ArtistsContent({ searchParams }: ArtistsPageProps) {
  // Fetch data directly in the Server Component (Next.js recommended pattern)
  const allArtists = await fetchArtists()

  // Await search params before parsing
  const resolvedSearchParams = await searchParams
  const { page, nationality, q: query } = parseArtistSearchParams(resolvedSearchParams)

  // Filter artists using utility function
  const filteredArtists = filterArtists(allArtists, nationality, query)

  // Paginate results using utility function
  const PAGE_SIZE = 16
  const pagination = paginateItems(filteredArtists, page, PAGE_SIZE)

  // Extract nationalities for filter using utility function
  const nationalities = extractNationalities(allArtists)
  
  return (
    <Container className="!mt-[40px]">
      <ArtistsClientPage
        artists={pagination.items}
        nationalities={nationalities}
        totalPages={pagination.totalPages}
        currentPage={pagination.currentPage}
        totalResults={filteredArtists.length}
      />
    </Container>
  )
}

export default function ArtistsPage({ searchParams }: ArtistsPageProps) {
  return (
    <main>
      <ArtistsHero />
      <Suspense fallback={
        <Container className="mt-[40px]">
          <ArtistsLoadingSkeleton />
        </Container>
      }>
        <ArtistsContent searchParams={searchParams} />
      </Suspense>
    </main>
  )
}