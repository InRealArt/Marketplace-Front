'use client'

import React from 'react'

interface ArtworkCardProps {
  title: string
  artist?: string
  year?: number
  medium: string
  physicalPrice?: number
  nftPrice?: number
  isSold: boolean
  imageUrl?: string
  favoriteIcon?: string
  width?: number
  height?: number
}

function ArtworkCard ({
  title,
  artist,
  year,
  medium,
  physicalPrice,
  nftPrice,
  isSold,
  imageUrl,
  favoriteIcon = '/icons/heart.svg',
  width,
  height
}: ArtworkCardProps) {
  const displayTitle = year ? `${title} (${year})` : title
  const displayPrice = physicalPrice || nftPrice
  const isPhysicalItem = Boolean(physicalPrice)
  
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative w-full aspect-[4/5] bg-[#1b1c1e] rounded-lg overflow-hidden">
        <svg 
          className="w-6 h-6 absolute right-4 top-4 z-10 cursor-pointer" 
          fill="none" 
          stroke="white" 
          strokeWidth="2" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
        </svg>
        {imageUrl && (
          <img 
            className="w-full h-full object-cover rounded-lg" 
            src={imageUrl} 
            alt={title}
          />
        )}
      </div>
      <div className="flex flex-col gap-0 items-start justify-start w-full">
        <div className="text-white text-left font-semibold text-base sm:text-lg w-full">
          {displayTitle}
        </div>
        {artist && (
          <div className="text-white text-left font-medium text-sm sm:text-base w-full opacity-80">
            {artist}
          </div>
        )}
        <div className="text-white text-left font-medium text-sm sm:text-base w-full">
          {medium}
        </div>
        {isPhysicalItem && width && height && (
          <div className="text-white text-left font-medium text-sm sm:text-base w-full">
            {width} x {height} cm
        </div>
        )}
        <div className="pt-2 flex flex-row gap-2.5 items-center justify-between w-full">
          {displayPrice && (
            <div className="text-white text-left font-semibold text-sm sm:text-base flex-1">
              {displayPrice.toLocaleString('fr-FR')}€
            </div>
          )}
          {isSold && (
            <div className="bg-[#1b1c1e] rounded-full py-1 px-2 flex flex-row gap-2.5 items-center justify-center flex-shrink-0">
              <div className="text-white text-left font-semibold text-xs sm:text-base">
                Vendu
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArtworkCard
