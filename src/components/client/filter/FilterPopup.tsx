'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface Technique {
  id: number
  name: string
}

interface FilterPopupProps {
  isOpen: boolean
  onClose: () => void
  filterType: 'price' | 'technique'
  onApply: (values: { min: number; max: number } | { selectedTechnique: number }) => void
  initialValues?: { min: number; max: number }
  maxPrice?: number
  techniques?: Technique[]
  selectedTechnique?: number
}

export function FilterPopup({ 
  isOpen, 
  onClose, 
  filterType, 
  onApply, 
  initialValues = { min: 0, max: 10000 },
  maxPrice = 10000,
  techniques = [],
  selectedTechnique = 0
}: FilterPopupProps) {
  const [minValue, setMinValue] = useState(initialValues.min)
  const [maxValue, setMaxValue] = useState(initialValues.max)
  const [selectedTechniqueId, setSelectedTechniqueId] = useState<number>(selectedTechnique)

  useEffect(() => {
    if (isOpen) {
      setMinValue(initialValues.min)
      setMaxValue(initialValues.max)
    }
  }, [isOpen, initialValues])

  // Initialiser seulement une fois au montage
  useEffect(() => {
    console.log('Component mounted, initializing selectedTechniqueId to:', selectedTechnique)
    setSelectedTechniqueId(selectedTechnique)
  }, []) // Pas de dépendances = exécuté une seule fois

  // Debug log pour vérifier l'état
  useEffect(() => {
    if (filterType === 'technique') {
      console.log('FilterPopup technique state:', {
        selectedTechnique,
        selectedTechniqueId,
        techniques: techniques.length
      })
    }
  }, [selectedTechnique, selectedTechniqueId, filterType, techniques])

  const handleApply = () => {
    if (filterType === 'price') {
      console.log('Applying price filter:', { min: minValue, max: maxValue })
      onApply({ min: minValue, max: maxValue })
    } else {
      console.log('Applying technique filter:', { selectedTechnique: selectedTechniqueId })
      onApply({ selectedTechnique: selectedTechniqueId })
    }
    onClose()
  }

  const handleReset = () => {
    if (filterType === 'price') {
      const defaultValues = { min: 0, max: maxPrice }
      setMinValue(defaultValues.min)
      setMaxValue(defaultValues.max)
      onApply(defaultValues)
    } else {
      setSelectedTechniqueId(0)
      onApply({ selectedTechnique: 0 })
    }
    onClose()
  }

  const handleTechniqueSelect = (techniqueId: number) => {
    console.log('Selecting technique:', techniqueId, 'current:', selectedTechniqueId)
    setSelectedTechniqueId(techniqueId)
    console.log('After setState, should be:', techniqueId)
  }

  if (!isOpen) return null

  const maxLimit = filterType === 'price' ? maxPrice : 200
  const unit = filterType === 'price' ? '€' : 'cm'
  const step = filterType === 'price' ? 50 : 1

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="relative bg-white rounded-2xl p-6 mx-4 w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Filter by {filterType === 'price' ? 'price' : 'technique'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content based on filter type */}
        {filterType === 'price' ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Range of price
              </label>
              
              {/* Range slider container */}
              <div className="relative">
                <div className="relative h-2 bg-gray-200 rounded-lg">
                  {/* Track between thumbs */}
                  <div 
                    className="absolute h-2 bg-black rounded-lg"
                    style={{
                      left: `${(minValue / maxLimit) * 100}%`,
                      width: `${((maxValue - minValue) / maxLimit) * 100}%`
                    }}
                  />
                  
                  {/* Min range input */}
                  <input
                    type="range"
                    min={0}
                    max={maxLimit}
                    step={step}
                    value={minValue}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      if (value < maxValue) {
                        setMinValue(value)
                      }
                    }}
                    className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer range-slider"
                  />
                  
                  {/* Max range input */}
                  <input
                    type="range"
                    min={0}
                    max={maxLimit}
                    step={step}
                    value={maxValue}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      if (value > minValue) {
                        setMaxValue(value)
                      }
                    }}
                    className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer range-slider"
                  />
                </div>
                
                {/* Value labels */}
                <div className="flex justify-between text-sm text-gray-500 mt-3">
                  <span>0{unit}</span>
                  <span>{maxLimit}{unit}</span>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                Display artworks from <span className="font-semibold">{minValue}{unit}</span> to <span className="font-semibold">{maxValue}{unit}</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Select techniques
              </label>
              
              {/* Option "Toutes les techniques" */}
              <div className="max-h-64 overflow-y-auto space-y-2">
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                  <div className="relative">
                    <input
                      type="radio"
                      id="technique-all"
                      name="technique"
                      checked={selectedTechniqueId === 0}
                      onChange={() => handleTechniqueSelect(0)}
                      className="sr-only"
                    />
                    <div 
                      className={`w-4 h-4 border-2 rounded-full cursor-pointer flex items-center justify-center transition-colors ${
                        selectedTechniqueId === 0
                          ? 'bg-black border-black' 
                          : 'bg-white border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => handleTechniqueSelect(0)}
                    >
                      {selectedTechniqueId === 0 && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                  </div>
                  <label 
                    htmlFor="technique-all"
                    className="text-sm text-gray-700 cursor-pointer flex-1"
                    onClick={() => handleTechniqueSelect(0)}
                  >
                    Toutes les techniques
                  </label>
                </div>

                {/* Techniques list */}
                {techniques.map((technique) => (
                  <div
                    key={technique.id}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="relative">
                      <input
                        type="radio"
                        id={`technique-${technique.id}`}
                        name="technique"
                        checked={selectedTechniqueId === technique.id}
                        onChange={() => handleTechniqueSelect(technique.id)}
                        className="sr-only"
                      />
                      <div 
                        className={`w-4 h-4 border-2 rounded-full cursor-pointer flex items-center justify-center transition-colors ${
                          selectedTechniqueId === technique.id
                            ? 'bg-black border-black' 
                            : 'bg-white border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => handleTechniqueSelect(technique.id)}
                      >
                        {selectedTechniqueId === technique.id && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                    </div>
                    <label 
                      htmlFor={`technique-${technique.id}`}
                      className="text-sm text-gray-700 cursor-pointer flex-1"
                      onClick={() => handleTechniqueSelect(technique.id)}
                    >
                      {technique.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                {selectedTechniqueId === 0 
                  ? 'Toutes les techniques sélectionnées'
                  : `Technique sélectionnée : ${techniques.find(t => t.id === selectedTechniqueId)?.name || 'Inconnue'}`
                }
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>

      <style jsx>{`
        .range-slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #000;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: all;
          position: relative;
          z-index: 1;
        }

        .range-slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #000;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: all;
        }

        .range-slider::-webkit-slider-track {
          background: transparent;
        }

        .range-slider::-moz-range-track {
          background: transparent;
        }

        /* Styles pour les checkboxes */
        input[type="checkbox"]:checked {
          background-color: #000000 !important;
          border-color: #000000 !important;
        }

        input[type="checkbox"]:checked::before {
          color: white !important;
        }

        input[type="checkbox"] {
          appearance: none;
          background-color: white;
          margin: 0;
          font: inherit;
          color: currentColor;
          width: 1rem;
          height: 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.25rem;
          transform: translateY(-0.075em);
          display: grid;
          place-content: center;
        }

        input[type="checkbox"]::before {
          content: "✓";
          transform: scale(0);
          transition: 120ms transform ease-in-out;
          box-shadow: inset 1em 1em white;
          background-color: white;
          transform-origin: center;
          clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
        }

        input[type="checkbox"]:checked::before {
          transform: scale(1);
        }
      `}</style>
    </div>
  )
}

export default FilterPopup 