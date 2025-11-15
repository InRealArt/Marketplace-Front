import React from 'react'
import { CartItem as CartItemType } from '@/store/cartStore'
import { CartItem } from './CartItem'
import { CartEmptyState } from './CartEmptyState'
import { PriceOption } from '@/types'

type CartItemsListProps = {
  items: CartItemType[]
  onRemoveItem: (nftId: number, purchaseType: string) => void
}

export function CartItemsList({ items, onRemoveItem }: CartItemsListProps) {
  if (items.length === 0) {
    return <CartEmptyState />
  }

  return (
    <ul className="flex flex-col gap-6">
      {items.map((item) => (
        <CartItem
          key={`${item.nft.id}-${item.purchaseType}`}
          item={item}
          onRemove={onRemoveItem}
        />
      ))}
    </ul>
  )
}

