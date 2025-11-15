import React from 'react'
import Image from 'next/image'
import { CartItem as CartItemType } from '@/store/cartStore'
import { PriceOption } from '@/types'

type CartItemProps = {
  item: CartItemType
  onRemove: (nftId: number, purchaseType: string) => void
}

export function CartItem({ item, onRemove }: CartItemProps) {
  const handleRemove = () => {
    onRemove(item.nft.id, item.purchaseType)
  }

  const getPurchaseTypeLabel = () => {
    switch (item.purchaseType) {
      case PriceOption.PHYSICAL:
        return 'Physical Only'
      case PriceOption.NFT:
        return 'NFT Only'
      case PriceOption.NFT_AND_PHYSICAL:
        return 'NFT + Physical'
      default:
        return item.purchaseType
    }
  }

  return (
    <li className="flex items-center justify-between gap-6 pb-6 border-b border-[#6b6b66] last:border-b-0 last:pb-0">
      <div className="w-20 h-20 relative flex-shrink-0 rounded overflow-hidden">
        <Image
          src={item.nft.item?.mainImageUrl || '/icons/Nft.png'}
          alt={item.nft.item?.name || 'Artwork Image'}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = '/icons/Nft.png'
          }}
        />
      </div>
      <div className="flex-grow min-w-0">
        <h3 className="font-medium text-white mb-2 text-sm truncate">
          {item.nft.item?.name || 'Artwork without name'}
        </h3>
        <p className="text-purple font-semibold text-sm mb-2">
          {item.nft.price} €
        </p>
        <div className="text-xs text-white opacity-75">
          Type: {getPurchaseTypeLabel()}
        </div>
      </div>
      <button
        aria-label="Remove item"
        className="p-2 rounded-full cursor-pointer hover:bg-[#6b6b66] transition-colors flex-shrink-0"
        onClick={handleRemove}
      >
        <Image
          src="/icons/Cross.png"
          alt="Remove"
          width={16}
          height={16}
        />
      </button>
    </li>
  )
}

