'use client'
import React, { useState, useEffect } from 'react'
import { useItemsStore } from '@/store/itemsStore'
import { ArtworkMedium, ArtworkStyle, ArtworkTechnique } from '@prisma/client'
import { X } from 'lucide-react'

interface FilterOptions {
  mediums: ArtworkMedium[]
  styles: ArtworkStyle[]
  techniques: ArtworkTechnique[]
}

const AppliedFilters = () => {
  const { filters, setFilters, clearFilters } = useItemsStore()
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    mediums: [],
    styles: [],
    techniques: []
  })

  // Charger les options de filtres pour les noms
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const [mediums, styles, techniques] = await Promise.all([
          fetch('/api/artwork-mediums').then(res => res.json()),
          fetch('/api/artwork-styles').then(res => res.json()),
          fetch('/api/artwork-techniques').then(res => res.json())
        ])
        
        setFilterOptions({ mediums, styles, techniques })
      } catch (error) {
        console.error('Erreur lors du chargement des options de filtres:', error)
      }
    }

    loadFilterOptions()
  }, [])

  // Fonction pour supprimer un filtre de prix
  const removePriceFilter = () => {
    setFilters({ priceRange: [0, 20000] })
  }

  // Fonction pour supprimer un medium
  const removeMedium = (mediumId: number) => {
    const newSelectedMediums = filters.selectedMediums.filter(id => id !== mediumId)
    setFilters({ selectedMediums: newSelectedMediums })
  }

  // Fonction pour supprimer un style
  const removeStyle = (styleId: number) => {
    const newSelectedStyles = filters.selectedStyles.filter(id => id !== styleId)
    setFilters({ selectedStyles: newSelectedStyles })
  }

  // Fonction pour supprimer une technique
  const removeTechnique = (techniqueId: number) => {
    const newSelectedTechniques = filters.selectedTechniques.filter(id => id !== techniqueId)
    setFilters({ selectedTechniques: newSelectedTechniques })
  }

  // Vérifier si des filtres sont appliqués
  const hasActiveFilters = 
    (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 20000) ||
    filters.selectedMediums.length > 0 ||
    filters.selectedStyles.length > 0 ||
    filters.selectedTechniques.length > 0

  return (
    <div className="applied-filters">
      <div className="applied-filters__separator" />
      
      <div className="applied-filters__content">
        {hasActiveFilters ? (
          <>
            <span className="applied-filters__label">Filtres appliqués :</span>
            
            <div className="applied-filters__badges">
              {/* Badge Prix */}
              {(filters.priceRange[0] !== 0 || filters.priceRange[1] !== 20000) && (
                <div className="filter-badge">
                  <span>Prix: {filters.priceRange[0]}€ - {filters.priceRange[1]}€</span>
                  <button
                    onClick={removePriceFilter}
                    className="filter-badge__remove"
                    aria-label="Supprimer le filtre de prix"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {/* Badges Medium */}
              {filters.selectedMediums.map(mediumId => {
                const medium = filterOptions.mediums.find(m => m.id === mediumId)
                return medium ? (
                  <div key={`medium-${mediumId}`} className="filter-badge">
                    <span>Medium: {medium.name}</span>
                    <button
                      onClick={() => removeMedium(mediumId)}
                      className="filter-badge__remove"
                      aria-label={`Supprimer le medium ${medium.name}`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : null
              })}

              {/* Badges Style */}
              {filters.selectedStyles.map(styleId => {
                const style = filterOptions.styles.find(s => s.id === styleId)
                return style ? (
                  <div key={`style-${styleId}`} className="filter-badge">
                    <span>Style: {style.name}</span>
                    <button
                      onClick={() => removeStyle(styleId)}
                      className="filter-badge__remove"
                      aria-label={`Supprimer le style ${style.name}`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : null
              })}

              {/* Badges Technique */}
              {filters.selectedTechniques.map(techniqueId => {
                const technique = filterOptions.techniques.find(t => t.id === techniqueId)
                return technique ? (
                  <div key={`technique-${techniqueId}`} className="filter-badge">
                    <span>Technique: {technique.name}</span>
                    <button
                      onClick={() => removeTechnique(techniqueId)}
                      className="filter-badge__remove"
                      aria-label={`Supprimer la technique ${technique.name}`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : null
              })}

              {/* Bouton pour tout effacer */}
              <button
                onClick={clearFilters}
                className="filter-badge filter-badge--clear-all"
              >
                <span>Tout effacer</span>
                <X size={14} />
              </button>
            </div>
          </>
        ) : (
          <div className="applied-filters__placeholder">
            {/* Zone vide mais avec hauteur fixe pour maintenir l'espacement */}
          </div>
        )}
      </div>
    </div>
  )
}

export default AppliedFilters 