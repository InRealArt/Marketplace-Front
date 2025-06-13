'use client'

import { useState } from 'react'
import { parseAsInteger, parseAsString, parseAsArrayOf, useQueryState } from 'nuqs'
import Badge from './FilterBadge'
import FilterPopup from './FilterPopup'

interface Technique {
  id: number
  name: string
}

interface FiltersSectionProps {
  totalItems: number
  filteredItemsCount?: number
  maxPrice: number
  className?: string
  techniques?: Technique[]
}

export function FiltersSection({ totalItems, filteredItemsCount, maxPrice, className = '', techniques = [] }: FiltersSectionProps) {
  const [showPriceFilter, setShowPriceFilter] = useState(false)
  const [showTechniqueFilter, setShowTechniqueFilter] = useState(false)

  // Paramètres URL pour les filtres
  const [priceMin, setPriceMin] = useQueryState(
    'price_min',
    parseAsInteger.withDefault(0).withOptions({ shallow: false })
  )
  const [priceMax, setPriceMax] = useQueryState(
    'price_max', 
    parseAsInteger.withDefault(maxPrice).withOptions({ shallow: false })
  )
  const [selectedTechnique, setSelectedTechnique] = useQueryState(
    'technique',
    parseAsInteger.withDefault(0).withOptions({ shallow: false })
  )
  const [sortBy, setSortBy] = useQueryState(
    'sort',
    parseAsString.withDefault('price').withOptions({ shallow: false })
  )
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({ shallow: false })
  )

  const handlePriceFilter = (values: { min: number; max: number } | { selectedTechnique: number }) => {
    if ('min' in values && 'max' in values) {
      setPriceMin(values.min)
      setPriceMax(values.max)
      setPage(1) // Remettre la page à 1 lors de la modification du filtre prix
    }
  }

  const handleTechniqueFilter = (values: { min: number; max: number } | { selectedTechnique: number }) => {
    if ('selectedTechnique' in values) {
      console.log('Setting selected technique:', values.selectedTechnique)
      setSelectedTechnique(values.selectedTechnique)
      setPage(1) // Remettre la page à 1 lors de la modification du filtre technique
    }
  }

  const handleClearFilters = () => {
    setPriceMin(0)
    setPriceMax(maxPrice)
    setSelectedTechnique(0)
    setSortBy('price')
    setPage(1) // Remettre la page à 1 lors du clear des filtres
  }

  const hasActiveFilters = priceMin > 0 || priceMax < maxPrice || selectedTechnique > 0

  return (
    <>
      <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 ${className}`}>
        {/* Section gauche - Filtres */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Badge "Filtered by" */}
          <Badge label="Filtered by :" />
          
          {/* Badge Prix avec flèche */}
          <Badge
            label="Price"
            showIcon
            onClick={() => setShowPriceFilter(true)}
          />
          
          {/* Badge Technique avec flèche */}
          <Badge
            label="Technique"
            showIcon
            onClick={() => setShowTechniqueFilter(true)}
          />
          
          {/* Badge "Clear all" */}
          {hasActiveFilters && (
            <>
              {/* Séparateur */}
              <div className="hidden sm:block w-px h-6 bg-gray-300" />

              <Badge
                label="Clear all"
                backgroundColor="transparent"
                textColor="#ffffff"
                onClick={handleClearFilters}
              />
            </>
          )}
        </div>

        {/* Section droite - Informations */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          
          {/* Badge tri */}
          {/* <div className="flex items-center gap-2">
            <div className="w-4 h-4">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M3 2H13M5 6H11M7 10H9" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round"
                  className="text-white"
                />
              </svg>
            </div>
            <span className="text-white font-['Montserrat-Medium',_sans-serif] text-base">
              Most relevant
            </span>
          </div> */}
        </div>
      </div>

      {/* Compteur d'œuvres */}
      <div className="text-white font-['Montserrat-Medium',_sans-serif] text-base mt-4">
        {(filteredItemsCount ?? totalItems).toLocaleString('fr-FR')} artworks
      </div>

      {/* Popups de filtres */}
      <FilterPopup
        isOpen={showPriceFilter}
        onClose={() => setShowPriceFilter(false)}
        filterType="price"
        onApply={handlePriceFilter}
        initialValues={{ min: priceMin, max: priceMax }}
        maxPrice={maxPrice}
      />

      <FilterPopup
        isOpen={showTechniqueFilter}
        onClose={() => setShowTechniqueFilter(false)}
        filterType="technique"
        onApply={handleTechniqueFilter}
        techniques={techniques}
        selectedTechnique={selectedTechnique}
      />
    </>
  )
}

export default FiltersSection 