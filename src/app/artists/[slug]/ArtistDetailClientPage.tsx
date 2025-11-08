'use client'
import React from 'react'
import ArtistIntroSection from './subComponents/ArtistIntroSection'
import ArtworkList from '@/components/artists/ArtworkList'
import Container from '@/components/Common/Container'
import { ArtistWithRelations, ItemPhysicalType } from '@/types'

interface ArtistDetailClientPageProps {
  artist: ArtistWithRelations
  artworks: ItemPhysicalType[]
  collections: any[] // TODO: Type this properly when collections are ready
  introData?: {
    artistPhoto?: string
    artistBackground?: string
    citation?: string
    shortBio?: string
  }
  filterOptions: {
    priceRanges: { value: string, label: string }[]
    sizes: { value: string, label: string }[]
    materials: { value: string, label: string }[]
    types: { value: string, label: string }[]
  }
}

export default function ArtistDetailClientPage({
  artist,
  artworks,
  collections,
  introData,
  filterOptions
}: ArtistDetailClientPageProps) {
  // Pagination configuration
  const ITEMS_PER_PAGE = 12
  const currentPage = 1 // This will be managed by nuqs in ArtworkList
  
  // Calculate pagination
  const totalPages = Math.ceil(artworks.length / ITEMS_PER_PAGE)
  
  // Slice artworks for current page (for initial render)
  // Note: The actual pagination will be handled by nuqs in ArtworkList component
  const paginatedArtworks = artworks.slice(0, ITEMS_PER_PAGE)

  return (
    <main>
      {/* Intro section with artist photo, citation and short bio */}
      <ArtistIntroSection
        artist={artist}
        artistPhoto={introData?.artistPhoto || ''}
        artistBackground={introData?.artistBackground || ''}
        citation={introData?.citation || ''}
        shortBio={introData?.shortBio || ''}
      />

      {/* Artworks section with filters and grid */}
      <Container>
        <ArtworkList
          artworks={paginatedArtworks}
          totalPages={totalPages}
          currentPage={currentPage}
          totalResults={artworks.length}
          priceRanges={filterOptions.priceRanges}
          sizes={filterOptions.sizes}
          materials={filterOptions.materials}
          types={filterOptions.types}
          title={`All artworks of ${artist.name} ${artist.surname}`}
        />
      </Container>
    </main>
  )
}

