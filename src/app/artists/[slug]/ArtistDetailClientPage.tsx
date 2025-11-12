'use client'
import React, { useRef } from 'react'
import { Grid, User } from 'lucide-react'
import ArtistIntroSection from './subComponents/ArtistIntroSection'
import ArtistBiographySection from './subComponents/ArtistBiographySection'
import ArtworkList from '@/components/artists/ArtworkList'
import ScrollNavigation from '@/components/Common/ScrollNavigation'
import { TabItem } from '@/components/Common/Tabs'
import Container from '@/components/Common/Container'
import { useScrollNavigation } from '@/hooks/useScrollNavigation'
import { ArtistWithRelations, ItemPhysicalType } from '@/types'

type BiographyData = {
  portraitImage?: string
  soloExhibitions?: Array<{ year: string; exhibition: string; venue: string; location: string }>
  groupExhibitions?: Array<{ year: string; exhibition: string; venue: string; location: string }>
  publicSales?: Array<{ title: string; artworkYear?: string; date: string; price?: string; estimation?: string; auctionHouse: string; details?: string }>
  publications?: Array<{ year: string; description: string }>
}

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
  biographyData?: BiographyData
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
  biographyData,
  filterOptions
}: ArtistDetailClientPageProps) {
  // Refs for sections
  const artworksRef = useRef<HTMLDivElement>(null)
  const biographyRef = useRef<HTMLDivElement>(null)

  // Scroll navigation hook
  const { activeSection, scrollToSection } = useScrollNavigation(
    [
      { id: 'artworks', ref: artworksRef },
      { id: 'biography', ref: biographyRef }
    ],
    {
      offset: 150,
      threshold: 0.3,
      rootMargin: '-150px 0px -66% 0px'
    }
  )

  // Tab configuration
  const tabs: TabItem[] = [
    { id: 'artworks', label: 'Artworks', icon: <Grid size={18} /> },
    { id: 'biography', label: 'Biography', icon: <User size={18} /> }
  ]

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

      {/* Scroll Navigation - Sticky */}
      <Container>
        <ScrollNavigation
          tabs={tabs}
          activeTab={activeSection}
          onTabClick={scrollToSection}
          sticky={true}
          stickyTop="80px"
        />

        {/* Artworks Section */}
        <div ref={artworksRef}>
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
            filtersClassName="top-[127px] md:top-[137px]"
          />
        </div>

        {/* Biography Section */}
        <div ref={biographyRef}>
          <ArtistBiographySection
            artist={artist}
            portraitImage={biographyData?.portraitImage}
            soloExhibitions={biographyData?.soloExhibitions}
            groupExhibitions={biographyData?.groupExhibitions}
            publicSales={biographyData?.publicSales}
            publications={biographyData?.publications}
          />
        </div>
      </Container>

    </main>
  )
}

