export default function TestRequestPage() {
  // Requête correcte pour la France
  const correctRequest = {
    "RateRequest": {
      "Request": {
        "TransactionReference": {
          "CustomerContext": "Rate-Test-France"
        }
      },
      "Shipment": {
        "Shipper": {
          "Name": "Mon Marketplace",
          "ShipperNumber": "0A1K18",
          "Address": {
            "AddressLine": ["123 Rue de Rivoli"],
            "City": "Paris",
            "StateProvinceCode": "", // ✅ VIDE pour la France
            "PostalCode": "75001",
            "CountryCode": "FR"
          }
        },
        "ShipTo": {
          "Name": "Jean Dupont",
          "Address": {
            "AddressLine": ["5 Promenade des Anglais"],
            "City": "Nice",
            "StateProvinceCode": "", // ✅ VIDE pour la France
            "PostalCode": "06000",
            "CountryCode": "FR"
          }
        },
        "ShipFrom": {
          "Name": "Entrepôt Principal",
          "Address": {
            "AddressLine": ["15 Avenue des Champs-Élysées"],
            "City": "Paris",
            "StateProvinceCode": "", // ✅ VIDE pour la France
            "PostalCode": "75008",
            "CountryCode": "FR"
          }
        },
        "PaymentDetails": {
          "ShipmentCharge": [
            {
              "Type": "01",
              "BillShipper": {
                "AccountNumber": "0A1K18"
              }
            }
          ]
        },
        "Service": {
          "Code": "11", // ✅ Code correct (sans zéro initial)
          "Description": "UPS Standard"
        },
        "NumOfPieces": "1",
        "Package": {
          // ❌ SUPPRIMÉ: SimpleRate (cause de l'erreur 111211)
          "PackagingType": {
            "Code": "02",
            "Description": "Package"
          },
          "Dimensions": {
            "UnitOfMeasurement": {
              "Code": "CM", // ✅ CM pour la France
              "Description": "Centimeters"
            },
            "Length": "30",
            "Width": "20", 
            "Height": "15"
          },
          "PackageWeight": {
            "UnitOfMeasurement": {
              "Code": "KGS", // ✅ KGS pour la France
              "Description": "Kilograms"
            },
            "Weight": "2.5"
          }
        }
      }
    }
  }

  // Votre ancienne requête (avec erreurs)
  const yourRequest = {
    "RateRequest": {
      "Request": {
        "TransactionReference": {
          "CustomerContext": "CustomerContext"
        }
      },
      "Shipment": {
        "Shipper": {
          "Name": "ShipperName",
          "ShipperNumber": "0A1K18",
          "Address": {
            "AddressLine": ["'123 Rue de Rivoli'"],
            "City": "PARIS",
            "StateProvinceCode": "75", // ❌ ERREUR: devrait être vide
            "PostalCode": "75001",
            "CountryCode": "FR"
          }
        },
        "ShipTo": {
          "Name": "Jean Dupont",
          "Address": {
            "AddressLine": ["5 Promenade des Anglais"],
            "City": "Nice",
            "StateProvinceCode": "06", // ❌ ERREUR: devrait être vide
            "PostalCode": "06000",
            "CountryCode": "FR"
          }
        },
        "ShipFrom": {
          "Name": "Entrepôt Principal",
          "Address": {
            "AddressLine": ["15 Avenue des Champs-Élysées"],
            "City": "PARIS",
            "StateProvinceCode": "75", // ❌ ERREUR: devrait être vide
            "PostalCode": "75008",
            "CountryCode": "FR"
          }
        },
        "PaymentDetails": {
          "ShipmentCharge": [
            {
              "Type": "01",
              "BillShipper": {
                "AccountNumber": "0A1K18"
              }
            }
          ]
        },
        "Service": {
          "Code": "011", // ❌ ERREUR: devrait être "11"
          "Description": "Ground"
        },
        "NumOfPieces": "1",
        "Package": [{
          "SimpleRate": { // ❌ ERREUR: cause l'erreur 111211
            "Description": "SimpleRateDescription",
            "Code": "XS"
          },
          "PackagingType": {
            "Code": "02",
            "Description": "Packaging"
          },
          "Dimensions": {
            "UnitOfMeasurement": {
              "Code": "IN", // ❌ ERREUR: devrait être "CM"
              "Description": "Inches"
            },
            "Length": "5",
            "Width": "5",
            "Height": "5"
          },
          "PackageWeight": {
            "UnitOfMeasurement": {
              "Code": "LBS", // ❌ ERREUR: devrait être "KGS"
              "Description": "Pounds"
            },
            "Weight": "1"
          }
        }]
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Comparaison des requêtes UPS
        </h1>
        <p className="text-gray-600">
          Voici la différence entre votre requête (qui cause l'erreur 111211) 
          et la requête correcte pour la France.
        </p>
      </div>

      {/* Erreur 111211 */}
      <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-red-800 mb-3">
          🚨 Erreur 111211 expliquée
        </h2>
        <p className="text-red-700 mb-4">
          <strong>Code 111211:</strong> "The requested accessory option is unavailable between the selected locations"
        </p>
        <div className="text-red-700 space-y-2 text-sm">
          <p><strong>Cause principale:</strong> Le champ <code>SimpleRate</code> n'est pas disponible pour les expéditions domestiques françaises.</p>
          <p><strong>Autres problèmes:</strong> Service code incorrect, StateProvinceCode invalide, unités de mesure inadaptées.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Votre requête avec erreurs */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-4">
            ❌ Votre requête (avec erreurs)
          </h3>
          <div className="bg-white rounded border p-4 overflow-auto">
            <pre className="text-xs text-gray-800 whitespace-pre-wrap">
              {JSON.stringify(yourRequest, null, 2)}
            </pre>
          </div>
          
          <div className="mt-4 space-y-2 text-sm">
            <p className="text-red-700">
              <span className="font-semibold">Erreurs détectées:</span>
            </p>
            <ul className="text-red-600 space-y-1 text-xs">
              <li>• Service "011" → devrait être "11"</li>
              <li>• SimpleRate → à supprimer entièrement</li>
              <li>• StateProvinceCode "75", "06" → devraient être vides</li>
              <li>• Unités "IN"/"LBS" → devraient être "CM"/"KGS"</li>
              <li>• Package en array → devrait être un objet</li>
            </ul>
          </div>
        </div>

        {/* Requête correcte */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-4">
            ✅ Requête correcte
          </h3>
          <div className="bg-white rounded border p-4 overflow-auto">
            <pre className="text-xs text-gray-800 whitespace-pre-wrap">
              {JSON.stringify(correctRequest, null, 2)}
            </pre>
          </div>
          
          <div className="mt-4 space-y-2 text-sm">
            <p className="text-green-700">
              <span className="font-semibold">Corrections appliquées:</span>
            </p>
            <ul className="text-green-600 space-y-1 text-xs">
              <li>• Service code: "11" (UPS Standard)</li>
              <li>• SimpleRate supprimé</li>
              <li>• StateProvinceCode vides pour la France</li>
              <li>• Unités métriques: CM/KGS</li>
              <li>• Package comme objet simple</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Conseils */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          💡 Règles pour les requêtes UPS France
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-blue-800">
          <div>
            <h4 className="font-semibold mb-2">✅ À faire:</h4>
            <ul className="space-y-1">
              <li>• StateProvinceCode vide pour FR</li>
              <li>• Unités métriques (CM, KGS)</li>
              <li>• Service codes internationaux</li>
              <li>• Package comme objet simple</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">❌ À éviter:</h4>
            <ul className="space-y-1">
              <li>• SimpleRate pour France</li>
              <li>• Codes postaux dans StateProvinceCode</li>
              <li>• Service codes US (01, 02, 03)</li>
              <li>• Unités impériales (IN, LBS)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 