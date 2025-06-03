import { NextRequest, NextResponse } from 'next/server'
import { calculateMultipleServiceRates } from '@/lib/ups/rating'
import { UPS_CONFIG } from '@/lib/ups/config'
import { CartItem } from '@/store/cartStore'
import { PriceOption } from '@/types'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { cartItems, shippingAddress } = body

        // Validation des données
        if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
            return NextResponse.json(
                { error: 'Le panier est vide ou invalide' },
                { status: 400 }
            )
        }

        if (!shippingAddress) {
            return NextResponse.json(
                { error: 'Adresse de livraison requise' },
                { status: 400 }
            )
        }

        // Validation de l'adresse de livraison
        const requiredFields = ['addressLine1', 'city', 'postalCode', 'countryCode']
        const missingFields = requiredFields.filter(field => !shippingAddress[field])

        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: `Champs manquants dans l'adresse: ${missingFields.join(', ')}` },
                { status: 400 }
            )
        }

        // Filtrer uniquement les items physiques
        const physicalItems = cartItems.filter((item: CartItem) =>
            item.purchaseType === PriceOption.PHYSICAL ||
            item.purchaseType === PriceOption.NFT_PLUS_PHYSICAL
        )

        if (physicalItems.length === 0) {
            return NextResponse.json({
                rates: [],
                message: 'Aucun article physique dans le panier'
            })
        }

        // Convertir les items du panier en packages UPS
        const packages = physicalItems.map((item: CartItem) => {
            const nft = item.nft

            // Validation et valeurs par défaut pour les dimensions
            const weight = Math.max(parseFloat(nft.weight?.toString() || '1'), 0.1) // Minimum 0.1 kg
            const width = Math.max(parseFloat(nft.width?.toString() || '30'), 1) // Minimum 1 cm
            const height = Math.max(parseFloat(nft.height?.toString() || '5'), 1) // Minimum 1 cm
            // Pour la longueur, on utilise la largeur par défaut (package carré)
            const length = width

            return {
                weight,
                length,
                width,
                height,
                packagingType: '02' // Customer Supplied Package
            }
        })

        // Préparer la requête UPS
        const upsRequest = {
            shipperAddress: {
                name: UPS_CONFIG.SHIPPER_ADDRESS.name,
                addressLine1: UPS_CONFIG.SHIPPER_ADDRESS.addressLine1,
                city: UPS_CONFIG.SHIPPER_ADDRESS.city,
                stateProvinceCode: UPS_CONFIG.SHIPPER_ADDRESS.stateProvinceCode,
                postalCode: UPS_CONFIG.SHIPPER_ADDRESS.postalCode,
                countryCode: UPS_CONFIG.SHIPPER_ADDRESS.countryCode
            },
            shipToAddress: {
                name: shippingAddress.name || 'Customer',
                addressLine1: shippingAddress.addressLine1,
                addressLine2: shippingAddress.addressLine2,
                city: shippingAddress.city,
                stateProvinceCode: shippingAddress.stateProvinceCode || '',
                postalCode: shippingAddress.postalCode,
                countryCode: shippingAddress.countryCode
            },
            packages
        }

        console.log('Requête UPS:', JSON.stringify(upsRequest, null, 2))

        // Calculer les tarifs UPS pour tous les services disponibles
        const rates = await calculateMultipleServiceRates(upsRequest)

        if (rates.length === 0) {
            return NextResponse.json({
                rates: [],
                message: 'Aucun tarif de livraison disponible pour cette destination'
            })
        }

        // Formater les tarifs pour le front-end
        const formattedRates = rates.map(rate => ({
            id: `ups-${rate.serviceCode}`,
            name: rate.serviceName,
            description: rate.transitTime || 'Délai non spécifié',
            price: rate.totalCharges,
            currency: rate.currency,
            serviceCode: rate.serviceCode,
            transitTime: rate.transitTime
        }))

        return NextResponse.json({
            rates: formattedRates,
            message: 'Tarifs de livraison calculés avec succès'
        })

    } catch (error) {
        console.error('Erreur lors du calcul des tarifs de livraison:', error)

        // Retourner une erreur plus spécifique selon le type d'erreur
        if (error instanceof Error) {
            if (error.message.includes('UPS:')) {
                return NextResponse.json(
                    { error: `Erreur UPS: ${error.message}` },
                    { status: 400 }
                )
            }
            if (error.message.includes('Authentication')) {
                return NextResponse.json(
                    { error: 'Erreur d\'authentification UPS. Vérifiez la configuration.' },
                    { status: 401 }
                )
            }
        }

        return NextResponse.json(
            { error: 'Erreur lors du calcul des tarifs de livraison' },
            { status: 500 }
        )
    }
} 