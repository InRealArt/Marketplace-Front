'use client'

import '@/styles/animations.scss'

interface HeroArtistCardProps {
  artistImageUrl: string
  artworkImageUrl: string
  artistName?: string
}

export function HeroArtistCard({ 
  artistImageUrl, 
  artworkImageUrl, 
  artistName = 'Artiste'
}: HeroArtistCardProps) {
  return (
    <div className="hero-artist-card w-[152px] md:w-[212px] h-48 md:h-64 relative overflow-hidden cursor-pointer rounded">
      {/* Artist image (base layer) */}
      <img
        className="rounded w-full h-full absolute inset-0 object-cover"
        src={artistImageUrl}
        alt={artistName}
      />
      
      {/* Black/grey background overlay */}
      <div className="hero-artist-card__background-overlay absolute inset-0 bg-[#2a2a2a]" />
      
      {/* Artwork image overlay */}
      <div className="hero-artist-card__artwork-overlay absolute inset-0 rounded overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={artworkImageUrl}
          alt="Œuvre d'art"
        />
      </div>
    </div>
  )
}
