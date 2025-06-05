'use client'
import React, { useEffect } from 'react'
import { useItemsStore } from '@/store/itemsStore'
import { ItemWithRelations } from '@/types'
import FilterSidebar from './subComponents/FilterSidebar'
import AppliedFilters from './subComponents/AppliedFilters'
import ItemCard from '../Card/ItemCard'

const ListOfItems = () => {
  const { 
    filteredItems, 
    isLoading, 
    error, 
    fetchAvailableItems, 
    filtersOpen, 
    setFiltersOpen 
  } = useItemsStore()

  useEffect(() => {
    fetchAvailableItems()
  }, [fetchAvailableItems])

  const handleFilterToggle = () => {
    setFiltersOpen(!filtersOpen)
  }

  if (error) {
    return (
      <div className="list-of-items__error">
        <p>Error loading artworks: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="list-of-items">
      {/* Bouton Filtres */}
      <div className="list-of-items__header">
        <button 
          className="filter-button"
          onClick={handleFilterToggle}
          aria-label="Open filters"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M6 3V7H8V3H6ZM6 9V21H8V9H6ZM16 3V15H18V3H16ZM16 17V21H18V17H16ZM11 3V11H13V3H11ZM11 13V21H13V13H11Z" 
              fill="currentColor"
            />
            <circle cx="7" cy="6" r="2" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="17" cy="18" r="2" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="10" r="2" fill="none" stroke="currentColor" strokeWidth="2"/>
          </svg>
          Filters
        </button>
        
        <div className="list-of-items__count">
          {isLoading ? (
            <span>Chargement...</span>
          ) : (
            <span>{filteredItems.length} artwork{filteredItems.length > 1 ? 's' : ''}</span>
          )}
        </div>
      </div>

      {/* Filtres appliqués */}
      <AppliedFilters />

      {/* Sidebar des filtres */}
      <FilterSidebar 
        isOpen={filtersOpen} 
        onClose={() => setFiltersOpen(false)} 
      />

      {/* Liste des items */}
      <div className="list-of-items__content">
        {isLoading ? (
          <div className="list-of-items__loading">
            <p>Loading artworks...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="list-of-items__empty">
            <p>No artworks found with these criteria.</p>
          </div>
        ) : (
          <div className="list-of-items__grid">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ListOfItems 