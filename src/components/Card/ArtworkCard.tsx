import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import FavoriteButton from '@/components/Common/FavoriteButton'
import { ItemPhysicalType } from '@/types'

interface ArtworkCardProps {
  artwork: ItemPhysicalType
}

const ArtworkCard = ({ artwork }: ArtworkCardProps) => {
  const { item, price, stockQty } = artwork
  const { name, slug, mainImageUrl } = item

  const isAvailable = stockQty > 0

  return (
    <Link 
      href={`/artworks/${slug || artwork.id}`}
      className="group cursor-pointer block"
    >
      {/* Image container with fixed height and centered image */}
      <div className="relative overflow-hidden rounded-2xl bg-[#212326] h-[320px] mb-4 flex items-center justify-center p-8">
        {mainImageUrl && (
          <div className="relative w-full h-full">
            <Image
              src={mainImageUrl}
              alt={name || 'Artwork'}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        
        {/* Favorite button - top right */}
        <div className="absolute top-3 right-3">
          <FavoriteButton 
            artworkId={String(artwork.id)}
            onToggle={(isFavorite) => {
              console.log(`Artwork ${String(artwork.id)} favorite status:`, isFavorite)
              // TODO: Add API call to save favorite
            }}
          />
        </div>
        
        {/* Sold out overlay */}
        {!isAvailable && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-2xl">
            <span className="text-white text-lg font-medium">Sold out</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="space-y-1">
        {/* Artwork name */}
        <h3 className="text-white font-medium text-lg group-hover:text-white/80 transition-colors">
          {name}
        </h3>
        
        {/* Medium/Material */}
        <p className="text-white/50 text-sm">
          Acrylic on Canvas
        </p>
        
        {/* Dimensions */}
        <p className="text-white/50 text-sm">
          80x80cm
        </p>
        
        {/* Price */}
        <p className="text-white font-semibold text-lg mt-2">
          €{price.toFixed(0)}
        </p>
      </div>
    </Link>
  )
}

export default ArtworkCard
