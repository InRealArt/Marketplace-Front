import { getUPSAccessToken } from './auth'
import { UPS_CONFIG, UPSAddress, UPSPackage, UPSRate, UPSRateRequest } from './config'

export async function calculateShippingRates(request: UPSRateRequest): Promise<UPSRate[]> {
    try {
        const accessToken = await getUPSAccessToken()

        // Construire la requête UPS Rating API selon la documentation officielle
        const ratingRequest = {
            RateRequest: {
                Request: {
                    RequestOption: 'Rate'
                },
                Shipment: {
                    Shipper: {
                        Name: request.shipperAddress.name || UPS_CONFIG.SHIPPER_ADDRESS.name,
                        ShipperNumber: UPS_CONFIG.ACCOUNT_NUMBER,
                        Address: {
                            AddressLine: [request.shipperAddress.addressLine1],
                            City: request.shipperAddress.city,
                            StateProvinceCode: request.shipperAddress.stateProvinceCode || '',
                            PostalCode: request.shipperAddress.postalCode,
                            CountryCode: request.shipperAddress.countryCode
                        }
                    },
                    ShipTo: {
                        Name: request.shipToAddress.name || 'Customer',
                        Address: {
                            AddressLine: [request.shipToAddress.addressLine1],
                            City: request.shipToAddress.city,
                            StateProvinceCode: request.shipToAddress.stateProvinceCode || '',
                            PostalCode: request.shipToAddress.postalCode,
                            CountryCode: request.shipToAddress.countryCode
                        }
                    },
                    ShipFrom: {
                        Name: request.shipperAddress.name || UPS_CONFIG.SHIPPER_ADDRESS.name,
                        Address: {
                            AddressLine: [request.shipperAddress.addressLine1],
                            City: request.shipperAddress.city,
                            StateProvinceCode: request.shipperAddress.stateProvinceCode || '',
                            PostalCode: request.shipperAddress.postalCode,
                            CountryCode: request.shipperAddress.countryCode
                        }
                    },
                    Package: request.packages.map((pkg: UPSPackage) => ({
                        PackagingType: {
                            Code: pkg.packagingType || UPS_CONFIG.PACKAGE_DEFAULTS.packagingType
                        },
                        Dimensions: {
                            UnitOfMeasurement: {
                                Code: UPS_CONFIG.PACKAGE_DEFAULTS.dimensionUnit
                            },
                            Length: pkg.length.toString(),
                            Width: pkg.width.toString(),
                            Height: pkg.height.toString()
                        },
                        PackageWeight: {
                            UnitOfMeasurement: {
                                Code: UPS_CONFIG.PACKAGE_DEFAULTS.weightUnit
                            },
                            Weight: pkg.weight.toString()
                        }
                    })),
                    ShipmentRatingOptions: {
                        NegotiatedRatesIndicator: ''
                    }
                }
            }
        }

        // Appel à l'API UPS Rating v2403
        const response = await fetch(`${UPS_CONFIG.API_BASE_URL}/rating/v2403/Rate`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'transId': `rating-${Date.now()}`,
                'transactionSrc': 'InRealArt'
            },
            body: JSON.stringify(ratingRequest)
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.error('Erreur UPS Rating Response:', errorText)
            throw new Error(`Erreur lors du calcul des tarifs UPS: ${response.status} - ${errorText}`)
        }

        const data = await response.json()
        console.log('UPS Rating Response:', JSON.stringify(data, null, 2))

        // Parser la réponse UPS et retourner les tarifs formatés
        return parseUPSRatingResponse(data)
    } catch (error) {
        console.error('Erreur lors du calcul des tarifs UPS:', error)
        throw error
    }
}

function parseUPSRatingResponse(response: any): UPSRate[] {
    const rates: UPSRate[] = []

    try {
        const rateResponse = response.RateResponse
        if (!rateResponse) {
            console.warn('Pas de RateResponse dans la réponse UPS')
            return rates
        }

        // Gestion des erreurs UPS
        if (rateResponse.Response?.ResponseStatus?.Code !== '1') {
            const errors = rateResponse.Response?.Error
            if (errors) {
                const errorMessage = Array.isArray(errors)
                    ? errors.map(e => e.ErrorDescription).join(', ')
                    : errors.ErrorDescription
                console.error('Erreur UPS:', errorMessage)
                throw new Error(`Erreur UPS: ${errorMessage}`)
            }
        }

        if (!rateResponse.RatedShipment) {
            console.warn('Pas de RatedShipment dans la réponse UPS')
            return rates
        }

        // UPS peut retourner un seul RatedShipment ou un array
        const ratedShipments = Array.isArray(rateResponse.RatedShipment)
            ? rateResponse.RatedShipment
            : [rateResponse.RatedShipment]

        for (const shipment of ratedShipments) {
            const serviceCode = shipment.Service?.Code
            const serviceName = getServiceName(serviceCode)

            // Utiliser les tarifs négociés si disponibles, sinon les tarifs standards
            const charges = shipment.NegotiatedRateCharges?.TotalCharge || shipment.TotalCharges
            const totalCharges = parseFloat(charges?.MonetaryValue || '0')
            const currency = charges?.CurrencyCode || 'EUR'

            // Temps de transit
            let transitTime = undefined
            if (shipment.GuaranteedDelivery?.BusinessDaysInTransit) {
                transitTime = `${shipment.GuaranteedDelivery.BusinessDaysInTransit} jours ouvrés`
            } else if (shipment.TimeInTransit?.DaysInTransit) {
                transitTime = `${shipment.TimeInTransit.DaysInTransit} jours`
            }

            rates.push({
                serviceCode,
                serviceName,
                totalCharges,
                currency,
                transitTime
            })
        }
    } catch (error) {
        console.error('Erreur lors du parsing de la réponse UPS:', error)
        throw error
    }

    return rates
}

function getServiceName(serviceCode: string): string {
    const serviceNames: { [key: string]: string } = {
        '11': 'UPS Standard',
        '08': 'UPS Expedited',
        '54': 'UPS Worldwide Express Plus',
        '07': 'UPS Worldwide Express',
        '65': 'UPS Worldwide Express Saver',
        '96': 'UPS Worldwide Express Freight',
        '82': 'UPS Today Standard',
        '83': 'UPS Today Dedicated Courier',
        '84': 'UPS Today Intercity',
        '85': 'UPS Today Express',
        '86': 'UPS Today Express Saver'
    }

    return serviceNames[serviceCode] || `Service UPS ${serviceCode}`
}

// Fonction pour obtenir plusieurs tarifs avec différents services
export async function calculateMultipleServiceRates(request: UPSRateRequest): Promise<UPSRate[]> {
    try {
        const accessToken = await getUPSAccessToken()
        const allRates: UPSRate[] = []

        // Services à tester par défaut
        const services = request.services || Object.keys(UPS_CONFIG.SERVICES)

        for (const serviceKey of services) {
            try {
                const serviceCode = typeof serviceKey === 'string' && serviceKey in UPS_CONFIG.SERVICES
                    ? UPS_CONFIG.SERVICES[serviceKey as keyof typeof UPS_CONFIG.SERVICES]
                    : serviceKey

                // Construire la requête avec le service spécifique
                const ratingRequest = {
                    RateRequest: {
                        Request: {
                            RequestOption: 'Rate'
                        },
                        Shipment: {
                            Shipper: {
                                Name: request.shipperAddress.name || UPS_CONFIG.SHIPPER_ADDRESS.name,
                                ShipperNumber: UPS_CONFIG.ACCOUNT_NUMBER,
                                Address: {
                                    AddressLine: [request.shipperAddress.addressLine1],
                                    City: request.shipperAddress.city,
                                    StateProvinceCode: request.shipperAddress.stateProvinceCode || '',
                                    PostalCode: request.shipperAddress.postalCode,
                                    CountryCode: request.shipperAddress.countryCode
                                }
                            },
                            ShipTo: {
                                Name: request.shipToAddress.name || 'Customer',
                                Address: {
                                    AddressLine: [request.shipToAddress.addressLine1],
                                    City: request.shipToAddress.city,
                                    StateProvinceCode: request.shipToAddress.stateProvinceCode || '',
                                    PostalCode: request.shipToAddress.postalCode,
                                    CountryCode: request.shipToAddress.countryCode
                                }
                            },
                            ShipFrom: {
                                Name: request.shipperAddress.name || UPS_CONFIG.SHIPPER_ADDRESS.name,
                                Address: {
                                    AddressLine: [request.shipperAddress.addressLine1],
                                    City: request.shipperAddress.city,
                                    StateProvinceCode: request.shipperAddress.stateProvinceCode || '',
                                    PostalCode: request.shipperAddress.postalCode,
                                    CountryCode: request.shipperAddress.countryCode
                                }
                            },
                            Service: {
                                Code: serviceCode
                            },
                            Package: request.packages.map((pkg: UPSPackage) => ({
                                PackagingType: {
                                    Code: pkg.packagingType || UPS_CONFIG.PACKAGE_DEFAULTS.packagingType
                                },
                                Dimensions: {
                                    UnitOfMeasurement: {
                                        Code: UPS_CONFIG.PACKAGE_DEFAULTS.dimensionUnit
                                    },
                                    Length: pkg.length.toString(),
                                    Width: pkg.width.toString(),
                                    Height: pkg.height.toString()
                                },
                                PackageWeight: {
                                    UnitOfMeasurement: {
                                        Code: UPS_CONFIG.PACKAGE_DEFAULTS.weightUnit
                                    },
                                    Weight: pkg.weight.toString()
                                }
                            })),
                            ShipmentRatingOptions: {
                                NegotiatedRatesIndicator: ''
                            }
                        }
                    }
                }

                const response = await fetch(`${UPS_CONFIG.API_BASE_URL}/rating/v2403/Rate`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                        'transId': `rating-${Date.now()}-${serviceCode}`,
                        'transactionSrc': 'InRealArt'
                    },
                    body: JSON.stringify(ratingRequest)
                })

                if (response.ok) {
                    const data = await response.json()
                    const rates = parseUPSRatingResponse(data)
                    allRates.push(...rates)
                } else {
                    console.warn(`Impossible de calculer les tarifs pour le service ${serviceCode}:`, response.status)
                }
            } catch (error) {
                console.warn(`Erreur pour le service ${serviceKey}:`, error)
            }
        }

        // Trier les tarifs par prix croissant
        return allRates.sort((a, b) => a.totalCharges - b.totalCharges)
    } catch (error) {
        console.error('Erreur lors du calcul des tarifs multiples UPS:', error)
        throw error
    }
} 