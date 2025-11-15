import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import ArtistDetailClientPage from './ArtistDetailClientPage'
import ArtistNotFoundEmptyState from '@/components/EmptyStates/ArtistNotFoundEmptyState'
import ArtistIntroSectionSkeleton from '@/components/artists/ArtistIntroSectionSkeleton'
import { getArtistBySlug, getArtworksByArtistSlug, getCollectionsByArtistSlug, mockArtistIntro, mockArtistBiography, mockFilterOptions } from '@/mocks/artistDetail'

interface ArtistPageProps {
  params: Promise<{
    slug: string
  }>
}

async function ArtistContent({ slug }: { slug: string }) {
  // Fetch artist data
  const artist = await getArtistBySlug(slug)

  // Show not found state if artist doesn't exist
  if (!artist) {
    return <ArtistNotFoundEmptyState slug={slug} />
  }

  // Fetch related data
  const [artworks, collections] = await Promise.all([
    getArtworksByArtistSlug(slug),
    getCollectionsByArtistSlug(slug)
  ])

  return (
    <ArtistDetailClientPage
      artist={artist}
      artworks={artworks}
      collections={collections}
      introData={mockArtistIntro}
      biographyData={mockArtistBiography}
      filterOptions={mockFilterOptions}
    />
  )
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { slug } = await params

  return (
    <Suspense fallback={<ArtistIntroSectionSkeleton />}>
      <ArtistContent slug={slug} />
    </Suspense>
  )
} 