import type {
    UPSRateRequest,
    UPSRateResponse,
    ShippingRateParams,
    ShippingRate
} from '@/types/ups'

// Configuration de l'API UPS
const UPS_API_BASE_URL = process.env.UPS_API_BASE_URL || 'https://wwwcie.ups.com'
const UPS_API_VERSION = 'v2409'
const UPS_REQUEST_OPTION = 'Rate'

// Mapping des codes de service UPS
const UPS_SERVICE_CODES = {
    // Services domestiques US (non disponibles depuis la France)
    '01': 'UPS Next Day Air',
    '02': 'UPS 2nd Day Air',
    '03': 'UPS Ground',
    '12': 'UPS 3 Day Select',
    '13': 'UPS Next Day Air Saver',
    '14': 'UPS Next Day Air Early AM',
    '59': 'UPS 2nd Day Air AM',

    // Services internationaux (disponibles depuis la France)
    '07': 'UPS Worldwide Express',
    '08': 'UPS Worldwide Expedited',
    '11': 'UPS Standard',
    '54': 'UPS Worldwide Express Plus',
    '65': 'UPS Saver',

    // Services européens spécifiques
    '82': 'UPS Today Standard',
    '83': 'UPS Today Dedicated Courier',
    '84': 'UPS Today Intercity',
    '85': 'UPS Today Express',
    '86': 'UPS Today Express Saver'
} as const

// Services disponibles depuis la France
const FRANCE_AVAILABLE_SERVICES = ['07', '08', '11', '54', '65', '82', '83', '84', '85', '86']

/**
 * Obtient un token d'authentification UPS
 */
async function getUPSAuthToken(): Promise<string> {
    const clientId = process.env.UPS_CLIENT_ID
    const clientSecret = process.env.UPS_CLIENT_SECRET

    if (!clientId || !clientSecret) {
        throw new Error('Variables d\'environnement UPS manquantes (UPS_CLIENT_ID, UPS_CLIENT_SECRET)')
    }

    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

    const response = await fetch(`${UPS_API_BASE_URL}/security/v1/oauth/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${authString}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials'
    })

    if (!response.ok) {
        const errorText = await response.text()
        console.error('Erreur d\'authentification UPS:', {
            status: response.status,
            statusText: response.statusText,
            body: errorText,
            url: `${UPS_API_BASE_URL}/security/v1/oauth/token`
        })
        throw new Error(`Erreur d'authentification UPS: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    return data.access_token
}

/**
 * Construit la requête UPS à partir des paramètres simplifiés
 */
function buildUPSRateRequest(params: ShippingRateParams): UPSRateRequest {
    const dimensionUnit = params.packageDimensions.unit === 'IN' ? 'Inches' : 'Centimeters'
    const weightUnit = params.packageWeight.unit === 'LBS' ? 'Pounds' : 'Kilograms'

    // Sélectionner un service valide pour la France
    let serviceCode = params.serviceCode || '11' // UPS Standard par défaut pour la France

    // Validation du service pour la France
    if (params.shipperAddress.CountryCode === 'FR' && !FRANCE_AVAILABLE_SERVICES.includes(serviceCode)) {
        console.warn(`Service ${serviceCode} non disponible depuis la France, utilisation de UPS Standard (11)`)
        serviceCode = '11'
    }

    const serviceDescription = UPS_SERVICE_CODES[serviceCode as keyof typeof UPS_SERVICE_CODES] || 'Standard'

    // Nettoyer les StateProvinceCode pour la France (doivent être vides)
    const cleanAddress = (address: any) => ({
        ...address,
        StateProvinceCode: address.CountryCode === 'FR' ? '' : address.StateProvinceCode
    })

    return {
        RateRequest: {
            Request: {
                TransactionReference: {
                    CustomerContext: `Rate-${Date.now()}`
                }
            },
            Shipment: {
                Shipper: {
                    Name: params.shipperName,
                    ShipperNumber: params.shipperNumber,
                    Address: cleanAddress(params.shipperAddress)
                },
                ShipTo: {
                    Name: params.shipToName,
                    Address: cleanAddress(params.shipToAddress)
                },
                ShipFrom: {
                    Name: params.shipFromName,
                    Address: cleanAddress(params.shipFromAddress)
                },
                PaymentDetails: {
                    ShipmentCharge: [
                        {
                            Type: '01',
                            BillShipper: {
                                AccountNumber: params.shipperNumber
                            }
                        }
                    ]
                },
                Service: {
                    Code: serviceCode,
                    Description: serviceDescription
                },
                NumOfPieces: '1',
                Package: {
                    PackagingType: {
                        Code: '02',
                        Description: 'Package'
                    },
                    Dimensions: {
                        UnitOfMeasurement: {
                            Code: params.packageDimensions.unit,
                            Description: dimensionUnit
                        },
                        Length: params.packageDimensions.length.toString(),
                        Width: params.packageDimensions.width.toString(),
                        Height: params.packageDimensions.height.toString()
                    },
                    PackageWeight: {
                        UnitOfMeasurement: {
                            Code: params.packageWeight.unit,
                            Description: weightUnit
                        },
                        Weight: params.packageWeight.weight.toString()
                    }
                }
            }
        }
    }
}

/**
 * Transforme la réponse UPS en format simplifié
 */
function transformUPSResponse(response: UPSRateResponse): ShippingRate[] {
    if (!response.RateResponse?.RatedShipment) {
        return []
    }

    return response.RateResponse.RatedShipment.map(shipment => ({
        serviceCode: shipment.Service.Code,
        serviceDescription: shipment.Service.Description,
        totalCharges: {
            currency: shipment.TotalCharges.CurrencyCode,
            amount: shipment.TotalCharges.MonetaryValue
        },
        transportationCharges: {
            currency: shipment.TransportationCharges.CurrencyCode,
            amount: shipment.TransportationCharges.MonetaryValue
        },
        baseServiceCharge: {
            currency: shipment.BaseServiceCharge.CurrencyCode,
            amount: shipment.BaseServiceCharge.MonetaryValue
        }
    }))
}

/**
 * Génère des tarifs de démonstration pour les tests
 */
function getDemoShippingRates(params: ShippingRateParams): ShippingRate[] {
    const basePrice = 15.99
    const weightMultiplier = params.packageWeight.weight * 0.5
    const distanceMultiplier = params.shipToAddress.CountryCode === params.shipperAddress.CountryCode ? 1 : 2

    return [
        {
            serviceCode: '03',
            serviceDescription: 'UPS Ground (Démo)',
            totalCharges: {
                currency: 'EUR',
                amount: (basePrice + weightMultiplier * distanceMultiplier).toFixed(2)
            },
            transportationCharges: {
                currency: 'EUR',
                amount: (basePrice * 0.8 + weightMultiplier * distanceMultiplier).toFixed(2)
            },
            baseServiceCharge: {
                currency: 'EUR',
                amount: basePrice.toFixed(2)
            }
        },
        {
            serviceCode: '02',
            serviceDescription: 'UPS 2nd Day Air (Démo)',
            totalCharges: {
                currency: 'EUR',
                amount: (basePrice * 1.8 + weightMultiplier * distanceMultiplier).toFixed(2)
            },
            transportationCharges: {
                currency: 'EUR',
                amount: (basePrice * 1.5 + weightMultiplier * distanceMultiplier).toFixed(2)
            },
            baseServiceCharge: {
                currency: 'EUR',
                amount: (basePrice * 1.3).toFixed(2)
            }
        },
        {
            serviceCode: '01',
            serviceDescription: 'UPS Next Day Air (Démo)',
            totalCharges: {
                currency: 'EUR',
                amount: (basePrice * 2.5 + weightMultiplier * distanceMultiplier).toFixed(2)
            },
            transportationCharges: {
                currency: 'EUR',
                amount: (basePrice * 2.2 + weightMultiplier * distanceMultiplier).toFixed(2)
            },
            baseServiceCharge: {
                currency: 'EUR',
                amount: (basePrice * 2).toFixed(2)
            }
        }
    ]
}

/**
 * Obtient les tarifs de livraison UPS
 */
export async function getUPSShippingRates(params: ShippingRateParams): Promise<ShippingRate[]> {
    try {
        // Mode démo si les credentials ne sont pas configurés
        if (!process.env.UPS_CLIENT_ID || process.env.UPS_CLIENT_ID === 'test_client_id') {
            console.warn('Mode démo UPS activé - credentials non configurés')
            return getDemoShippingRates(params)
        }

        // Obtenir le token d'authentification
        const accessToken = await getUPSAuthToken()

        // Construire la requête
        const rateRequest = buildUPSRateRequest(params)

        // Faire l'appel à l'API UPS
        const response = await fetch(
            `${UPS_API_BASE_URL}/api/rating/${UPS_API_VERSION}/${UPS_REQUEST_OPTION}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'transId': `trans-${Date.now()}`,
                    'transactionSrc': 'marketplace'
                },
                body: JSON.stringify(rateRequest),
                // Cache pendant 5 minutes pour éviter les appels répétés
                next: { revalidate: 300 }
            }
        )

        if (!response.ok) {
            const errorText = await response.text()
            console.error('Réponse d\'erreur UPS:', {
                status: response.status,
                statusText: response.statusText,
                body: errorText
            })
            throw new Error(`Erreur API UPS: ${response.status} - ${errorText}`)
        }

        // Vérifier si la réponse est du JSON valide
        const contentType = response.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) {
            const textResponse = await response.text()
            console.error('Réponse non-JSON de UPS:', textResponse)
            throw new Error(`Réponse invalide de UPS: attendu JSON, reçu ${contentType}`)
        }

        const data: UPSRateResponse = await response.json()

        // Transformer et retourner la réponse
        return transformUPSResponse(data)

    } catch (error) {
        console.error('Erreur lors de l\'appel à l\'API UPS:', error)
        throw new Error(`Impossible d'obtenir les tarifs UPS: ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
    }
}

/**
 * Valide les paramètres de la requête UPS
 */
export function validateShippingParams(params: ShippingRateParams): string[] {
    const errors: string[] = []

    // Validation des champs obligatoires
    if (!params.shipperName) errors.push('Nom de l\'expéditeur requis')
    if (!params.shipperNumber) errors.push('Numéro d\'expéditeur UPS requis')
    if (!params.shipToName) errors.push('Nom du destinataire requis')
    if (!params.shipFromName) errors.push('Nom du point d\'expédition requis')

    // Validation des adresses
    if (!params.shipperAddress.City) errors.push('Ville de l\'expéditeur requise')
    if (!params.shipperAddress.PostalCode) errors.push('Code postal de l\'expéditeur requis')
    if (!params.shipperAddress.CountryCode) errors.push('Code pays de l\'expéditeur requis')

    if (!params.shipToAddress.City) errors.push('Ville du destinataire requise')
    if (!params.shipToAddress.PostalCode) errors.push('Code postal du destinataire requis')
    if (!params.shipToAddress.CountryCode) errors.push('Code pays du destinataire requis')

    // Validation des dimensions et poids
    if (params.packageDimensions.length <= 0) errors.push('Longueur du colis invalide')
    if (params.packageDimensions.width <= 0) errors.push('Largeur du colis invalide')
    if (params.packageDimensions.height <= 0) errors.push('Hauteur du colis invalide')
    if (params.packageWeight.weight <= 0) errors.push('Poids du colis invalide')

    return errors
} 