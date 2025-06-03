import { useState, useEffect } from 'react'
import { useSession } from '@/lib/auth-client'
import {
    getUserAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    SavedAddress,
    CreateAddressInput
} from '@/lib/addresses'

export function useAddresses() {
    const { data: session } = useSession()
    const [addresses, setAddresses] = useState<SavedAddress[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const userId = session?.user?.id

    // Charger les adresses de l'utilisateur
    const loadAddresses = async () => {
        if (!userId) return

        setIsLoading(true)
        setError(null)

        try {
            const userAddresses = await getUserAddresses(userId)
            setAddresses(userAddresses)
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement des adresses'
            setError(errorMessage)
            console.error('Erreur lors du chargement des adresses:', err)
        } finally {
            setIsLoading(false)
        }
    }

    // Charger les adresses au montage du composant
    useEffect(() => {
        loadAddresses()
    }, [userId])

    // Créer une nouvelle adresse
    const addAddress = async (addressData: Omit<CreateAddressInput, 'customerId'>): Promise<SavedAddress | null> => {
        if (!userId) {
            setError('Utilisateur non connecté')
            return null
        }

        setIsLoading(true)
        setError(null)

        try {
            const newAddress = await createAddress({
                ...addressData,
                customerId: userId
            })

            // Ajouter la nouvelle adresse à la liste
            setAddresses(prev => [newAddress, ...prev])
            return newAddress
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la création de l\'adresse'
            setError(errorMessage)
            console.error('Erreur lors de la création de l\'adresse:', err)
            return null
        } finally {
            setIsLoading(false)
        }
    }

    // Mettre à jour une adresse existante
    const editAddress = async (
        addressId: number,
        addressData: Partial<CreateAddressInput>
    ): Promise<SavedAddress | null> => {
        if (!userId) {
            setError('Utilisateur non connecté')
            return null
        }

        setIsLoading(true)
        setError(null)

        try {
            const updatedAddress = await updateAddress(addressId, addressData, userId)

            // Mettre à jour la liste des adresses
            setAddresses(prev =>
                prev.map(addr => addr.id === addressId ? updatedAddress : addr)
            )

            return updatedAddress
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la mise à jour de l\'adresse'
            setError(errorMessage)
            console.error('Erreur lors de la mise à jour de l\'adresse:', err)
            return null
        } finally {
            setIsLoading(false)
        }
    }

    // Supprimer une adresse
    const removeAddress = async (addressId: number): Promise<boolean> => {
        if (!userId) {
            setError('Utilisateur non connecté')
            return false
        }

        setIsLoading(true)
        setError(null)

        try {
            await deleteAddress(addressId, userId)

            // Retirer l'adresse de la liste
            setAddresses(prev => prev.filter(addr => addr.id !== addressId))
            return true
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la suppression de l\'adresse'
            setError(errorMessage)
            console.error('Erreur lors de la suppression de l\'adresse:', err)
            return false
        } finally {
            setIsLoading(false)
        }
    }

    // Obtenir l'adresse par défaut (la première dans la liste)
    const getDefaultAddress = (): SavedAddress | null => {
        return addresses.length > 0 ? addresses[0] : null
    }

    // Vérifier si l'utilisateur a des adresses sauvegardées
    const hasAddresses = addresses.length > 0

    return {
        // État
        addresses,
        isLoading,
        error,
        hasAddresses,

        // Actions
        loadAddresses,
        addAddress,
        editAddress,
        removeAddress,

        // Getters
        getDefaultAddress
    }
} 