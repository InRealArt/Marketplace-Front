'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Récupérer l'ID de payment_intent depuis l'URL
    // Stripe ajoute automatiquement les paramètres payment_intent et payment_intent_client_secret à l'URL de retour
    const paymentIntent = searchParams?.get('payment_intent')
    
    if (paymentIntent) {
      setPaymentIntentId(paymentIntent)
    }
    
    setIsLoading(false)
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!paymentIntentId) {
    return (
      <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Error</h1>
          <p className="mb-8 text-gray-600">
            We were unable to confirm your payment. Please try again or contact our support team.
          </p>
          <Link 
            href="/checkout" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md"
          >
            Back to payment page
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-green-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment confirmed</h1>    
        
        <p className="text-lg text-gray-600 mb-6">
          Thank you for your order! Your payment has been processed successfully.
        </p>
        
        <div className="mb-8 p-4 bg-gray-50 rounded-md inline-block">
          <p className="text-sm text-gray-500">Transaction number: <span className="font-mono">{paymentIntentId}</span></p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md"
          >
            Back to home
          </Link>
          
          <Link 
            href="/dashboard" 
            className="inline-block bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-6 border border-gray-300 rounded-md"
          >
            See my dashboard
          </Link>
        </div>
      </div>
    </div>
  )
} 