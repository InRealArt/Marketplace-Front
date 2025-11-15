'use client'

import React, { useEffect, useCallback } from 'react'
import { useCart } from '@/hooks/useCart'
import { toast } from 'sonner'
import { VAT_RATE } from '@/lib/constants'
import { PriceOption } from '@/types'
import { useModalStore } from '@/store/modalStore'
import { CartHeader } from './subComponents/CartHeader'
import { CartItemsList } from './subComponents/CartItemsList'
import { CartFooter } from './subComponents/CartFooter'

const Cart = () => {
  const { showCart, setShowCart } = useModalStore()
  const { items, removeFromCart, getCartTotal } = useCart()
  
  const onClose = useCallback(() => {
    setShowCart(false)
  }, [setShowCart])

  const isOpen = showCart

  // Close cart on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  // Handle removing item from cart
  const handleRemoveItem = async (nftId: number, purchaseType: string) => {
    const typedPurchaseType = purchaseType as PriceOption
    const result = await removeFromCart(nftId, typedPurchaseType)

    if (result.success) {
      toast.success(result.message)
    } else if (result.error) {
      toast.error(result.error)
    }
  }

  // Calculate cart total using the Zustand store method
  const cartTotal = getCartTotal()

  // Calculate VAT and total including VAT
  const totalHT = cartTotal
  const tva = parseFloat((totalHT * VAT_RATE).toFixed(2))
  const totalTTC = parseFloat((totalHT + tva).toFixed(2))

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div className={`fixed z-[100] top-0 right-0 h-screen w-full max-w-xs sm:max-w-sm bg-background text-white shadow-[-2px_0_10px_rgba(0,0,0,0.3)] transform transition-transform duration-300 ease-in-out ${!isOpen ? 'translate-x-full' : 'translate-x-0'}`}>
        <div className="flex flex-col h-full">
          <CartHeader onClose={onClose} />

          <div className="flex-grow overflow-y-auto p-6">
            <CartItemsList items={items} onRemoveItem={handleRemoveItem} />
          </div>

          <CartFooter 
            totalHT={totalHT}
            tva={tva}
            totalTTC={totalTTC}
            onClose={onClose}
          />
        </div>
      </div>
    </>
  )
}

export default Cart 