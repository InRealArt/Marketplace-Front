'use client'
import React from 'react'
import Image from 'next/image'
import ExpandableSection from '@/components/Common/ExpandableSection'
import { ArtistWithRelations } from '@/types'

interface ExhibitionItem {
  year: string
  exhibition: string
  venue: string
  location: string
}

interface PublicSaleItem {
  title: string
  artworkYear?: string
  date: string
  price?: string
  estimation?: string
  auctionHouse: string
  details?: string
}

interface PublicationItem {
  year: string
  description: string
}

interface ArtistBiographySectionProps {
  artist: ArtistWithRelations
  portraitImage?: string
  soloExhibitions?: ExhibitionItem[]
  groupExhibitions?: ExhibitionItem[]
  publicSales?: PublicSaleItem[]
  publications?: PublicationItem[]
}

const ArtistBiographySection = ({
  artist,
  portraitImage,
  soloExhibitions = [],
  groupExhibitions = [],
  publicSales = [],
  publications = []
}: ArtistBiographySectionProps) => {
  const artistBiography = (artist as any)?.biography as string | undefined

  const renderExhibitions = (items: ExhibitionItem[]) => (
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li key={`${item.year}-${index}`} className="flex gap-4">
          <span className="min-w-[56px] text-sm font-semibold text-white/50">
            {item.year}
          </span>
          <div className="flex-1">
            <p className="text-white font-medium">
              {item.exhibition}
            </p>
            <p className="text-white/60 text-sm">
              {item.venue} — {item.location}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )

  const renderPublicSales = (items: PublicSaleItem[]) => (
    <ul className="space-y-6">
      {items.map((sale, index) => (
        <li key={`${sale.title}-${index}`} className="space-y-2">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-sm font-semibold text-white/50">
              {sale.date}
            </span>
            <h4 className="text-white font-medium">
              {sale.title}{sale.artworkYear ? ` (${sale.artworkYear})` : ''}
            </h4>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-white/60">
            {sale.price && <span>Prix : {sale.price}</span>}
            {sale.estimation && <span>Estimation : {sale.estimation}</span>}
            <span>Maison de vente : {sale.auctionHouse}</span>
          </div>
          {sale.details && (
            <p className="text-white/50 text-sm leading-relaxed">
              {sale.details}
            </p>
          )}
        </li>
      ))}
    </ul>
  )

  const renderPublications = (items: PublicationItem[]) => (
    <ul className="space-y-4">
      {items.map((publication, index) => (
        <li key={`${publication.year}-${index}`} className="flex gap-4">
          <span className="min-w-[56px] text-sm font-semibold text-white/50">
            {publication.year}
          </span>
          <p className="text-white/70 text-sm md:text-base leading-relaxed flex-1">
            {publication.description}
          </p>
        </li>
      ))}
    </ul>
  )

  return (
    <section className="py-16 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left side - Sticky portrait image */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[120px]">
            {portraitImage && (
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src={portraitImage}
                  alt={`Portrait of ${artist.name} ${artist.surname}`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right side - Biography content */}
        <div className="lg:col-span-7">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Portrait & parcours
          </h2>

          {/* Short bio */}
          {artistBiography && (
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">
              {artistBiography}
            </p>
          )}

          {/* Expandable sections */}
          <div className="space-y-0">
            {/* Solo exhibitions */}
            {soloExhibitions.length > 0 && (
              <ExpandableSection title="Expositions solos" defaultExpanded={false}>
                {renderExhibitions(soloExhibitions)}
              </ExpandableSection>
            )}

            {/* Group exhibitions */}
            {groupExhibitions.length > 0 && (
              <ExpandableSection title="Expositions collectives" defaultExpanded={false}>
                {renderExhibitions(groupExhibitions)}
              </ExpandableSection>
            )}

            {/* Public sales */}
            {publicSales.length > 0 && (
              <ExpandableSection title="Ventes publiques" defaultExpanded={false}>
                {renderPublicSales(publicSales)}
              </ExpandableSection>
            )}

            {/* Publications */}
            {publications.length > 0 && (
              <ExpandableSection title="Publications" defaultExpanded={false}>
                {renderPublications(publications)}
              </ExpandableSection>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArtistBiographySection

