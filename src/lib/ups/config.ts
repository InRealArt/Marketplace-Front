export const UPS_CONFIG = {
    // Utilisation du serveur de test UPS (Customer Integration Environment)
    API_BASE_URL: process.env.NODE_ENV === 'production'
        ? 'https://onlinetools.ups.com/api'
        : 'https://wwwcie.ups.com/api',

    // Identifiants UPS (à configurer dans .env)
    CLIENT_ID: process.env.UPS_CLIENT_ID,
    CLIENT_SECRET: process.env.UPS_CLIENT_SECRET,
    ACCOUNT_NUMBER: process.env.UPS_ACCOUNT_NUMBER,

    // Configuration par défaut pour l'expéditeur (votre adresse d'entreprise)
    SHIPPER_ADDRESS: {
        name: 'In Real Art',
        addressLine1: process.env.UPS_SHIPPER_ADDRESS_LINE1 || '',
        city: process.env.UPS_SHIPPER_CITY || '',
        stateProvinceCode: process.env.UPS_SHIPPER_STATE || '',
        postalCode: process.env.UPS_SHIPPER_POSTAL_CODE || '',
        countryCode: process.env.UPS_SHIPPER_COUNTRY || 'FR',
    },

    // Services UPS disponibles (codes européens)
    SERVICES: {
        STANDARD: '11', // UPS Standard
        EXPEDITED: '08', // UPS Expedited
        EXPRESS_PLUS: '54', // UPS Worldwide Express Plus
        EXPRESS: '07', // UPS Worldwide Express
        EXPRESS_SAVER: '65', // UPS Worldwide Express Saver
    },

    // Configuration par défaut des packages
    PACKAGE_DEFAULTS: {
        packagingType: '02', // Customer Supplied Package
        weightUnit: 'KGS',
        dimensionUnit: 'CM',
    }
}

export type UPSService = keyof typeof UPS_CONFIG.SERVICES

export interface UPSAddress {
    name?: string
    addressLine1: string
    addressLine2?: string
    city: string
    stateProvinceCode?: string
    postalCode: string
    countryCode: string
}

export interface UPSPackage {
    weight: number
    length: number
    width: number
    height: number
    packagingType?: string
}

export interface UPSRateRequest {
    shipperAddress: UPSAddress
    shipToAddress: UPSAddress
    packages: UPSPackage[]
    services?: UPSService[]
}

export interface UPSRate {
    serviceCode: string
    serviceName: string
    totalCharges: number
    currency: string
    transitTime?: string
} 