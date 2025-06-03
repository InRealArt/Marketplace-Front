'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useItemsStore } from '@/store/itemsStore'
import { ArtworkMedium, ArtworkStyle, ArtworkTechnique } from '@prisma/client'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
}

interface FilterOptions {
  mediums: ArtworkMedium[]
  styles: ArtworkStyle[]
  techniques: ArtworkTechnique[]
}

interface AccordionSectionProps {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}

const AccordionSection = ({ title, isOpen, onToggle, children }: AccordionSectionProps) => {
  return (
    <div className="accordion-section">
      <button 
        className="accordion-header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      <div className={`accordion-content ${isOpen ? 'accordion-content--open' : ''}`}>
        <div className="accordion-body">
          {children}
        </div>
      </div>
      <div className="accordion-separator" />
    </div>
  )
}

const PriceRangeSlider = ({ 
  min, 
  max, 
  value, 
  onChange 
}: { 
  min: number
  max: number
  value: [number, number]
  onChange: (value: [number, number]) => void
}) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null)

  const getValueFromPosition = (clientX: number) => {
    if (!trackRef.current) return min
    
    const rect = trackRef.current.getBoundingClientRect()
    const position = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    return Math.round(min + position * (max - min))
  }

  const handleMouseDown = (thumb: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(thumb)
  }

  const handleMouseUp = () => {
    setIsDragging(null)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      
      const newValue = getValueFromPosition(e.clientX)
      
      if (isDragging === 'min') {
        onChange([Math.min(newValue, value[1]), value[1]])
      } else {
        onChange([value[0], Math.max(newValue, value[0])])
      }
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, value, onChange, min, max])

  const minPercent = ((value[0] - min) / (max - min)) * 100
  const maxPercent = ((value[1] - min) / (max - min)) * 100

  return (
    <div className="custom-range-slider">
      <div 
        ref={trackRef}
        className="slider-track"
        style={{
          background: `linear-gradient(to right, 
            rgba(255, 255, 255, 0.15) 0%, 
            rgba(255, 255, 255, 0.15) ${minPercent}%, 
            #c8a882 ${minPercent}%, 
            #c8a882 ${maxPercent}%, 
            rgba(255, 255, 255, 0.15) ${maxPercent}%, 
            rgba(255, 255, 255, 0.15) 100%)`
        }}
      >
        <div 
          className="slider-thumb slider-thumb--min"
          style={{ left: `${minPercent}%` }}
          onMouseDown={handleMouseDown('min')}
        />
        <div 
          className="slider-thumb slider-thumb--max"
          style={{ left: `${maxPercent}%` }}
          onMouseDown={handleMouseDown('max')}
        />
      </div>
    </div>
  )
}

const FilterSidebar = ({ isOpen, onClose }: FilterSidebarProps) => {
  const { filters, setFilters, clearFilters } = useItemsStore()
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    mediums: [],
    styles: [],
    techniques: []
  })

  // État des accordéons
  const [openSections, setOpenSections] = useState({
    price: true,
    medium: false,
    style: false,
    technique: false
  })

  // Charger les options de filtres
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

    if (isOpen) {
      loadFilterOptions()
    }
  }, [isOpen])

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handlePriceRangeChange = (newRange: [number, number]) => {
    setFilters({ priceRange: newRange })
  }

  const handleMediumToggle = (mediumId: number) => {
    const newSelectedMediums = filters.selectedMediums.includes(mediumId)
      ? filters.selectedMediums.filter(id => id !== mediumId)
      : [...filters.selectedMediums, mediumId]
    
    setFilters({ selectedMediums: newSelectedMediums })
  }

  const handleStyleToggle = (styleId: number) => {
    const newSelectedStyles = filters.selectedStyles.includes(styleId)
      ? filters.selectedStyles.filter(id => id !== styleId)
      : [...filters.selectedStyles, styleId]
    
    setFilters({ selectedStyles: newSelectedStyles })
  }

  const handleTechniqueToggle = (techniqueId: number) => {
    const newSelectedTechniques = filters.selectedTechniques.includes(techniqueId)
      ? filters.selectedTechniques.filter(id => id !== techniqueId)
      : [...filters.selectedTechniques, techniqueId]
    
    setFilters({ selectedTechniques: newSelectedTechniques })
  }

  if (!isOpen) return null

  return (
    <div className="filter-sidebar">
      <div className="filter-sidebar__overlay" onClick={onClose} />
      <div className="filter-sidebar__content">
        <div className="filter-sidebar__header">
          <h3>Filters</h3>
          <button 
            className="filter-sidebar__close" 
            onClick={onClose}
            aria-label="Close filters"
          >
            ×
          </button>
        </div>

        <div className="filter-sidebar__body">
          {/* Section Prix */}
          <AccordionSection
            title="PRICE"
            isOpen={openSections.price}
            onToggle={() => toggleSection('price')}
          >
            <div className="price-range">
              <PriceRangeSlider
                min={0}
                max={20000}
                value={filters.priceRange}
                onChange={handlePriceRangeChange}
              />
              <div className="price-values">
                <span>{filters.priceRange[0]} €</span>
                <span>{filters.priceRange[1]}+ €</span>
              </div>
            </div>
          </AccordionSection>

          {/* Section Medium */}
          <AccordionSection
            title="MEDIUMs"
            isOpen={openSections.medium}
            onToggle={() => toggleSection('medium')}
          >
            <div className="filter-options">
              {filterOptions.mediums.map(medium => (
                <label key={medium.id} className="filter-option">
                  <input
                    type="checkbox"
                    checked={filters.selectedMediums.includes(medium.id)}
                    onChange={() => handleMediumToggle(medium.id)}
                  />
                  <span>{medium.name}</span>
                </label>
              ))}
            </div>
          </AccordionSection>

          {/* Section Style */}
          <AccordionSection
            title="STYLES"
            isOpen={openSections.style}
            onToggle={() => toggleSection('style')}
          >
            <div className="filter-options">
              {filterOptions.styles.map(style => (
                <label key={style.id} className="filter-option">
                  <input
                    type="checkbox"
                    checked={filters.selectedStyles.includes(style.id)}
                    onChange={() => handleStyleToggle(style.id)}
                  />
                  <span>{style.name}</span>
                </label>
              ))}
            </div>
          </AccordionSection>

          {/* Section Technique */}
          <AccordionSection
            title="TECHNIQUES"
            isOpen={openSections.technique}
            onToggle={() => toggleSection('technique')}
          >
            <div className="filter-options">
              {filterOptions.techniques.map(technique => (
                <label key={technique.id} className="filter-option">
                  <input
                    type="checkbox"
                    checked={filters.selectedTechniques.includes(technique.id)}
                    onChange={() => handleTechniqueToggle(technique.id)}
                  />
                  <span>{technique.name}</span>
                </label>
              ))}
            </div>
          </AccordionSection>
        </div>

        <div className="filter-sidebar__footer">
          <button 
            className="btn btn-secondary"
            onClick={clearFilters}
          >
            Reset
          </button>
          <button 
            className="btn btn-primary"
            onClick={onClose}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterSidebar 