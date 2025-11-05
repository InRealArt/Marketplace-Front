/**
 * UPS Rate interface
 */
export interface UPSRate {
  serviceCode: string
  serviceName: string
  totalCharges: string
  currency: string
  transitTime?: string
}

/**
 * UPS API Configuration
 */

export const UPS_CONFIG = {
  // API Credentials
  CLIENT_ID: process.env.UPS_CLIENT_ID || '',
  CLIENT_SECRET: process.env.UPS_CLIENT_SECRET || '',
  ACCOUNT_NUMBER: process.env.UPS_ACCOUNT_NUMBER || '',

  // API URLs
  API_BASE_URL: process.env.UPS_API_BASE_URL || 'https://wwwcie.ups.com',
  API_VERSION: 'v2409',

  // Shipper Address (Your company address)
  SHIPPER_ADDRESS: {
    name: process.env.UPS_SHIPPER_NAME || 'InRealArt',
    addressLine1: process.env.UPS_SHIPPER_ADDRESS_LINE1 || '123 Rue Example',
    city: process.env.UPS_SHIPPER_CITY || 'Paris',
    stateProvinceCode: process.env.UPS_SHIPPER_STATE || '',
    postalCode: process.env.UPS_SHIPPER_POSTAL_CODE || '75001',
    countryCode: process.env.UPS_SHIPPER_COUNTRY || 'FR'
  },

  // Available UPS Services from France
  AVAILABLE_SERVICES: {
    '07': 'UPS Worldwide Express',
    '08': 'UPS Worldwide Expedited',
    '11': 'UPS Standard',
    '54': 'UPS Worldwide Express Plus',
    '65': 'UPS Saver',
    '82': 'UPS Today Standard',
    '83': 'UPS Today Dedicated Courier',
    '84': 'UPS Today Intercity',
    '85': 'UPS Today Express',
    '86': 'UPS Today Express Saver'
  } as const,

  // Default service code
  DEFAULT_SERVICE_CODE: '11' // UPS Standard
}

/**
 * Check if UPS is properly configured
 */
export function isUPSConfigured(): boolean {
  return !!(
    UPS_CONFIG.CLIENT_ID &&
    UPS_CONFIG.CLIENT_SECRET &&
    UPS_CONFIG.ACCOUNT_NUMBER &&
    UPS_CONFIG.CLIENT_ID !== 'test_client_id'
  )
}

/**
 * Get demo mode status
 */
export function isUPSDemoMode(): boolean {
  return !isUPSConfigured()
}

