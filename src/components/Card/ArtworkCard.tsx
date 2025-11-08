import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
      className="group cursor-pointer"
    >
      {/* Image container */}
      <div className="relative overflow-hidden rounded-lg bg-white/5 aspect-square mb-3">
        {mainImageUrl && (
          <Image
            src={mainImageUrl}
            alt={name || 'Artwork'}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        
        {/* Stock badge */}
        {!isAvailable && (
          <div className="absolute top-3 right-3 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full">
            <span className="text-white/90 text-xs font-medium">Sold out</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="space-y-1">
        {/* Artwork name */}
        <h3 className="text-white font-medium text-base truncate group-hover:text-white/80 transition-colors">
          {name}
        </h3>
        
        {/* Price */}
        <p className="text-white/60 text-sm">
          {price.toFixed(2)} €
        </p>
      </div>
    </Link>
  )
}

export default ArtworkCard
