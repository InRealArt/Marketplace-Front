'use client'
import React from 'react'
import ArtworkPresentation from '@/components/Artwork/ArtworkPresentation'
import ListSlider from '@/components/List/ListSlider'
import Container from '@/components/Common/Container'
import { ArtistWithRelations, ItemPhysicalType } from '@/types'
import { mockArtworks } from '@/mocks/artistDetail'

interface ArtworkDetailClientPageProps {
  artwork: ItemPhysicalType
  artist: ArtistWithRelations | null
  relatedArtists: ArtistWithRelations[]
}

const mockRelatedArtworks = mockArtworks.slice(0, 12)

export default function ArtworkDetailClientPage({
  artwork,
  artist,
  relatedArtists
}: ArtworkDetailClientPageProps) {
  return (
    <main className="mt-[90px] sm:mt-[80px] pb-16">
      <Container className="mt-8 space-y-12">
        <ArtworkPresentation artwork={artwork} artist={artist} />
      </Container>

      <ListSlider
        context="artwork"
        title={`Other artworks by ${artist?.name ?? 'the artist'}`}
        artworks={mockRelatedArtworks}
        backgroundColor="bg-[#1c1c1c]"
      />

      <ListSlider
        context="artist"
        artists={relatedArtists}
        title="Associated Artists"
      />
    </main>
  )
}

