'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ItemWithRelations } from '@/types'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ItemCardProps {
  item: ItemWithRelations
}

const ItemCard = ({ item }: ItemCardProps) => {
  // Détermine le prix à afficher (physique ou NFT)
  const price = item.physicalItem?.price || item.nftItem?.price || 0
  
  // Détermine la disponibilité
  const isAvailable = item.physicalItem?.status === 'listed' || item.nftItem !== null

  // Gestion du carousel d'images
  const images = item.secondaryImagesUrl && item.secondaryImagesUrl.length > 0 
    ? [item.mainImageUrl, ...item.secondaryImagesUrl].filter((img): img is string => img !== null && img !== '')
    : item.mainImageUrl ? [item.mainImageUrl] : []

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const hasMultipleImages = images.length > 1

  const goToPrevious = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)
  }

  const goToNext = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)
  }

  const currentImageSrc = images[currentImageIndex] || '/images/placeholder.jpg'

  return (
    <Link href={`/artworks/${item.slug || item.id}`} className="item-card">
      <div className="item-card__image-container">
        <Image
          src={currentImageSrc}
          alt={item.name}
          width={300}
          height={300}
          className="item-card__image"
          priority={false}
        />
        
        {/* Flèches de navigation */}
        {hasMultipleImages && (
          <>
            <button
              className="item-card__nav-arrow item-card__nav-arrow--left"
              onClick={goToPrevious}
              aria-label="Image précédente"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="item-card__nav-arrow item-card__nav-arrow--right"
              onClick={goToNext}
              aria-label="Image suivante"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Indicateurs de pagination */}
        {hasMultipleImages && (
          <div className="item-card__image-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                className={`item-card__indicator ${index === currentImageIndex ? 'item-card__indicator--active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setCurrentImageIndex(index)
                }}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>
        )}
        
        {/* Badge de disponibilité */}
        {!isAvailable && (
          <div className="item-card__badge item-card__badge--unavailable">
            Non disponible
          </div>
        )}
      </div>

      <div className="item-card__content">
        {/* Nom de l'artiste en lien */}
        {item.user?.Artist && (
          <Link 
            href={`/artists/${item.user.Artist.slug || item.user.Artist.id}`}
            className="item-card__artist"
            onClick={(e) => e.stopPropagation()}
          >
            {item.user.Artist.name} {item.user.Artist.surname}
          </Link>
        )}

        {/* Nom de l'œuvre */}
        <h3 className="item-card__title">{item.name}</h3>
        
        {/* Dimensions */}
        {item.physicalItem && (item.physicalItem.width || item.physicalItem.height) && (
          <p className="item-card__dimensions">
            {item.physicalItem.width && item.physicalItem.height 
              ? `${item.physicalItem.width}x${item.physicalItem.height}cm`
              : item.physicalItem.width 
                ? `${item.physicalItem.width}cm de largeur`
                : `${item.physicalItem.height}cm de hauteur`
            }
          </p>
        )}

        {/* Prix */}
        <div className="item-card__price">
          {price > 0 ? `${price} €` : 'Price on request'}
        </div>
      </div>
    </Link>
  )
}

export default ItemCard 