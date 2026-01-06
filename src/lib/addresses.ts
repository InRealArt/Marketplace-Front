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
        const addresses = await prisma.customerAddress.findMany({
            where: {
                customerId: userId
            },
            orderBy: {
                id: 'desc'
            }
        })

        return addresses.map(addr => ({
            ...addr,
            backofficeUserId: null
        }))
    } catch (error) {
        console.error('Erreur lors de la récupération des adresses:', error)
        throw new Error('Impossible de récupérer les adresses')
    }
}

// Obtenir toutes les adresses d'un utilisateur backoffice
export async function getBackofficeUserAddresses(backofficeUserId: number): Promise<SavedAddress[]> {
    try {
        const addresses = await prisma.artistAddress.findMany({
            where: {
                backofficeAuthUserId: String(backofficeUserId)
            },
            orderBy: {
                id: 'desc'
            }
        })

        return addresses.map(addr => ({
            id: addr.id,
            name: addr.name,
            firstName: addr.firstName,
            lastName: addr.lastName,
            streetAddress: addr.streetAddress,
            city: addr.city,
            postalCode: addr.postalCode,
            country: addr.country,
            countryCode: addr.countryCode,
            vatNumber: null,
            customerId: null,
            backofficeUserId: backofficeUserId
        }))
    } catch (error) {
        console.error('Erreur lors de la récupération des adresses:', error)
        throw new Error('Impossible de récupérer les adresses')
    }
}

// Créer une nouvelle adresse
export async function createAddress(addressData: CreateAddressInput): Promise<SavedAddress> {
    try {
        if (addressData.customerId) {
            const newAddress = await prisma.customerAddress.create({
                data: {
                    name: addressData.name,
                    firstName: addressData.firstName,
                    lastName: addressData.lastName,
                    streetAddress: addressData.streetAddress,
                    city: addressData.city,
                    postalCode: addressData.postalCode,
                    country: addressData.country,
                    countryCode: addressData.countryCode,
                    customerId: addressData.customerId
                }
            })
            return {
                ...newAddress,
                vatNumber: null,
                backofficeUserId: null
            }
        } else if (addressData.backofficeUserId) {
            const newAddress = await prisma.artistAddress.create({
                data: {
                    name: addressData.name,
                    firstName: addressData.firstName,
                    lastName: addressData.lastName,
                    streetAddress: addressData.streetAddress,
                    city: addressData.city,
                    postalCode: addressData.postalCode,
                    country: addressData.country,
                    countryCode: addressData.countryCode,
                    backofficeAuthUserId: String(addressData.backofficeUserId)
                }
            })
            return {
                id: newAddress.id,
                name: newAddress.name,
                firstName: newAddress.firstName,
                lastName: newAddress.lastName,
                streetAddress: newAddress.streetAddress,
                city: newAddress.city,
                postalCode: newAddress.postalCode,
                country: newAddress.country,
                countryCode: newAddress.countryCode,
                vatNumber: null,
                customerId: null,
                backofficeUserId: addressData.backofficeUserId
            }
        } else {
            throw new Error('customerId ou backofficeUserId requis')
        }
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
        if (userId) {
            const existingAddress = await prisma.customerAddress.findFirst({
                where: {
                    id: addressId,
                    customerId: userId
                }
            })

            if (!existingAddress) {
                throw new Error('Adresse non trouvée ou accès non autorisé')
            }

            const updatedAddress = await prisma.customerAddress.update({
                where: { id: addressId },
                data: {
                    name: addressData.name,
                    firstName: addressData.firstName,
                    lastName: addressData.lastName,
                    streetAddress: addressData.streetAddress,
                    city: addressData.city,
                    postalCode: addressData.postalCode,
                    country: addressData.country,
                    countryCode: addressData.countryCode
                }
            })

            return {
                ...updatedAddress,
                vatNumber: null,
                backofficeUserId: null
            }
        } else if (backofficeUserId) {
            const existingAddress = await prisma.artistAddress.findFirst({
                where: {
                    id: addressId,
                    backofficeAuthUserId: String(backofficeUserId)
                }
            })

            if (!existingAddress) {
                throw new Error('Adresse non trouvée ou accès non autorisé')
            }

            const updatedAddress = await prisma.artistAddress.update({
                where: { id: addressId },
                data: {
                    name: addressData.name,
                    firstName: addressData.firstName,
                    lastName: addressData.lastName,
                    streetAddress: addressData.streetAddress,
                    city: addressData.city,
                    postalCode: addressData.postalCode,
                    country: addressData.country,
                    countryCode: addressData.countryCode
                }
            })

            return {
                id: updatedAddress.id,
                name: updatedAddress.name,
                firstName: updatedAddress.firstName,
                lastName: updatedAddress.lastName,
                streetAddress: updatedAddress.streetAddress,
                city: updatedAddress.city,
                postalCode: updatedAddress.postalCode,
                country: updatedAddress.country,
                countryCode: updatedAddress.countryCode,
                vatNumber: null,
                customerId: null,
                backofficeUserId: backofficeUserId
            }
        } else {
            throw new Error('userId ou backofficeUserId requis')
        }
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
        if (userId) {
            const existingAddress = await prisma.customerAddress.findFirst({
                where: {
                    id: addressId,
                    customerId: userId
                }
            })

            if (!existingAddress) {
                throw new Error('Adresse non trouvée ou accès non autorisé')
            }

            await prisma.customerAddress.delete({
                where: { id: addressId }
            })
        } else if (backofficeUserId) {
            const existingAddress = await prisma.artistAddress.findFirst({
                where: {
                    id: addressId,
                    backofficeAuthUserId: String(backofficeUserId)
                }
            })

            if (!existingAddress) {
                throw new Error('Adresse non trouvée ou accès non autorisé')
            }

            await prisma.artistAddress.delete({
                where: { id: addressId }
            })
        } else {
            throw new Error('userId ou backofficeUserId requis')
        }
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
        if (userId) {
            const address = await prisma.customerAddress.findFirst({
                where: {
                    id: addressId,
                    customerId: userId
                }
            })

            if (!address) return null

            return {
                ...address,
                vatNumber: null,
                backofficeUserId: null
            }
        } else if (backofficeUserId) {
            const address = await prisma.artistAddress.findFirst({
                where: {
                    id: addressId,
                    backofficeAuthUserId: String(backofficeUserId)
                }
            })

            if (!address) return null

            return {
                id: address.id,
                name: address.name,
                firstName: address.firstName,
                lastName: address.lastName,
                streetAddress: address.streetAddress,
                city: address.city,
                postalCode: address.postalCode,
                country: address.country,
                countryCode: address.countryCode,
                vatNumber: null,
                customerId: null,
                backofficeUserId: backofficeUserId
            }
        } else {
            return null
        }
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