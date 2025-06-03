'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ItemWithRelations } from '@/types'
import { getImageFromUri } from '@/utils/getImageFromUri'

interface ItemCardProps {
  item: ItemWithRelations
}

const ItemCard = ({ item }: ItemCardProps) => {
  // Détermine le prix à afficher (physique ou NFT)
  const price = item.physicalItem?.price || item.nftItem?.price || 0
  
  // Détermine le type d'item
  const itemType = item.physicalItem && item.physicalItem.stockQty > 0 ? 'Physique' : 'NFT'
  
  // Détermine la disponibilité
  const isAvailable = item.physicalItem?.status === 'listed' || item.nftItem !== null

  return (
    <Link href={`/artworks/${item.slug || item.id}`} className="item-card">
      <div className="item-card__image-container">
        <Image
          src={getImageFromUri(item.mainImageUrl || '/images/placeholder.jpg')}
          alt={item.name}
          width={300}
          height={300}
          className="item-card__image"
          priority={false}
        />
        
        {/* Badge du type d'item */}
        <div className={`item-card__badge item-card__badge--${itemType.toLowerCase()}`}>
          {itemType}
        </div>
        
        {/* Badge de disponibilité */}
        {!isAvailable && (
          <div className="item-card__badge item-card__badge--unavailable">
            Non disponible
          </div>
        )}
      </div>

      <div className="item-card__content">
        <h3 className="item-card__title">{item.name}</h3>
        
        {item.description && (
          <p className="item-card__description">
            {item.description.length > 100 
              ? `${item.description.substring(0, 100)}...` 
              : item.description
            }
          </p>
        )}

        <div className="item-card__details">
          {item.medium && (
            <span className="item-card__detail">
              <strong>Medium:</strong> {item.medium.name}
            </span>
          )}
          
          {item.style && (
            <span className="item-card__detail">
              <strong>Style:</strong> {item.style.name}
            </span>
          )}
          
          {item.technique && (
            <span className="item-card__detail">
              <strong>Technique:</strong> {item.technique.name}
            </span>
          )}
        </div>

        <div className="item-card__footer">
          <div className="item-card__price">
            {price > 0 ? `${price}€` : 'Prix sur demande'}
          </div>
          
          {item.physicalItem && item.physicalItem.stockQty > 0 && (
            <div className="item-card__stock">
              Stock: {item.physicalItem.stockQty}
            </div>
          )}
        </div>

        {item.tags && item.tags.length > 0 && (
          <div className="item-card__tags">
            {item.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="item-card__tag">
                {tag}
              </span>
            ))}
            {item.tags.length > 3 && (
              <span className="item-card__tag item-card__tag--more">
                +{item.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}

export default ItemCard 