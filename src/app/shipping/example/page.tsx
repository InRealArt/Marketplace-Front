import { Suspense } from 'react'
import ShippingRateCalculator from '@/components/server/shipping/shipping-rate-calculator'
import type { ShippingRateParams } from '@/types/ups'

// Exemple de paramètres de livraison
const exampleShippingParams: ShippingRateParams = {
  // Expéditeur (ton entreprise)
  shipperName: 'Mon Marketplace',
  shipperNumber: '0A1K18', // À remplacer par ton vrai numéro UPS
  shipperAddress: {
    AddressLine: ['123 Rue de Rivoli'],
    City: 'Paris',
    StateProvinceCode: '',
    PostalCode: '75001',
    CountryCode: 'FR'
  },
  
  // Destinataire (client)
  shipToName: 'Jean Dupont',
  shipToAddress: {
    AddressLine: ['5 Promenade des Anglais'],
    City: 'Nice',
    StateProvinceCode: '',
    PostalCode: '06000',
    CountryCode: 'FR'
  },
  
  // Point d'expédition (peut être différent de l'expéditeur)
  shipFromName: 'Entrepôt Principal',
  shipFromAddress: {
    AddressLine: ['15 Avenue des Champs-Élysées'],
    City: 'Paris',
    StateProvinceCode: '',
    PostalCode: '75008',
    CountryCode: 'FR'
  },
  
  // Caractéristiques du colis
  packageDimensions: {
    length: 30,    // cm
    width: 80,     // cm
    height: 100,    // cm
    unit: 'CM'
  },
  packageWeight: {
    weight: 10,   // kg
    unit: 'KGS'
  },
  
  // Service de livraison (valide pour la France)
  serviceCode: '11' // UPS Standard (disponible depuis la France)
}

// Composant de loading
function ShippingRatesSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-6 bg-gray-200 rounded w-64 animate-pulse" />
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-48 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                <div className="space-y-1">
                  <div className="h-4 bg-gray-200 rounded w-40 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-36 animate-pulse" />
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ShippingExamplePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Exemple de Calcul UPS
        </h1>
        <p className="text-gray-600">
          Cette page démontre l'utilisation du server component pour calculer 
          les tarifs de livraison UPS en temps réel.
        </p>
      </div>

      {/* Informations sur l'expédition */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Détails de l'expédition
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Expéditeur */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Expéditeur</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>{exampleShippingParams.shipperName}</p>
              <p>{exampleShippingParams.shipperAddress.AddressLine?.[0]}</p>
              <p>
                {exampleShippingParams.shipperAddress.City}, {' '}
                {exampleShippingParams.shipperAddress.PostalCode} {' '}
                {exampleShippingParams.shipperAddress.CountryCode}
              </p>
            </div>
          </div>
          
          {/* Destinataire */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Destinataire</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>{exampleShippingParams.shipToName}</p>
              <p>{exampleShippingParams.shipToAddress.AddressLine?.[0]}</p>
              <p>
                {exampleShippingParams.shipToAddress.City}, {' '}
                {exampleShippingParams.shipToAddress.PostalCode} {' '}
                {exampleShippingParams.shipToAddress.CountryCode}
              </p>
            </div>
          </div>
        </div>
        
        {/* Colis */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-medium text-gray-900 mb-2">Caractéristiques du colis</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Dimensions:</span> {' '}
              {exampleShippingParams.packageDimensions.length} x {' '}
              {exampleShippingParams.packageDimensions.width} x {' '}
              {exampleShippingParams.packageDimensions.height} {' '}
              {exampleShippingParams.packageDimensions.unit}
            </div>
            <div>
              <span className="font-medium">Poids:</span> {' '}
              {exampleShippingParams.packageWeight.weight} {' '}
              {exampleShippingParams.packageWeight.unit}
            </div>
          </div>
        </div>
      </div>

      {/* Calcul des tarifs */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <Suspense fallback={<ShippingRatesSkeleton />}>
          <ShippingRateCalculator shippingParams={exampleShippingParams} />
        </Suspense>
      </div>
      
      {/* Note d'avertissement */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800 text-sm">
          <strong>Note:</strong> Cet exemple utilise des données de test. 
          Pour utiliser en production, assurez-vous de configurer correctement 
          vos variables d'environnement UPS et d'utiliser vos vraies informations d'expéditeur.
        </p>
      </div>
    </div>
  )
} 