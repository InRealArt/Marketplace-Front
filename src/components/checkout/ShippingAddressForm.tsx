'use client'

import { useState, useEffect } from 'react'
import { ShippingAddress } from '@/hooks/useShipping'
import { useAddresses } from '@/hooks/useAddresses'
import { SavedAddresses } from './SavedAddresses'
import { shippingAddressToCreateInput } from '@/lib/addresses'
import { useSession } from '@/lib/auth-client'
import { toast } from 'sonner'

interface ShippingAddressFormProps {
  onAddressChange: (address: ShippingAddress) => void
  isLoading?: boolean
  initialAddress?: Partial<ShippingAddress>
}

export function ShippingAddressForm({ 
  onAddressChange, 
  isLoading = false, 
  initialAddress = {} 
}: ShippingAddressFormProps) {
  const { data: session } = useSession()
  const { 
    addresses, 
    isLoading: isLoadingAddresses, 
    addAddress, 
    removeAddress,
    hasAddresses 
  } = useAddresses()

  const [address, setAddress] = useState<Partial<ShippingAddress>>({
    addressLine1: initialAddress.addressLine1 || '',
    city: initialAddress.city || '',
    stateProvinceCode: initialAddress.stateProvinceCode || '',
    postalCode: initialAddress.postalCode || '',
    countryCode: initialAddress.countryCode || 'FR'
  })

  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    addressName: ''
  })

  const [errors, setErrors] = useState<Partial<ShippingAddress>>({})
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null)
  const [showSaveOption, setShowSaveOption] = useState(false)
  const [shouldSaveAddress, setShouldSaveAddress] = useState(false)
  const [showManualForm, setShowManualForm] = useState(!hasAddresses)

  // Mettre à jour l'affichage du formulaire manuel selon les adresses disponibles
  useEffect(() => {
    setShowManualForm(!hasAddresses)
  }, [hasAddresses])

  const validateField = (field: keyof ShippingAddress, value: string) => {
    const newErrors = { ...errors }

    switch (field) {
      case 'addressLine1':
        if (!value.trim()) {
          newErrors.addressLine1 = 'L\'adresse est requise'
        } else {
          delete newErrors.addressLine1
        }
        break
      case 'city':
        if (!value.trim()) {
          newErrors.city = 'La ville est requise'
        } else {
          delete newErrors.city
        }
        break
      case 'postalCode':
        if (!value.trim()) {
          newErrors.postalCode = 'Le code postal est requis'
        } else if (address.countryCode === 'FR' && !/^\d{5}$/.test(value)) {
          newErrors.postalCode = 'Code postal français invalide (5 chiffres)'
        } else {
          delete newErrors.postalCode
        }
        break
      case 'countryCode':
        if (!value.trim()) {
          newErrors.countryCode = 'Le pays est requis'
        } else {
          delete newErrors.countryCode
        }
        break
    }

    setErrors(newErrors)
  }

  const handleFieldChange = (field: keyof ShippingAddress, value: string) => {
    const newAddress = { ...address, [field]: value }
    setAddress(newAddress)
    validateField(field, value)
    setSelectedAddressId(null) // Désélectionner les adresses sauvegardées
    setShowSaveOption(true) // Montrer l'option de sauvegarde

    // Si l'adresse est complète et valide, déclencher le callback
    if (isAddressComplete(newAddress) && Object.keys(errors).length === 0) {
      onAddressChange(newAddress as ShippingAddress)
    }
  }

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }))
  }

  const handleSavedAddressSelect = (shippingAddress: ShippingAddress, addressId?: number) => {
    setAddress(shippingAddress)
    setSelectedAddressId(addressId || null)
    setShowSaveOption(false)
    setShowManualForm(false)
    onAddressChange(shippingAddress)
  }

  const handleDeleteAddress = async (addressId: number) => {
    const success = await removeAddress(addressId)
    if (success) {
      toast.success('Adresse supprimée avec succès')
      if (selectedAddressId === addressId) {
        setSelectedAddressId(null)
      }
    } else {
      toast.error('Erreur lors de la suppression de l\'adresse')
    }
  }

  const handleSaveAddress = async () => {
    if (!session?.user || !isAddressComplete(address) || !personalInfo.firstName || !personalInfo.lastName) {
      toast.error('Veuillez remplir tous les champs obligatoires')
      return
    }

    const addressName = personalInfo.addressName || 
      `${personalInfo.firstName} ${personalInfo.lastName} - ${address.city}`

    const newAddress = await addAddress(
      await shippingAddressToCreateInput(
        address as ShippingAddress,
        addressName,
        personalInfo.firstName,
        personalInfo.lastName,
        session.user.id
      )
    )

    if (newAddress) {
      toast.success('Adresse sauvegardée avec succès')
      setShouldSaveAddress(false)
      setShowSaveOption(false)
    } else {
      toast.error('Erreur lors de la sauvegarde de l\'adresse')
    }
  }

  const isAddressComplete = (addr: Partial<ShippingAddress>): addr is ShippingAddress => {
    return !!(
      addr.addressLine1?.trim() &&
      addr.city?.trim() &&
      addr.postalCode?.trim() &&
      addr.countryCode?.trim()
    )
  }

  const countries = [
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Allemagne' },
    { code: 'ES', name: 'Espagne' },
    { code: 'IT', name: 'Italie' },
    { code: 'BE', name: 'Belgique' },
    { code: 'NL', name: 'Pays-Bas' },
    { code: 'CH', name: 'Suisse' },
    { code: 'LU', name: 'Luxembourg' },
    { code: 'AT', name: 'Autriche' },
    { code: 'PT', name: 'Portugal' },
    { code: 'GB', name: 'Royaume-Uni' },
    { code: 'US', name: 'États-Unis' },
    { code: 'CA', name: 'Canada' }
  ]

  return (
    <div className="space-y-6">
      {/* Adresses sauvegardées */}
      {session?.user && hasAddresses && (
        <SavedAddresses
          addresses={addresses}
          onSelectAddress={(addr) => handleSavedAddressSelect(addr, addresses.find(a => 
            a.streetAddress === addr.addressLine1 && 
            a.city === addr.city && 
            a.postalCode === addr.postalCode
          )?.id)}
          onDeleteAddress={handleDeleteAddress}
          selectedAddressId={selectedAddressId}
          isLoading={isLoadingAddresses}
        />
      )}

      {/* Bouton pour afficher le formulaire manuel */}
      {session?.user && hasAddresses && !showManualForm && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setShowManualForm(true)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            + Utiliser une nouvelle adresse
          </button>
        </div>
      )}

      {/* Formulaire manuel */}
      {showManualForm && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              {hasAddresses ? 'New delivery address' : 'Delivery address'}
            </h3>
            {hasAddresses && (
              <button
                type="button"
                onClick={() => setShowManualForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Informations personnelles (pour la sauvegarde) */}
          {session?.user && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-md">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={personalInfo.firstName}
                  onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Jean"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={personalInfo.lastName}
                  onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Dupont"
                  disabled={isLoading}
                />
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 gap-4">
            {/* Adresse */}
            <div>
              <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <input
                type="text"
                id="addressLine1"
                value={address.addressLine1 || ''}
                onChange={(e) => handleFieldChange('addressLine1', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.addressLine1 ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="123 Rue de la Paix"
                disabled={isLoading}
              />
              {errors.addressLine1 && (
                <p className="mt-1 text-sm text-red-600">{errors.addressLine1}</p>
              )}
            </div>

            {/* Ville et Code postal */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  value={address.city || ''}
                  onChange={(e) => handleFieldChange('city', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.city ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Paris"
                  disabled={isLoading}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                )}
              </div>

              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Postal code *
                </label>
                <input
                  type="text"
                  id="postalCode"
                  value={address.postalCode || ''}
                  onChange={(e) => handleFieldChange('postalCode', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.postalCode ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="75001"
                  disabled={isLoading}
                />
                {errors.postalCode && (
                  <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>
                )}
              </div>
            </div>

            {/* Région/État et Pays */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="stateProvinceCode" className="block text-sm font-medium text-gray-700 mb-1">
                  State/Province
                </label>
                <input
                  type="text"
                  id="stateProvinceCode"
                  value={address.stateProvinceCode || ''}
                  onChange={(e) => handleFieldChange('stateProvinceCode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Île-de-France"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Pays *
                </label>
                <select
                  id="countryCode"
                  value={address.countryCode || 'FR'}
                  onChange={(e) => handleFieldChange('countryCode', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.countryCode ? 'border-red-300' : 'border-gray-300'
                  }`}
                  disabled={isLoading}
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.countryCode && (
                  <p className="mt-1 text-sm text-red-600">{errors.countryCode}</p>
                )}
              </div>
            </div>
          </div>

          {/* Option de sauvegarde */}
          {session?.user && showSaveOption && isAddressComplete(address) && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="saveAddress"
                  checked={shouldSaveAddress}
                  onChange={(e) => setShouldSaveAddress(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="saveAddress" className="ml-2 text-sm text-gray-900">
                  Save this address for future orders
                </label>
              </div>

              {shouldSaveAddress && (
                <div className="mt-3">
                  <label htmlFor="addressName" className="block text-sm font-medium text-gray-700 mb-1">
                    Address name (optional)
                  </label>
                  <input
                    type="text"
                    id="addressName"
                    value={personalInfo.addressName}
                    onChange={(e) => handlePersonalInfoChange('addressName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Domicile, Bureau, etc."
                  />
                  <button
                    type="button"
                    onClick={handleSaveAddress}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                  >
                    Save address
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-sm text-gray-600">Computing shipping rates...</span>
        </div>
      )}
    </div>
  )
} 