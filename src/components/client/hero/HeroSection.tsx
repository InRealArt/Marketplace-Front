'use client'

import { use } from 'react'
import { HeroArtistCard } from './HeroArtistCard'

interface Artist {
  imageUrl: string
  featuredArtwork: string | null
}

interface HeroSectionProps {
  backgroundImageUrl?: string
  artists: Promise<Artist[]>
}

const artistPositions = [
  { left: '80%', top: '148px' },   // further right
  { left: '50%', top: '78px' },   // further right
  { left: '5%', top: '360px' },  // further left
  { left: '20%', top: '147px' },  // further left
  { left: '65%', top: '334px' },  // further right
  { left: '35%', top: '275px' }   // further left
]

const artistMobilePositions = [
  { left: '14%;', top: '127px;' },  // further left
  { left: '9%', top: '330px' },  // further left
  { left: '53%', top: '212px' },   // further right
  { left: '45%', top: '430px' },   // further right
]

const MOBILE_ARTIST_COUNT = 4
const DESKTOP_ARTIST_COUNT = 6

export default function HeroSection({
  backgroundImageUrl = '/images/bg_hero.svg',
  artists
}: HeroSectionProps) {
  const allArtists = use(artists)

  return (
    <div className="w-full h-[100vh] relative bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
      <div className='w-full max-w-[90%] md:max-w-intro-screen h-full relative m-auto'>
        {/* Main Title - Top */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-7xl">
          <h1 className="text-white font-funnel font-medium uppercase text-4xl lg:text-6xl xl:text-7xl leading-tight text-center">
            Votre entrée dans l'art
          </h1>
        </div>

        {/* Subtitle with COMMENCE and MAINTENANT - Top */}
        <div className=" z-20 px-4 w-full max-w-6xl">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="absolute top-24 left-0 z-20 text-white font-funnel font-medium uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-2 sm:mb-0">
              Commence
            </div>
            <div className="absolute top-24 right-0 z-20 text-white font-funnel font-medium uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              Maintenant
            </div>
          </div>
        </div>

        {/* Artist Cards - Responsive */}
        {[
          { breakpoint: 'md:hidden', count: MOBILE_ARTIST_COUNT, positions: artistMobilePositions, prefix: 'mobile' },
          { breakpoint: 'hidden md:block', count: DESKTOP_ARTIST_COUNT, positions: artistPositions, prefix: 'desktop' }
        ].map(({ breakpoint, count, positions, prefix }) => 
          allArtists.slice(0, count).map((artist, index) => (
            <div
              key={`artist-${prefix}-${index}`}
              className={`absolute z-10 ${breakpoint}`}
              style={{
                left: positions[index]?.left || '0px',
                top: positions[index]?.top || '0px'
              }}
            >
              <HeroArtistCard
                artistImageUrl={artist.imageUrl}
                artworkImageUrl={artist.featuredArtwork || ''}
              />
            </div>
          ))
        )}

        {/* Bottom Text */}
        <div className="w-full absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 px-4">
          <p className="text-white text-center font-funnel font-medium text-base md:text-lg max-w-xs">
            Laissez vous guidez dans le nouveau monde de l'art
          </p>
        </div>

        {/* Bottom Gradient */}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#131313] to-transparent z-10" />
    </div>
  )
}
