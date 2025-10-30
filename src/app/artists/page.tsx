import { Suspense } from 'react'
import { fetchArtists } from '@/lib/artists'
import { filterArtists, extractNationalities, paginateItems } from '@/lib/utils/artistUtils'
import { parseArtistSearchParams } from '@/lib/utils/urlUtils'
import ArtistsClientPage from './ArtistsClientPage'
import ArtistsHero from '@/components/artists/ArtistsHero'
import Container from '@/components/Common/Container'

interface ArtistsPageProps {
  searchParams: Promise<{
    page?: string
    nationality?: string
    q?: string
  }>
}

export default async function ArtistsPage({ searchParams }: ArtistsPageProps) {
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
    <main>
      <ArtistsHero />
      <Suspense fallback={<div>Loading artists...</div>}>
        <Container>
          <ArtistsClientPage
            artists={pagination.items}
            nationalities={nationalities}
            totalPages={pagination.totalPages}
            currentPage={pagination.currentPage}
            totalResults={filteredArtists.length}
            initialParams={{
              page: pagination.currentPage,
              nationality,
              q: query
            }}
          />
        </Container>
      </Suspense>
    </main>
  )
}