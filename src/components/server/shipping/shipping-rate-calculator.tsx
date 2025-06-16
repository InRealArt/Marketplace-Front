import { getUPSShippingRates, validateShippingParams } from '@/lib/ups/ups-api'
import type { ShippingRateParams, ShippingRate } from '@/types/ups'

interface ShippingRateCalculatorProps {
  shippingParams: ShippingRateParams
}

export default async function ShippingRateCalculator({ 
  shippingParams 
}: ShippingRateCalculatorProps) {
  // Validation côté serveur
  const validationErrors = validateShippingParams(shippingParams)
  
  if (validationErrors.length > 0) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-semibold mb-2">
          Erreurs de validation
        </h3>
        <ul className="text-red-700 text-sm space-y-1">
          {validationErrors.map((error, index) => (
            <li key={index}>• {error}</li>
          ))}
        </ul>
      </div>
    )
  }

  try {
    // Appel à l'API UPS
    const shippingRates = await getUPSShippingRates(shippingParams)
    
    if (shippingRates.length === 0) {
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">
            Aucun tarif de livraison disponible pour cette destination.
          </p>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Options de livraison disponibles
        </h3>
        
        <div className="grid gap-3">
          {shippingRates.map((rate) => (
            <ShippingRateCard key={rate.serviceCode} rate={rate} />
          ))}
        </div>
      </div>
    )
    
  } catch (error) {
    console.error('Erreur lors du calcul des tarifs:', error)
    
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-semibold mb-2">
          Erreur de calcul
        </h3>
        <p className="text-red-700 text-sm">
          Impossible de calculer les tarifs de livraison. Veuillez réessayer plus tard.
        </p>
      </div>
    )
  }
}

// Composant pour afficher une option de livraison
function ShippingRateCard({ rate }: { rate: ShippingRate }) {
  const formatPrice = (amount: string, currency: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency
    }).format(parseFloat(amount))
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">
            {rate.serviceDescription}
          </h4>
          <p className="text-sm text-gray-600 mt-1">
            Code service: {rate.serviceCode}
          </p>
          
          {/* Détail des coûts */}
          <div className="mt-3 space-y-1 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Frais de base:</span>
              <span>
                {formatPrice(rate.baseServiceCharge.amount, rate.baseServiceCharge.currency)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Transport:</span>
              <span>
                {formatPrice(rate.transportationCharges.amount, rate.transportationCharges.currency)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-right ml-4">
          <div className="text-lg font-semibold text-gray-900">
            {formatPrice(rate.totalCharges.amount, rate.totalCharges.currency)}
          </div>
          <div className="text-sm text-gray-600">
            Total TTC
          </div>
        </div>
      </div>
    </div>
  )
} 