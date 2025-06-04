'use client'

import { useState } from 'react'
import { SavedAddress, savedAddressToShippingAddress } from '@/lib/addresses'
import { ShippingAddress } from '@/hooks/useShipping'

interface SavedAddressesProps {
  addresses: SavedAddress[]
  onSelectAddress: (address: ShippingAddress) => void
  onEditAddress?: (address: SavedAddress) => void
  onDeleteAddress?: (addressId: number) => void
  selectedAddressId?: number | null
  isLoading?: boolean
}

export function SavedAddresses({
  addresses,
  onSelectAddress,
  onEditAddress,
  onDeleteAddress,
  selectedAddressId,
  isLoading = false
}: SavedAddressesProps) {
  const [expandedAddressId, setExpandedAddressId] = useState<number | null>(null)

  const handleSelectAddress = async (address: SavedAddress) => {
    const shippingAddress = await savedAddressToShippingAddress(address)
    onSelectAddress(shippingAddress)
  }

  const toggleExpanded = (addressId: number) => {
    setExpandedAddressId(expandedAddressId === addressId ? null : addressId)
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Adresses sauvegardées</h3>
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-sm text-gray-600">Chargement des adresses...</span>
        </div>
      </div>
    )
  }

  if (addresses.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <p className="text-gray-600 text-center">Aucune adresse sauvegardée</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Adresses sauvegardées</h3>
      
      <div className="space-y-3">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedAddressId === address.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div 
                className="flex-grow"
                onClick={() => handleSelectAddress(address)}
              >
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={`address-${address.id}`}
                    name="saved-address"
                    checked={selectedAddressId === address.id}
                    onChange={() => handleSelectAddress(address)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label 
                    htmlFor={`address-${address.id}`}
                    className="ml-3 text-sm font-medium text-gray-900 cursor-pointer"
                  >
                    {address.name}
                  </label>
                </div>

                <div className="ml-7 text-sm text-gray-600">
                  <p className="font-medium">
                    {address.firstName} {address.lastName}
                  </p>
                  <p>{address.streetAddress}</p>
                  <p>
                    {address.postalCode} {address.city}, {address.country}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleExpanded(address.id)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {expandedAddressId === address.id ? 'Réduire' : 'Options'}
                </button>
              </div>
            </div>

            {/* Options étendues */}
            {expandedAddressId === address.id && (
              <div className="mt-3 pt-3 border-t border-gray-200 flex items-center space-x-4">
                {onEditAddress && (
                  <button
                    onClick={() => onEditAddress(address)}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Modifier
                  </button>
                )}
                
                {onDeleteAddress && (
                  <button
                    onClick={() => onDeleteAddress(address.id)}
                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    Supprimer
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-500">
        <p>
          💡 Sélectionnez une adresse sauvegardée ou saisissez une nouvelle adresse ci-dessous.
        </p>
      </div>
    </div>
  )
} 