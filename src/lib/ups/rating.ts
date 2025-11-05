import { UPS_CONFIG, isUPSDemoMode } from './config'

/**
 * Interface for shipping address
 */
interface ShippingAddress {
  name: string
  addressLine1: string
  addressLine2?: string
  city: string
  stateProvinceCode?: string
  postalCode: string
  countryCode: string
}

/**
 * Interface for package dimensions
 */
interface Package {
  weight: number // in kg
  length: number // in cm
  width: number // in cm
  height: number // in cm
  packagingType?: string
}

/**
 * Interface for rating request
 */
interface RatingRequest {
  shipperAddress: ShippingAddress
  shipToAddress: ShippingAddress
  packages: Package[]
}

/**
 * Interface for shipping rate result
 */
interface ShippingRate {
  serviceCode: string
  serviceName: string
  totalCharges: string
  currency: string
  transitTime?: string
}

/**
 * Get UPS authentication token
 */
async function getAuthToken(): Promise<string> {
  const authString = Buffer.from(
    `${UPS_CONFIG.CLIENT_ID}:${UPS_CONFIG.CLIENT_SECRET}`
  ).toString('base64')

  const response = await fetch(`${UPS_CONFIG.API_BASE_URL}/security/v1/oauth/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${authString}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials'
  })

  if (!response.ok) {
    throw new Error(`UPS authentication failed: ${response.statusText}`)
  }

  const data = await response.json()
  return data.access_token
}

/**
 * Calculate shipping rate for a specific service
 */
async function calculateServiceRate(
  request: RatingRequest,
  serviceCode: string,
  token: string
): Promise<ShippingRate | null> {
  try {
    const totalPackages = request.packages.length
    const mainPackage = request.packages[0]

    const rateRequest = {
      RateRequest: {
        Request: {
          TransactionReference: {
            CustomerContext: `Rate-${Date.now()}-${serviceCode}`
          }
        },
        Shipment: {
          Shipper: {
            Name: request.shipperAddress.name,
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
            Name: request.shipToAddress.name,
            Address: {
              AddressLine: [request.shipToAddress.addressLine1],
              City: request.shipToAddress.city,
              StateProvinceCode: request.shipToAddress.stateProvinceCode || '',
              PostalCode: request.shipToAddress.postalCode,
              CountryCode: request.shipToAddress.countryCode
            }
          },
          ShipFrom: {
            Name: request.shipperAddress.name,
            Address: {
              AddressLine: [request.shipperAddress.addressLine1],
              City: request.shipperAddress.city,
              StateProvinceCode: request.shipperAddress.stateProvinceCode || '',
              PostalCode: request.shipperAddress.postalCode,
              CountryCode: request.shipperAddress.countryCode
            }
          },
          Service: {
            Code: serviceCode,
            Description: UPS_CONFIG.AVAILABLE_SERVICES[serviceCode as keyof typeof UPS_CONFIG.AVAILABLE_SERVICES] || 'Standard'
          },
          NumOfPieces: totalPackages.toString(),
          Package: {
            PackagingType: {
              Code: mainPackage.packagingType || '02',
              Description: 'Package'
            },
            Dimensions: {
              UnitOfMeasurement: {
                Code: 'CM',
                Description: 'Centimeters'
              },
              Length: mainPackage.length.toFixed(0),
              Width: mainPackage.width.toFixed(0),
              Height: mainPackage.height.toFixed(0)
            },
            PackageWeight: {
              UnitOfMeasurement: {
                Code: 'KGS',
                Description: 'Kilograms'
              },
              Weight: mainPackage.weight.toFixed(2)
            }
          }
        }
      }
    }

    const response = await fetch(
      `${UPS_CONFIG.API_BASE_URL}/api/rating/${UPS_CONFIG.API_VERSION}/Rate`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'transId': `trans-${Date.now()}`,
          'transactionSrc': 'marketplace'
        },
        body: JSON.stringify(rateRequest)
      }
    )

    if (!response.ok) {
      console.error(`Service ${serviceCode} failed:`, response.statusText)
      return null
    }

    const data = await response.json()
    const ratedShipment = data.RateResponse?.RatedShipment?.[0]

    if (!ratedShipment) {
      return null
    }

    return {
      serviceCode,
      serviceName: UPS_CONFIG.AVAILABLE_SERVICES[serviceCode as keyof typeof UPS_CONFIG.AVAILABLE_SERVICES] || 'Standard',
      totalCharges: ratedShipment.TotalCharges?.MonetaryValue || '0',
      currency: ratedShipment.TotalCharges?.CurrencyCode || 'EUR',
      transitTime: ratedShipment.TimeInTransit?.ServiceSummary?.EstimatedArrival?.Arrival?.Date || undefined
    }
  } catch (error) {
    console.error(`Error calculating rate for service ${serviceCode}:`, error)
    return null
  }
}

/**
 * Generate demo shipping rates for testing
 */
function generateDemoRates(request: RatingRequest): ShippingRate[] {
  const basePrice = 15.99
  const totalWeight = request.packages.reduce((sum, pkg) => sum + pkg.weight, 0)
  const weightMultiplier = totalWeight * 0.5
  const isInternational = request.shipToAddress.countryCode !== request.shipperAddress.countryCode

  return [
    {
      serviceCode: '11',
      serviceName: 'UPS Standard (Demo)',
      totalCharges: (basePrice + weightMultiplier * (isInternational ? 2 : 1)).toFixed(2),
      currency: 'EUR'
    },
    {
      serviceCode: '08',
      serviceName: 'UPS Worldwide Expedited (Demo)',
      totalCharges: (basePrice * 1.5 + weightMultiplier * (isInternational ? 2 : 1)).toFixed(2),
      currency: 'EUR'
    },
    {
      serviceCode: '07',
      serviceName: 'UPS Worldwide Express (Demo)',
      totalCharges: (basePrice * 2 + weightMultiplier * (isInternational ? 2 : 1)).toFixed(2),
      currency: 'EUR'
    }
  ]
}

/**
 * Calculate rates for multiple UPS services
 */
export async function calculateMultipleServiceRates(
  request: RatingRequest
): Promise<ShippingRate[]> {
  // Use demo rates if UPS is not configured
  if (isUPSDemoMode()) {
    console.warn('UPS Demo Mode: Using simulated shipping rates')
    return generateDemoRates(request)
  }

  try {
    const token = await getAuthToken()
    const serviceCodes = Object.keys(UPS_CONFIG.AVAILABLE_SERVICES)

    // Calculate rates for all services in parallel
    const ratePromises = serviceCodes.map(code =>
      calculateServiceRate(request, code, token)
    )

    const rates = await Promise.all(ratePromises)

    // Filter out null results and return
    return rates.filter((rate): rate is ShippingRate => rate !== null)
  } catch (error) {
    console.error('Error calculating UPS rates:', error)
    // Fallback to demo rates on error
    console.warn('Falling back to demo rates due to error')
    return generateDemoRates(request)
  }
}

