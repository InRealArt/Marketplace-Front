import React from 'react'

function ArtworkCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative w-full aspect-[4/5] bg-[#1b1c1e] rounded-lg overflow-hidden">
        {/* Icône de favoris skeleton */}
        <div className="w-6 h-6 absolute right-4 top-4 z-10 bg-gray-600 rounded animate-pulse" />
        
        {/* Image principale skeleton */}
        <div className="w-full h-full bg-gray-600 rounded-lg animate-pulse" />
      </div>
      
      <div className="flex flex-col gap-0 items-start justify-start w-full">
        {/* Titre skeleton */}
        <div className="h-6 sm:h-7 bg-gray-600 rounded animate-pulse w-full mb-1" />
        
        {/* Artiste skeleton */}
        <div className="h-5 sm:h-6 bg-gray-600 rounded animate-pulse w-3/4 mb-1" />
        
        {/* Medium skeleton */}
        <div className="h-5 sm:h-6 bg-gray-600 rounded animate-pulse w-1/2 mb-1" />
        
        {/* Dimensions skeleton */}
        <div className="h-5 sm:h-6 bg-gray-600 rounded animate-pulse w-2/3" />
        
        <div className="pt-2 flex flex-row gap-2.5 items-center justify-between w-full">
          {/* Prix skeleton */}
          <div className="h-5 sm:h-6 bg-gray-600 rounded animate-pulse flex-1" />
          
          {/* Badge "Vendu" skeleton */}
          <div className="bg-gray-600 rounded-full py-1 px-2 flex flex-row gap-2.5 items-center justify-center flex-shrink-0 animate-pulse">
            <div className="h-3 sm:h-4 w-12 bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtworkCardSkeleton 