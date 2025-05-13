'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import { toast } from 'sonner'
import { CartItem } from '@/store/cartStore'
import { VAT_RATE } from '@/lib/constants'
import { PriceOption } from '@/types'


interface CartProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  removeFromCart: (nftId: number, purchaseType: string) => Promise<{ success: boolean, message?: string, error?: string }>
  getCartTotal: () => number
}

function Cart({ isOpen, onClose, items, removeFromCart, getCartTotal }: CartProps) {
  // Ferme le panier quand on clique sur Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  // Empêche le défilement du body quand le panier est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  // Handle removing item from cart
  const handleRemoveItem = async (nftId: number, purchaseType: string) => {
    const result = await removeFromCart(nftId, purchaseType);
    
    if (result.success) {
      toast.success(result.message);
    } else if (result.error) {
      toast.error(result.error);
    }
  };

  // Calculate cart total using the Zustand store method
  const cartTotal = getCartTotal();
  
  // Calcul de la TVA et du montant TTC
  const totalHT = cartTotal;
  const tva = parseFloat((totalHT * VAT_RATE).toFixed(2));
  const totalTTC = parseFloat((totalHT + tva).toFixed(2));

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40"
          onClick={onClose}
        />
      )}

      <div className={`fixed top-0 right-0 h-screen w-full max-w-sm sm:max-w-xs bg-[#52524c] text-white z-50 shadow-[-2px_0_10px_rgba(0,0,0,0.3)] transform transition-transform duration-300 ease-in-out ${!isOpen ? 'translate-x-full' : 'translate-x-0'}`}>
        <div className="flex flex-col h-full">
          {/* En-tête du panier */}
          <div className="flex items-center justify-between p-6 border-b border-[#6b6b66]">
            <h2 className="text-xl font-semibold text-white">Your Cart</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full cursor-pointer hover:bg-[#6b6b66] transition-colors"
              aria-label="Fermer"
            >
              <Image
                src="/icons/Cross.png"
                alt="Fermer"
                width={20}
                height={20}
              />
            </button>
          </div>

          {/* Contenu du panier */}
          <div className="flex-grow overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-8 text-white">
                <p>Your cart is empty</p>
              </div>
            ) : (
              <ul className="flex flex-col gap-6">
                {items.map((item) => (
                  <li key={`${item.nft.id}-${item.purchaseType}`} className="flex items-center justify-between gap-6 pb-6 border-b border-[#6b6b66]">
                    <div className="w-20 h-20 relative flex-shrink-0 rounded overflow-hidden">
                      <Image
                        src={item.nft.mainImageUrl || '/icons/Nft.png'}
                        alt={item.nft.name || 'NFT Image'}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                        onError={(e) => {
                          // Fallback pour les images qui ne se chargent pas
                          const target = e.target as HTMLImageElement;
                          target.src = '/icons/Nft.png';
                        }}
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-white mb-2">{item.nft.name}</h3>
                      <p className="text-[#b39e73] font-semibold">
                        {item.purchaseType === PriceOption.PHYSICAL && `${item.nft.pricePhysicalBeforeTax} €`}
                        {item.purchaseType === PriceOption.NFT && `${item.nft.priceNftBeforeTax} €`}
                        {item.purchaseType === PriceOption.NFT_PLUS_PHYSICAL && `${item.nft.priceNftPlusPhysicalBeforeTax} €`}
                      </p>
                      <div className="mt-2 text-sm text-white opacity-75">
                        Type: {item.purchaseType === PriceOption.PHYSICAL ? 'Physical Only' :
                          item.purchaseType === PriceOption.NFT ? 'NFT Only' :
                            'NFT + Physical'}
                      </div>
                    </div>
                    <button
                      aria-label="Supprimer"
                      className="p-2 rounded-full cursor-pointer hover:bg-[#6b6b66]"
                      onClick={() => handleRemoveItem(item.nft.id, item.purchaseType)}
                    >
                      <Image
                        src="/icons/Cross.png"
                        alt="Supprimer"
                        width={16}
                        height={16}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Bas du panier */}
          <div className="border-t border-[#6b6b66] p-6 bg-[#1d1d1b]">
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center justify-between text-white">
                <span>Subtotal (Tax free)</span>
                <span>{totalHT} €</span>
              </div>
              <div className="flex items-center justify-between text-white">
                <span>VAT (20%)</span>
                <span>{tva} €</span>
              </div>
              <div className="flex items-center justify-between font-semibold text-white text-lg mt-2">
                <span>Total (Including VAT)</span>
                <span>{totalTTC} €</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="block w-full bg-[#b39e73] text-white py-3.5 text-center font-medium mb-4 cursor-pointer transition-colors hover:bg-[#8a7a57]"
            >
              Checkout
            </Link>
            <button
              onClick={onClose}
              className="block w-full border border-[#b39e73] text-white py-3.5 text-center font-medium cursor-pointer transition-colors hover:bg-[#b39e73]/20"
            >
              Continue shopping
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart 