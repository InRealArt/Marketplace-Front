'use client'

import { useState } from 'react'

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
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="w-[212px] h-64 relative overflow-hidden cursor-pointer rounded"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image de l'œuvre (arrière-plan) */}
      <img
        className="rounded w-full h-full absolute inset-0 object-cover"
        src={artworkImageUrl}
        alt="Œuvre d'art"
      />
      
      {/* Image de l'artiste avec effet de rideau */}
      <div
        className="absolute inset-0 rounded overflow-hidden transition-all duration-1000 ease-in-out"
        style={{
          clipPath: isHovered 
            ? 'polygon(0% 50%, 0% 50%, 100% 50%, 100% 50%)' 
            : 'polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)'
        }}
      >
        <img
          className="w-full h-full object-cover"
          src={artistImageUrl}
          alt={artistName}
        />
      </div>
      
      {/* Effet de transition avec la couleur de fond */}
      <div
        className="absolute inset-0 bg-[#131313] transition-all duration-500 ease-in-out"
        style={{
          clipPath: isHovered
            ? 'polygon(0% 50%, 0% 50%, 100% 50%, 100% 50%)'
            : 'polygon(0% 50%, 0% 50%, 100% 50%, 100% 50%)',
          opacity: isHovered ? 1 : 0
        }}
      />
    </div>
  )
}
