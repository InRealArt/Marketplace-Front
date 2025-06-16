// Types pour l'API UPS Rating
export interface UPSAddress {
    AddressLine?: string[]
    City: string
    StateProvinceCode?: string
    PostalCode: string
    CountryCode: string
}

export interface UPSShipper {
    Name: string
    ShipperNumber: string
    Address: UPSAddress
}

export interface UPSShipTo {
    Name: string
    Address: UPSAddress
}

export interface UPSShipFrom {
    Name: string
    Address: UPSAddress
}

export interface UPSPackageDimensions {
    UnitOfMeasurement: {
        Code: 'IN' | 'CM'
        Description: string
    }
    Length: string
    Width: string
    Height: string
}

export interface UPSPackageWeight {
    UnitOfMeasurement: {
        Code: 'LBS' | 'KGS'
        Description: string
    }
    Weight: string
}

export interface UPSPackage {
    SimpleRate?: {
        Description: string
        Code: string
    }
    PackagingType: {
        Code: string
        Description: string
    }
    Dimensions: UPSPackageDimensions
    PackageWeight: UPSPackageWeight
}

export interface UPSRateRequest {
    RateRequest: {
        Request: {
            TransactionReference: {
                CustomerContext: string
            }
        }
        Shipment: {
            Shipper: UPSShipper
            ShipTo: UPSShipTo
            ShipFrom: UPSShipFrom
            PaymentDetails: {
                ShipmentCharge: Array<{
                    Type: string
                    BillShipper: {
                        AccountNumber: string
                    }
                }>
            }
            Service: {
                Code: string
                Description: string
            }
            NumOfPieces: string
            Package: UPSPackage
        }
    }
}

export interface UPSRateResponse {
    RateResponse: {
        Response: {
            ResponseStatus: {
                Code: string
                Description: string
            }
        }
        RatedShipment: Array<{
            Service: {
                Code: string
                Description: string
            }
            RatedShipmentAlert?: Array<{
                Code: string
                Description: string
            }>
            BillingWeight: {
                UnitOfMeasurement: {
                    Code: string
                    Description: string
                }
                Weight: string
            }
            TransportationCharges: {
                CurrencyCode: string
                MonetaryValue: string
            }
            BaseServiceCharge: {
                CurrencyCode: string
                MonetaryValue: string
            }
            ItemizedCharges?: Array<{
                Code: string
                CurrencyCode: string
                MonetaryValue: string
            }>
            FRSShipmentData?: {
                TransportationCharges: {
                    CurrencyCode: string
                    MonetaryValue: string
                }
            }
            ServiceOptionsCharges: {
                CurrencyCode: string
                MonetaryValue: string
            }
            TotalCharges: {
                CurrencyCode: string
                MonetaryValue: string
            }
        }>
    }
}

// Types simplifiés pour l'usage dans les composants
export interface ShippingRateParams {
    // Expéditeur
    shipperName: string
    shipperNumber: string
    shipperAddress: UPSAddress

    // Destinataire
    shipToName: string
    shipToAddress: UPSAddress

    // Point d'expédition (peut être différent de l'expéditeur)
    shipFromName: string
    shipFromAddress: UPSAddress

    // Colis
    packageDimensions: {
        length: number
        width: number
        height: number
        unit: 'IN' | 'CM'
    }
    packageWeight: {
        weight: number
        unit: 'LBS' | 'KGS'
    }

    // Service (optionnel, par défaut Ground)
    serviceCode?: string
}

export interface ShippingRate {
    serviceCode: string
    serviceDescription: string
    totalCharges: {
        currency: string
        amount: string
    }
    transportationCharges: {
        currency: string
        amount: string
    }
    baseServiceCharge: {
        currency: string
        amount: string
    }
} 