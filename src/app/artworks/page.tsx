import { Suspense } from 'react'
import Container from '@/components/Common/Container'
import ArtworksHero from '@/components/artworks/ArtworksHero'
import ArtworksClientPage from './ArtworksClientPage'
import ArtworksLoadingSkeleton from '@/components/artworks/ArtworksLoadingSkeleton'
import { mockArtworks, mockFilterOptions } from '@/mocks/artistDetail'
import { filterArtworks, paginateArtworks, parseArtworkSearchParams } from '@/lib/utils/artworkUtils'

interface ArtworksPageProps {
  searchParams: Promise<{
    page?: string
    priceRange?: string
    size?: string
    material?: string
    type?: string
  }>
}

async function ArtworksContent({ searchParams }: ArtworksPageProps) {
  const resolvedSearchParams = await searchParams
  const { page, priceRange, size, material, type } = parseArtworkSearchParams(resolvedSearchParams)

  const filtered = filterArtworks(mockArtworks, { priceRange, size, material, type })
  const PAGE_SIZE = 16
  const pagination = paginateArtworks(filtered, page, PAGE_SIZE)

  return (
    <Container className="!mt-[40px]">
      <ArtworksClientPage
        artworks={pagination.items}
        totalPages={pagination.totalPages}
        currentPage={pagination.currentPage}
        totalResults={filtered.length}
        priceRanges={mockFilterOptions.priceRanges}
        sizes={mockFilterOptions.sizes}
        materials={mockFilterOptions.materials}
        types={mockFilterOptions.types}
        filtersClassName="top-[69px] md:top-[79px]"
      />
    </Container>
  )
}

const ArtworksPage = ({ searchParams }: ArtworksPageProps) => {
  return (
    <main>
      <ArtworksHero />
      <Suspense
        fallback={
          <Container className="mt-[40px]">
            <ArtworksLoadingSkeleton />
          </Container>
        }
      >
        <ArtworksContent searchParams={searchParams} />
      </Suspense>
    </main>
  )
}

export default ArtworksPage
