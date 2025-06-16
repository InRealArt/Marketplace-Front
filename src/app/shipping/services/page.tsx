import { Suspense } from 'react'

const FRANCE_SERVICES = [
  { code: '07', name: 'UPS Worldwide Express', description: 'Express international, 1-3 jours ouvrables' },
  { code: '08', name: 'UPS Worldwide Expedited', description: 'Expédié international, 2-5 jours ouvrables' },
  { code: '11', name: 'UPS Standard', description: 'Standard international, 3-5 jours ouvrables' },
  { code: '54', name: 'UPS Worldwide Express Plus', description: 'Express Plus international, 1-3 jours ouvrables' },
  { code: '65', name: 'UPS Saver', description: 'Économique international, 1-3 jours ouvrables' },
  { code: '82', name: 'UPS Today Standard', description: 'Livraison le jour même (villes européennes)' },
  { code: '83', name: 'UPS Today Dedicated Courier', description: 'Coursier dédié le jour même' },
  { code: '84', name: 'UPS Today Intercity', description: 'Inter-cités le jour même' },
  { code: '85', name: 'UPS Today Express', description: 'Express le jour même' },
  { code: '86', name: 'UPS Today Express Saver', description: 'Express Saver le jour même' }
]

const US_ONLY_SERVICES = [
  { code: '01', name: 'UPS Next Day Air', description: '❌ États-Unis uniquement' },
  { code: '02', name: 'UPS 2nd Day Air', description: '❌ États-Unis uniquement' },
  { code: '03', name: 'UPS Ground', description: '❌ États-Unis uniquement' },
  { code: '12', name: 'UPS 3 Day Select', description: '❌ États-Unis uniquement' },
  { code: '13', name: 'UPS Next Day Air Saver', description: '❌ États-Unis uniquement' },
  { code: '14', name: 'UPS Next Day Air Early AM', description: '❌ États-Unis uniquement' },
  { code: '59', name: 'UPS 2nd Day Air AM', description: '❌ États-Unis uniquement' }
]

export default function UPSServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Services UPS depuis la France
        </h1>
        <p className="text-gray-600">
          Voici les services UPS disponibles pour les expéditions depuis la France 
          et ceux qui ne sont pas disponibles.
        </p>
      </div>

      {/* Services disponibles */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-green-800 mb-6">
          ✅ Services disponibles depuis la France
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {FRANCE_SERVICES.map((service) => (
            <div key={service.code} className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-green-900">
                    {service.name}
                  </h3>
                  <p className="text-sm text-green-700 mt-1">
                    {service.description}
                  </p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-mono px-2 py-1 rounded">
                  {service.code}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services non disponibles */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-red-800 mb-6">
          ❌ Services NON disponibles depuis la France
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {US_ONLY_SERVICES.map((service) => (
            <div key={service.code} className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-red-900">
                    {service.name}
                  </h3>
                  <p className="text-sm text-red-700 mt-1">
                    {service.description}
                  </p>
                </div>
                <span className="bg-red-100 text-red-800 text-xs font-mono px-2 py-1 rounded">
                  {service.code}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explication de l'erreur */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          💡 Pourquoi l'erreur 111100 ?
        </h3>
        <div className="text-blue-800 space-y-3 text-sm">
          <p>
            <strong>Code erreur 111100:</strong> "The requested service is invalid from the selected origin"
          </p>
          <p>
            Cette erreur survient quand vous essayez d'utiliser un service UPS qui n'est pas 
            disponible depuis votre pays d'origine (la France dans votre cas).
          </p>
          <p>
            <strong>Solution:</strong> Utilisez uniquement les services marqués ✅ ci-dessus 
            pour vos expéditions depuis la France.
          </p>
          <p>
            <strong>Service recommandé:</strong> Code <code>11</code> (UPS Standard) 
            pour la plupart des expéditions internationales.
          </p>
        </div>
      </div>

      {/* Conseils */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-900 mb-3">
          📋 Conseils pour éviter l'erreur
        </h3>
        <ul className="text-yellow-800 space-y-2 text-sm">
          <li>• Utilisez le code <strong>11</strong> (UPS Standard) par défaut</li>
          <li>• Pour l'express international, utilisez le code <strong>07</strong> (Worldwide Express)</li>
          <li>• Évitez les codes 01, 02, 03 qui sont réservés aux États-Unis</li>
          <li>• Testez toujours avec des adresses réelles dans l'API UPS</li>
          <li>• Vérifiez que votre compte UPS supporte les services internationaux</li>
        </ul>
      </div>
    </div>
  )
} 