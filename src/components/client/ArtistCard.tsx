'use client'

import React from 'react'

interface ArtistCardProps {
  firstName: string
  lastName: string
  country: string
  artworkStyle: string
  imageUrl?: string
  favoriteIcon?: string
}

function ArtistCard ({
  firstName,
  lastName,
  country,
  artworkStyle,
  imageUrl,
  favoriteIcon = '/icons/heart.svg'
}: ArtistCardProps) {
  const displayName = `${firstName} ${lastName}`
  
  return (
    <div className="flex flex-col gap-4 items-end justify-start flex-shrink-0 relative">
      <div className="self-stretch flex-shrink-0 h-[28.4375rem] relative">
        <div className="bg-[#1b1c1e] rounded-lg w-[24.875rem] h-[28.4375rem] absolute left-0 top-0" />
        <img 
          className="w-8 h-8 absolute left-[19.625rem] top-4 overflow-visible" 
          src={favoriteIcon} 
          alt="Favoris"
        />
        {imageUrl && (
          <img 
            className="bg-[#1b1c1e] rounded-lg w-[18.375rem] h-[21.0625rem] absolute left-[3.234375rem] top-[3.6875rem] object-cover" 
            src={imageUrl} 
            alt={displayName}
          />
        )}
      </div>
      <div className="px-2 flex flex-col gap-0 items-start justify-start self-stretch flex-shrink-0 relative">
        <div className="text-white text-left font-semibold text-lg relative self-stretch">
          {displayName}
        </div>
        <div className="text-white text-left font-medium text-base relative self-stretch opacity-80">
          {country}
        </div>
        <div className="text-white text-left font-medium text-base relative self-stretch">
          {artworkStyle}
        </div>
        <div className="pt-2 flex flex-row gap-2.5 items-center justify-center self-stretch flex-shrink-0 relative">
          <div className="bg-[#1b1c1e] rounded-full py-1 px-2 flex flex-row gap-2.5 items-center justify-center flex-shrink-0 relative">
            <div className="text-white text-left font-semibold text-base relative">
              Artiste
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtistCard
