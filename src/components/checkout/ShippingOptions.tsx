'use client'

import { ShippingOption } from '@/hooks/useShipping'

interface ShippingOptionsProps {
  options: ShippingOption[]
  onSelectOption: (optionId: string) => void
  isLoading?: boolean
  error?: string | null
}

export function ShippingOptions({ 
  options, 
  onSelectOption, 
  isLoading = false,
  error = null 
}: ShippingOptionsProps) {
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <h3 className="text-lg font-medium text-red-800 mb-2">Error calculating shipping rates</h3>
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Shipping options</h3>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Calculating shipping options...</span>
        </div>
      </div>
    )
  }

  if (options.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <h3 className="text-lg font-medium text-yellow-800 mb-2">No shipping options</h3>
        <p className="text-yellow-600">
          No shipping options are available for this address.
        </p>
      </div>
    )
  }

  const formatTransitTime = (transitTime?: string) => {
    if (!transitTime) return ''
    
    const days = parseInt(transitTime)
    if (days === 1) return '1 working day'
    if (days > 1) return `${days} working days`
    return ''
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Shipping options</h3>
      
      <div className="space-y-3">
        {options.map((option) => (
          <div
            key={option.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              option.isSelected
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onSelectOption(option.id)}
          >
            <div className="flex items-center">
              <input
                type="radio"
                id={option.id}
                name="shipping-option"
                checked={option.isSelected}
                onChange={() => onSelectOption(option.id)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              
              <div className="ml-3 flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <label
                      htmlFor={option.id}
                      className="text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      {option.serviceName}
                    </label>
                    
                    {option.transitTime && (
                      <p className="text-sm text-gray-500 mt-1">
                        Livraison en {formatTransitTime(option.transitTime)}
                      </p>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <span className="text-lg font-semibold text-gray-900">
                      {option.totalCharges.toFixed(2)} {option.currency}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-500 mt-4">
        <p>
          💡 Shipping rates are calculated in real time by UPS based on the dimensions 
          and weight of your artworks.
        </p>
      </div>
    </div>
  )
} 