'use server'

import prisma from './prisma'
import { ShippingAddress } from '@/hooks/useShipping'

export interface SavedAddress {
    id: number
    name: string
    firstName: string
    lastName: string
    streetAddress: string
    city: string
    postalCode: string
    country: string
    countryCode: string
    vatNumber?: string | null
    customerId?: string | null
    backofficeUserId?: number | null
}

export interface CreateAddressInput {
    name: string
    firstName: string
    lastName: string
    streetAddress: string
    city: string
    postalCode: string
    country: string
    countryCode: string
    vatNumber?: string
    customerId?: string
    backofficeUserId?: number
}

// Obtenir toutes les adresses d'un utilisateur
export async function getUserAddresses(userId: string): Promise<SavedAddress[]> {
    try {
        const addresses = await prisma.address.findMany({
            where: {
                customerId: userId
            },
            orderBy: {
                id: 'desc'
            }
        })

        return addresses
    } catch (error) {
        console.error('Erreur lors de la récupération des adresses:', error)
        throw new Error('Impossible de récupérer les adresses')
    }
}

// Obtenir toutes les adresses d'un utilisateur backoffice
export async function getBackofficeUserAddresses(backofficeUserId: number): Promise<SavedAddress[]> {
    try {
        const addresses = await prisma.address.findMany({
            where: {
                backofficeUserId
            },
            orderBy: {
                id: 'desc'
            }
        })

        return addresses
    } catch (error) {
        console.error('Erreur lors de la récupération des adresses:', error)
        throw new Error('Impossible de récupérer les adresses')
    }
}

// Créer une nouvelle adresse
export async function createAddress(addressData: CreateAddressInput): Promise<SavedAddress> {
    try {
        const newAddress = await prisma.address.create({
            data: addressData
        })

        return newAddress
    } catch (error) {
        console.error('Erreur lors de la création de l\'adresse:', error)
        throw new Error('Impossible de créer l\'adresse')
    }
}

// Mettre à jour une adresse existante
export async function updateAddress(
    addressId: number,
    addressData: Partial<CreateAddressInput>,
    userId?: string,
    backofficeUserId?: number
): Promise<SavedAddress> {
    try {
        // Vérifier que l'adresse appartient bien à l'utilisateur
        const existingAddress = await prisma.address.findFirst({
            where: {
                id: addressId,
                OR: [
                    { customerId: userId },
                    { backofficeUserId: backofficeUserId }
                ]
            }
        })

        if (!existingAddress) {
            throw new Error('Adresse non trouvée ou accès non autorisé')
        }

        const updatedAddress = await prisma.address.update({
            where: { id: addressId },
            data: addressData
        })

        return updatedAddress
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'adresse:', error)
        throw new Error('Impossible de mettre à jour l\'adresse')
    }
}

// Supprimer une adresse
export async function deleteAddress(
    addressId: number,
    userId?: string,
    backofficeUserId?: number
): Promise<void> {
    try {
        // Vérifier que l'adresse appartient bien à l'utilisateur
        const existingAddress = await prisma.address.findFirst({
            where: {
                id: addressId,
                OR: [
                    { customerId: userId },
                    { backofficeUserId: backofficeUserId }
                ]
            }
        })

        if (!existingAddress) {
            throw new Error('Adresse non trouvée ou accès non autorisé')
        }

        await prisma.address.delete({
            where: { id: addressId }
        })
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'adresse:', error)
        throw new Error('Impossible de supprimer l\'adresse')
    }
}

// Obtenir une adresse spécifique
export async function getAddressById(
    addressId: number,
    userId?: string,
    backofficeUserId?: number
): Promise<SavedAddress | null> {
    try {
        const address = await prisma.address.findFirst({
            where: {
                id: addressId,
                OR: [
                    { customerId: userId },
                    { backofficeUserId: backofficeUserId }
                ]
            }
        })

        return address
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'adresse:', error)
        return null
    }
}

// Convertir une SavedAddress en ShippingAddress pour UPS
export async function savedAddressToShippingAddress(savedAddress: SavedAddress): Promise<ShippingAddress> {
    return {
        addressLine1: savedAddress.streetAddress,
        city: savedAddress.city,
        postalCode: savedAddress.postalCode,
        countryCode: savedAddress.countryCode,
        stateProvinceCode: undefined // Vous pouvez ajouter ce champ à votre table si nécessaire
    }
}

// Convertir une ShippingAddress en CreateAddressInput
export async function shippingAddressToCreateInput(
    shippingAddress: ShippingAddress,
    name: string,
    firstName: string,
    lastName: string,
    userId?: string,
    backofficeUserId?: number
): Promise<CreateAddressInput> {
    return {
        name,
        firstName,
        lastName,
        streetAddress: shippingAddress.addressLine1,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode,
        country: getCountryName(shippingAddress.countryCode),
        countryCode: shippingAddress.countryCode,
        customerId: userId,
        backofficeUserId
    }
}

// Fonction utilitaire pour obtenir le nom du pays à partir du code
function getCountryName(countryCode: string): string {
    const countries: { [key: string]: string } = {
        'FR': 'France',
        'DE': 'Allemagne',
        'ES': 'Espagne',
        'IT': 'Italie',
        'BE': 'Belgique',
        'NL': 'Pays-Bas',
        'CH': 'Suisse',
        'LU': 'Luxembourg',
        'AT': 'Autriche',
        'PT': 'Portugal',
        'GB': 'Royaume-Uni',
        'US': 'États-Unis',
        'CA': 'Canada'
    }

    return countries[countryCode] || countryCode
} 