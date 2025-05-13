'use client'

import { useState, useEffect } from 'react'
import { CheckoutForm } from '@/components/stripe/CheckoutForm'
import { useRouter } from 'next/navigation'

export function CheckoutClient() {
  const [clientSecret, setClientSecret] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Pour les besoins de la démonstration, on utilise un montant statique
  // Dans une application réelle, ce montant proviendrait du panier de l'utilisateur
  const amount = 2000 // 20€ en centimes

  useEffect(() => {
    // Fonction pour créer l'intention de paiement
    const createPaymentIntent = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/stripe/createPaymentIntent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
            currency: 'eur',
            metadata: {
              order_id: 'demo-123', // Remplacer par un ID de commande réel
            },
          }),
        })

        if (!response.ok) {
          throw new Error('Erreur lors de la création de l\'intention de paiement')
        }

        const data = await response.json()
        setClientSecret(data.clientSecret)
      } catch (err) {
        console.error('Erreur:', err)
        setError('Une erreur est survenue. Veuillez réessayer plus tard.')
      } finally {
        setIsLoading(false)
      }
    }

    createPaymentIntent()
  }, [])

  // Affichage de l'état de chargement
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Préparation du formulaire de paiement...</p>
      </div>
    )
  }

  // Affichage des erreurs
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-600">
        <h3 className="font-medium mb-1">Erreur</h3>
        <p>{error}</p>
        <button 
          onClick={() => router.refresh()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Réessayer
        </button>
      </div>
    )
  }

  // Récapitulatif de la commande et formulaire de paiement
  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <div className="flex justify-between mb-2 text-gray-800">
          <span className="font-medium">Produit de démonstration</span>
          <span>{(amount / 100).toFixed(2)} €</span>
        </div>
        <div className="flex justify-between font-semibold text-lg pt-2 text-gray-900">
          <span>Total</span>
          <span>{(amount / 100).toFixed(2)} €</span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4 text-gray-900">Mode de paiement</h3>
        <CheckoutForm clientSecret={clientSecret} />
      </div>
    </div>
  )
} 