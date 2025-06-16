export default function UPSDebugPage() {
  const envVars = {
    UPS_CLIENT_ID: process.env.UPS_CLIENT_ID ? '✓ Configuré' : '✗ Manquant',
    UPS_CLIENT_SECRET: process.env.UPS_CLIENT_SECRET ? '✓ Configuré' : '✗ Manquant',
    UPS_ACCOUNT_NUMBER: process.env.UPS_ACCOUNT_NUMBER ? '✓ Configuré' : '✗ Manquant',
    UPS_API_BASE_URL: process.env.UPS_API_BASE_URL || 'https://wwwcie.ups.com (défaut)'
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Debug Configuration UPS
      </h1>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Variables d'environnement</h2>
        <div className="space-y-3">
          {Object.entries(envVars).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="font-mono text-sm">{key}:</span>
              <span className={`text-sm ${value.includes('✓') ? 'text-green-600' : 'text-red-600'}`}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          Pour configurer UPS API :
        </h3>
        <ol className="text-blue-800 space-y-2 text-sm">
          <li>1. Créez un compte développeur sur <strong>https://developer.ups.com/</strong></li>
          <li>2. Créez une nouvelle application dans votre tableau de bord</li>
          <li>3. Obtenez votre <strong>Client ID</strong> et <strong>Client Secret</strong></li>
          <li>4. Obtenez votre <strong>Account Number</strong> UPS</li>
          <li>5. Ajoutez ces variables à votre fichier <code>.env.local</code></li>
        </ol>
      </div>

      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800 text-sm">
          <strong>Erreur 404 :</strong> Cette erreur indique que soit vos credentials sont incorrects, 
          soit l'URL de l'API est incorrecte, soit votre compte UPS n'est pas encore activé pour l'API.
        </p>
      </div>
    </div>
  )
} 