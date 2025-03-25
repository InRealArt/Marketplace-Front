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
          className="CartSidebar__overlay"
          onClick={onClose}
        />
      )}
      
      <div className={`CartSidebar__panel ${!isOpen ? 'CartSidebar__panel--closed' : ''}`}>
        <div className="CartSidebar__container">
          {/* En-tête du panier */}
          <div className="CartSidebar__header">
            <h2 className="CartSidebar__title">Votre Panier</h2>
            <button 
              onClick={onClose}
              className="CartSidebar__closeBtn"
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
          <div className="CartSidebar__content">
            {mockCartItems.length === 0 ? (
              <div className="CartSidebar__emptyMessage">
                <p>Votre panier est vide</p>
              </div>
            ) : (
              <ul className="CartSidebar__itemsList">
                {mockCartItems.map((item) => (
                  <li key={item.id} className="CartSidebar__item">
                    <div className="CartSidebar__itemImage">
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
                    <div className="CartSidebar__itemInfo">
                      <h3 className="CartSidebar__itemName">{item.name}</h3>
                      <p className="CartSidebar__itemPrice">{item.price} €</p>
                      <div className="CartSidebar__quantityControl">
                        <button className="CartSidebar__quantityBtn">-</button>
                        <span className="CartSidebar__quantity">{item.quantity}</span>
                        <button className="CartSidebar__quantityBtn">+</button>
                      </div>
                    </div>
                    <button aria-label="Supprimer" className="CartSidebar__removeBtn">
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
          <div className="CartSidebar__footer">
            <div className="CartSidebar__total">
              <span>Total</span>
              <span>{cartTotal} €</span>
            </div>
            <Link 
              href="/checkout" 
              className="CartSidebar__checkoutBtn"
            >
              Passer la commande
            </Link>
            <button 
              onClick={onClose}
              className="CartSidebar__continueBtn"
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