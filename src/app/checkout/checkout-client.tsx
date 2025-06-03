'use client'

import { useState, useEffect } from 'react'
import { CheckoutForm } from '@/components/stripe/CheckoutForm'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import { useShipping } from '@/hooks/useShipping'
import { VAT_RATE } from '@/lib/constants'
import { PriceOption, PurchaseType, ItemPhysicalType } from '@/types'
import { CartItem } from '@/store/cartStore'
import { ShippingAddressForm } from '@/components/checkout/ShippingAddressForm'
import { ShippingOptions } from '@/components/checkout/ShippingOptions'

export function CheckoutClient() {
  const [clientSecret, setClientSecret] = useState<string>('')
  const [isLoadingPayment, setIsLoadingPayment] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { getCartTotal, items } = useCart()
  
  // Intégration du hook de livraison
  const {
    isLoading: isLoadingShipping,
    error: shippingError,
    shippingOptions,
    selectedShipping,
    hasPhysicalItems,
    calculateShipping,
    selectShippingOption,
    getShippingCost
  } = useShipping()

  // Calcul du montant total TTC basé sur le panier + frais de livraison
  const subtotalHT: number = getCartTotal()
  const shippingCost = getShippingCost()
  const totalHT = subtotalHT + shippingCost
  const tva = parseFloat((totalHT * VAT_RATE).toFixed(2))
  const totalTTC = parseFloat((totalHT + tva).toFixed(2))
  
  // Conversion en centimes pour Stripe
  const amountInCents = Math.round(totalTTC * 100)

  useEffect(() => {
    // Fonction pour créer l'intention de paiement
    const createPaymentIntent = async () => {
      try {
        setIsLoadingPayment(true)
        setError(null)

        // Vérifier si le panier est vide
        if (items.length === 0) {
          router.push('/')
          return
        }

        // Pour les articles physiques, attendre qu'une option de livraison soit sélectionnée
        if (hasPhysicalItems && !selectedShipping) {
          setIsLoadingPayment(false)
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
              order_id: `order-${Date.now()}`,
              items: JSON.stringify(items.map((item: CartItem) => ({
                nftId: item.nft.id,
                purchaseType: item.purchaseType
              }))),
              shipping_cost: shippingCost.toString(),
              shipping_service: selectedShipping?.serviceName || 'none'
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
        setIsLoadingPayment(false)
      }
    }

    createPaymentIntent()
  }, [amountInCents, items, router, hasPhysicalItems, selectedShipping, shippingCost])

  // Gestionnaire pour le changement d'adresse de livraison
  const handleAddressChange = (address: any) => {
    calculateShipping(address)
  }

  // Affichage de l'état de chargement
  if (isLoadingPayment && (!hasPhysicalItems || selectedShipping)) {
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
      {/* Récapitulatif de la commande */}
      <div className="border-b pb-4">
        {items.map((item: CartItem) => (
          <div key={`${item.nft.id}-${item.purchaseType}`} className="flex justify-between mb-2 text-gray-800">
            <span className="font-medium">
              {item.nft.item.name} ({item.purchaseType})
            </span>
          </div>
        ))}
        
        <div className="flex justify-between text-gray-800 mt-2 pt-2 border-t">
          <span>Subtotal (excl. VAT)</span>
          <span>{subtotalHT.toFixed(2)} €</span>
        </div>
        
        {hasPhysicalItems && (
          <div className="flex justify-between text-gray-800">
            <span>Shipping</span>
            <span>{shippingCost.toFixed(2)} €</span>
          </div>
        )}
        
        <div className="flex justify-between text-gray-800">
          <span>VAT ({(VAT_RATE * 100).toFixed(0)}%)</span>
          <span>{tva.toFixed(2)} €</span>
        </div>
        
        <div className="flex justify-between font-semibold text-lg pt-2 text-gray-900">
          <span>Total (incl. VAT)</span>
          <span>{totalTTC.toFixed(2)} €</span>
        </div>
      </div>

      {/* Section livraison (si articles physiques) */}
      {hasPhysicalItems && (
        <div className="space-y-6">
          <ShippingAddressForm
            onAddressChange={handleAddressChange}
            isLoading={isLoadingShipping}
          />
          
          <ShippingOptions
            options={shippingOptions}
            onSelectOption={selectShippingOption}
            isLoading={isLoadingShipping}
            error={shippingError}
          />
        </div>
      )}

      {/* Formulaire de paiement */}
      {(!hasPhysicalItems || selectedShipping) && clientSecret && (
        <div>
          <h3 className="text-lg font-medium mb-4 text-gray-900">Payment method</h3>
          <CheckoutForm clientSecret={clientSecret} />
        </div>
      )}

      {/* Message d'attente pour la sélection de livraison */}
      {hasPhysicalItems && !selectedShipping && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <p className="text-blue-800">
            Please select a shipping option to continue to payment.
          </p>
        </div>
      )}
    </div>
  )
} 