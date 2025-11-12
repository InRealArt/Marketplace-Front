import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import ArtworkDetailClientPage from './ArtworkDetailClientPage'
import ArtworkDetailSkeleton from '@/components/Artwork/ArtworkDetailSkeleton'
import {
  getArtworkBySlug,
  getArtworkArtist,
  getArtworkRelatedArtists
} from '@/mocks/artworkDetail'

interface ArtworkPageProps {
  params: Promise<{
    slug: string
  }>
}

async function ArtworkContent({ slug }: { slug: string }) {
  const artwork = await getArtworkBySlug(slug)

  if (!artwork) {
    notFound()
  }

  const [artist, relatedArtists] = await Promise.all([
    getArtworkArtist(slug),
    getArtworkRelatedArtists(slug)
  ])

  return (
    <ArtworkDetailClientPage
      artwork={artwork}
      artist={artist}
      relatedArtists={relatedArtists}
    />
  )
}

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { slug } = await params

  return (
    <Suspense fallback={<ArtworkDetailSkeleton />}>
      <ArtworkContent slug={slug} />
    </Suspense>
  )
}
