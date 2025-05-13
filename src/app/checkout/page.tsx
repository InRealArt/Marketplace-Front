import { CheckoutClient } from './checkout-client'

export const metadata = {
  title: 'Paiement | In Real Art',
  description: 'Effectuez votre paiement en toute sécurité sur In Real Art'
}

export default function CheckoutPage() {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Finaliser votre commande</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="rounded-lg border p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Récapitulatif de la commande</h2>
          <CheckoutClient />
        </div>
        
        <div className="rounded-lg border p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Information importante</h2>
          <p className="text-gray-700 mb-4">
            Votre paiement est sécurisé par Stripe, un leader mondial des solutions de paiement en ligne. 
            Vos données de carte bancaire ne sont jamais stockées sur nos serveurs.
          </p>
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium mb-2 text-gray-900">Besoin d'aide?</h3>
            <p className="text-sm text-gray-700">
              Si vous rencontrez des difficultés lors du paiement, 
              n'hésitez pas à contacter notre équipe de support à 
              <a href="mailto:support@inrealart.com" className="text-blue-600 hover:underline ml-1">
                support@inrealart.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 