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
              d="M3 4.5H21V6H3V4.5ZM5.25 10.5H18.75V12H5.25V10.5ZM9 16.5H15V18H9V16.5Z" 
              fill="currentColor"
            />
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