'use client'

import { HeroArtistCard } from './HeroArtistCard'

interface ArtistData {
  id: string
  artistImageUrl: string
  artworkImageUrl: string
  artistName?: string
}

interface HeroSectionProps {
  backgroundImageUrl?: string
  artists: ArtistData[]
}

const artistPositions = [
  { left: '70%', top: '148px' },
  { left: '45%', top: '78px' },
  { left: '20%', top: '360px' },
  { left: '25%', top: '147px' },
  { left: '60%', top: '334px' },
  { left: '40%', top: '275px' }
]

export function HeroSection({ 
  backgroundImageUrl = '/images/bg_hero.svg', 
  artists 
}: HeroSectionProps) {
  return (
    <div className="w-full h-[751px] relative overflow-hidden">
      <img
        className="w-full min-w-[1725px] h-[1725px] absolute left-[50%] top-[190px] overflow-visible object-cover"
        style={{ translate: '-50%' }}
        src={backgroundImageUrl}
        alt="Background InRealArt"
      />
      
      {artists.slice(0, 6).map((artist, index) => (
        <div
          key={artist.id}
          className="absolute z-10"
          style={{
            left: artistPositions[index]?.left || '0px',
            top: artistPositions[index]?.top || '0px'
          }}
        >
          <HeroArtistCard
            artistImageUrl={artist.artistImageUrl}
            artworkImageUrl={artist.artworkImageUrl}
            artistName={artist.artistName}
          />
        </div>
      ))}
      
      <div
        className="w-full h-[101px] absolute left-0 top-[650px] z-20"
        style={{
          background: 'linear-gradient(180deg, rgba(19, 19, 19, 0) 0%, rgba(19, 19, 19, 1) 100%)'
        }}
      />

      {/* <div className="flex flex-col gap-0 items-start justify-start w-full max-w-[1246px] absolute left-[95px] top-0 z-30">
        <div className="text-[#ffffff] text-left font-['FunnelDisplay-Medium',_sans-serif] text-[93.30841064453125px] font-medium uppercase relative self-stretch">
          Votre entrée dans l'art
        </div>
        <div className="flex flex-row items-center justify-between self-stretch shrink-0 relative">
          <div className="text-[#ffffff] text-left font-['FunnelDisplay-Medium',_sans-serif] text-[32px] font-medium uppercase relative">
            Commence
          </div>
          <div className="text-[#ffffff] text-left font-['FunnelDisplay-Medium',_sans-serif] text-[32px] font-medium uppercase relative">
            Maintenant
          </div>
        </div>
      </div>

      <div
        className="text-[#ffffff] text-center font-['FunnelDisplay-Medium',_sans-serif] text-lg font-medium absolute left-[50%] bottom-[30px] w-[284px] z-30"
        style={{ translate: '-50%' }}
      >
        Laissez vous guidez dans le nouveau monde de l'art
      </div> */}
    </div>
  )
}
