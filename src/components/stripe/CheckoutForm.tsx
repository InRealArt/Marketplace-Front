'use client'

import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import type { StripeElementsOptions, Appearance } from '@stripe/stripe-js'

// Assurez-vous que cette clé publique est définie dans votre fichier .env.local
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

// Composant formulaire de paiement
function CheckoutFormContent() {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
      })

      if (error) {
        setErrorMessage(error.message || 'Une erreur est survenue lors du paiement.')
      }
    } catch (err) {
      console.error('Erreur de paiement:', err)
      setErrorMessage('Une erreur inattendue est survenue.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-8">
      <PaymentElement />
      
      {errorMessage && (
        <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
      )}
      
      <button 
        type="submit" 
        disabled={!stripe || isLoading}
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold rounded-md transition-colors"
      >
        {isLoading ? 'Traitement en cours...' : 'Payer maintenant'}
      </button>
    </form>
  )
}

// Composant wrapper avec Elements
type CheckoutFormProps = {
  clientSecret: string
}

export function CheckoutForm({ clientSecret }: CheckoutFormProps) {
  if (!clientSecret) {
    return <div>Chargement du formulaire de paiement...</div>
  }

  // Apparence personnalisée
  const appearance: Appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#3b82f6', // Couleur bleue de TailwindCSS
      colorText: '#1f2937', // Texte foncé pour meilleure lisibilité
      colorTextSecondary: '#4b5563', // Texte secondaire
      colorTextPlaceholder: '#6b7280',
      colorBackground: '#ffffff',
      colorDanger: '#ef4444',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      spacingUnit: '4px',
      borderRadius: '4px',
    },
    rules: {
      '.Label': {
        color: '#1f2937',
        fontWeight: '500',
      },
      '.Tab': {
        color: '#4b5563',
        borderColor: '#e5e7eb',
      },
      '.Tab:hover': {
        color: '#1f2937',
      },
      '.Tab--selected': {
        borderColor: '#3b82f6',
        color: '#1f2937',
      },
      '.Input': {
        borderColor: '#d1d5db',
      },
      // Style spécifique pour le header Link
      '.Link': {
        color: '#1f2937',
      },
      // Amélioration du titre du formulaire
      '.PaymentElement .StripeElement--webkit-autofill': {
        background: 'transparent !important',
      },
      // Header du formulaire
      '.Label--heading': {
        color: '#1f2937',
        fontWeight: '600',
        fontSize: '16px',
      },
    },
  }

  // Options pour limiter à la carte bancaire uniquement
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
    // Note: Les méthodes de paiement sont contrôlées côté serveur
    // dans l'API createPaymentIntent
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutFormContent />
    </Elements>
  )
} 