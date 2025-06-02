'use client'

import { useState, useEffect } from 'react'
import { CheckoutForm } from '@/components/stripe/CheckoutForm'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import { VAT_RATE } from '@/lib/constants'
import { PriceOption, PurchaseType, ItemPhysicalType } from '@/types'
import { CartItem } from '@/store/cartStore'

export function CheckoutClient() {
  const [clientSecret, setClientSecret] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { getCartTotal, items } = useCart()

  // Calcul du montant total TTC basé sur le panier de l'utilisateur
  const totalHT: number = getCartTotal()
  const tva = parseFloat((totalHT * VAT_RATE).toFixed(2))
  const totalTTC = parseFloat((totalHT + tva).toFixed(2))
  
  // Conversion en centimes pour Stripe
  const amountInCents = Math.round(totalTTC * 100)

  useEffect(() => {
    // Fonction pour créer l'intention de paiement
    const createPaymentIntent = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Vérifier si le panier est vide
        if (items.length === 0) {
          router.push('/')
          return
        }

        const response = await fetch('/api/stripe/createPaymentIntent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: amountInCents,
            currency: 'eur',
            metadata: {
              order_id: `order-${Date.now()}`, // Génère un ID de commande temporaire
              items: JSON.stringify(items.map((item: CartItem) => ({
                nftId: item.nft.id,
                purchaseType: item.purchaseType
              })))
            },
          }),
        })

        if (!response.ok) {
          throw new Error('Error creating payment intent')
        }

        const data = await response.json()
        setClientSecret(data.clientSecret)
      } catch (err) {
        console.error('Erreur:', err)
        setError('An error occurred. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    createPaymentIntent()
  }, [amountInCents, items, router])

  // Affichage de l'état de chargement
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Preparing payment form...</p>
      </div>
    )
  }

  // Affichage des erreurs
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-600">
        <h3 className="font-medium mb-1">Error</h3>
        <p>{error}</p>
        <button 
          onClick={() => router.refresh()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    )
  }

  // Si le panier est vide, rediriger vers la page d'accueil
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-gray-600 mb-4">Your cart is empty</p>
        <button 
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Back to home
        </button>
      </div>
    )
  }

  // Récapitulatif de la commande et formulaire de paiement
  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        {/* <h3 className="text-lg font-medium mb-4 text-gray-900">Order summary</h3> */}
        
        {items.map((item: CartItem) => (
          <div key={`${item.nft.id}-${item.purchaseType}`} className="flex justify-between mb-2 text-gray-800">
            <span className="font-medium">
              {item.nft.Item.name} ({item.purchaseType})
            </span>
            {/* <span>
              {item.purchaseType === PriceOption.PHYSICAL && `${item.nft.Item.pricePhysicalBeforeTax} €`}
              {item.purchaseType === PriceOption.NFT && `${item.nft.Item.priceNftBeforeTax} €`}
              {item.purchaseType === PriceOption.NFT_PLUS_PHYSICAL && `${item.nft.Item.priceNftPlusPhysicalBeforeTax} €`}
            </span> */}
          </div>
        ))}
        
        <div className="flex justify-between text-gray-800 mt-2 pt-2 border-t">
          <span>Subtotal (excl. VAT)</span>
          <span>{totalHT.toFixed(2)} €</span>
        </div>
        
        <div className="flex justify-between text-gray-800">
          <span>VAT ({(VAT_RATE * 100).toFixed(0)}%)</span>
          <span>{tva.toFixed(2)} €</span>
        </div>
        
        <div className="flex justify-between font-semibold text-lg pt-2 text-gray-900">
          <span>Total (incl. VAT)</span>
          <span>{totalTTC.toFixed(2)} €</span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4 text-gray-900">Payment method</h3>
        <CheckoutForm clientSecret={clientSecret} />
      </div>
    </div>
  )
} 