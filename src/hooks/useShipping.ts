import { useState, useEffect } from 'react'
import { useCart } from './useCart'
import { UPSRate } from '@/lib/ups/config'
import { PriceOption } from '@/types'

export interface ShippingAddress {
    addressLine1: string
    city: string
    stateProvinceCode?: string
    postalCode: string
    countryCode: string
}

export interface ShippingOption extends UPSRate {
    id: string
    isSelected: boolean
}

export function useShipping() {
    const { items } = useCart()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([])
    const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null)
    const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null)

    // Vérifier si des articles physiques sont dans le panier
    const hasPhysicalItems = items.some(item =>
        item.purchaseType === PriceOption.PHYSICAL ||
        item.purchaseType === PriceOption.NFT_PLUS_PHYSICAL
    )

    // Calculer les frais de livraison
    const calculateShipping = async (address: ShippingAddress) => {
        if (!hasPhysicalItems) {
            setShippingOptions([])
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/shipping/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartItems: items,
                    shippingAddress: address
                })
            })

            if (!response.ok) {
                throw new Error('Erreur lors du calcul des frais de livraison')
            }

            const data = await response.json()

            if (data.error) {
                throw new Error(data.error)
            }

            // Convertir les tarifs UPS en options de livraison
            const options: ShippingOption[] = data.rates.map((rate: UPSRate, index: number) => ({
                ...rate,
                id: `ups-${rate.serviceCode}-${index}`,
                isSelected: false
            }))

            setShippingOptions(options)
            setShippingAddress(address)

            // Sélectionner automatiquement l'option la moins chère
            if (options.length > 0) {
                const cheapestOption = options.reduce((prev, current) =>
                    prev.totalCharges < current.totalCharges ? prev : current
                )
                selectShippingOption(cheapestOption.id)
            }

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue'
            setError(errorMessage)
            console.error('Erreur lors du calcul des frais de livraison:', err)
        } finally {
            setIsLoading(false)
        }
    }

    // Sélectionner une option de livraison
    const selectShippingOption = (optionId: string) => {
        const updatedOptions = shippingOptions.map(option => ({
            ...option,
            isSelected: option.id === optionId
        }))

        setShippingOptions(updatedOptions)

        const selected = updatedOptions.find(option => option.isSelected)
        setSelectedShipping(selected || null)
    }

    // Obtenir le coût de livraison sélectionné
    const getShippingCost = (): number => {
        return selectedShipping?.totalCharges || 0
    }

    // Vérifier si une adresse est valide pour le calcul
    const isValidAddress = (address: Partial<ShippingAddress>): address is ShippingAddress => {
        return !!(
            address.addressLine1 &&
            address.city &&
            address.postalCode &&
            address.countryCode
        )
    }

    // Réinitialiser les options de livraison
    const resetShipping = () => {
        setShippingOptions([])
        setSelectedShipping(null)
        setShippingAddress(null)
        setError(null)
    }

    // Effet pour réinitialiser si le panier change
    useEffect(() => {
        if (!hasPhysicalItems) {
            resetShipping()
        }
    }, [hasPhysicalItems, items])

    return {
        // État
        isLoading,
        error,
        shippingOptions,
        selectedShipping,
        shippingAddress,
        hasPhysicalItems,

        // Actions
        calculateShipping,
        selectShippingOption,
        resetShipping,
        isValidAddress,

        // Getters
        getShippingCost
    }
} 