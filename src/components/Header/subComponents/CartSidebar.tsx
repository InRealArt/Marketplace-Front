'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl: string
}

// Mock data pour le panier (à remplacer par de vraies données du state)
const mockCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Artwork 1',
    price: 120,
    quantity: 1,
    imageUrl: '/images/placeholder.jpg'
  },
  {
    id: '2',
    name: 'Artwork 2',
    price: 250,
    quantity: 1,
    imageUrl: '/images/placeholder.jpg'
  }
]

function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
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

  // Calcul du total du panier
  const cartTotal = mockCartItems.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)

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
            <h2 className="text-xl font-semibold text-white">Votre Panier</h2>
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
            {mockCartItems.length === 0 ? (
              <div className="text-center py-8 text-white">
                <p>Votre panier est vide</p>
              </div>
            ) : (
              <ul className="flex flex-col gap-6">
                {mockCartItems.map((item) => (
                  <li key={item.id} className="flex items-center justify-between gap-6 pb-6 border-b border-[#6b6b66]">
                    <div className="w-20 h-20 relative flex-shrink-0 rounded overflow-hidden">
                      <Image 
                        src={item.imageUrl}
                        alt={item.name}
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
                      <h3 className="font-medium text-white mb-2">{item.name}</h3>
                      <p className="text-[#b39e73] font-semibold">{item.price} €</p>
                      <div className="flex items-center mt-3">
                        <button className="w-8 h-8 flex items-center justify-center border border-[#b39e73] bg-[#1d1d1b] text-white cursor-pointer transition-all hover:bg-[#b39e73]">-</button>
                        <span className="w-10 h-8 flex items-center justify-center text-white font-medium">{item.quantity}</span>
                        <button className="w-8 h-8 flex items-center justify-center border border-[#b39e73] bg-[#1d1d1b] text-white cursor-pointer transition-all hover:bg-[#b39e73]">+</button>
                      </div>
                    </div>
                    <button aria-label="Supprimer" className="p-2 rounded-full cursor-pointer hover:bg-[#6b6b66]">
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
            <div className="flex items-center justify-between font-semibold mb-6 text-white text-lg">
              <span>Total</span>
              <span>{cartTotal} €</span>
            </div>
            <Link 
              href="/checkout" 
              className="block w-full bg-[#b39e73] text-white py-3.5 text-center font-medium mb-4 cursor-pointer transition-colors hover:bg-[#8a7a57]"
            >
              Passer la commande
            </Link>
            <button 
              onClick={onClose}
              className="block w-full border border-[#b39e73] text-white py-3.5 text-center font-medium cursor-pointer transition-colors hover:bg-[#b39e73]/20"
            >
              Continuer vos achats
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartSidebar 