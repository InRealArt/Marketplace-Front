'use client'
import React from 'react'
import Dropdown from '@/components/Common/Dropdown'
import Button from '@/components/Button/Button'

// TODO: Import proper translation function
const t = (key: string) => {
  const translations: Record<string, string> = {
    'artworks.priceRange': 'Price',
    'artworks.size': 'Size',
    'artworks.material': 'Material',
    'artworks.type': 'Type',
    'artworks.all': 'All',
    'artworks.artworksFound': 'artwork(s)'
  }
  return translations[key] || key
}

interface ArtworksFilterProps {
  priceRanges: { value: string, label: string }[]
  sizes: { value: string, label: string }[]
  materials: { value: string, label: string }[]
  types: { value: string, label: string }[]
  params: {
    priceRange: string
    size: string
    material: string
    type: string
    page: number
  }
  setParams: (params: Partial<{
    priceRange: string
    size: string
    material: string
    type: string
    page: number
  }>) => void
  artworksLength: number
}

const ArtworksFilter = ({
  priceRanges,
  sizes,
  materials,
  types,
  params,
  setParams,
  artworksLength
}: ArtworksFilterProps) => {
  const handlePriceChange = (value: string | number | null) => {
    setParams({
      priceRange: value ? String(value) : '',
      page: 1
    })
  }

  const handleSizeChange = (value: string | number | null) => {
    setParams({
      size: value ? String(value) : '',
      page: 1
    })
  }

  const handleMaterialChange = (value: string | number | null) => {
    setParams({
      material: value ? String(value) : '',
      page: 1
    })
  }

  const handleTypeChange = (value: string | number | null) => {
    setParams({
      type: value ? String(value) : '',
      page: 1
    })
  }

  const handleClearAll = () => {
    setParams({
      priceRange: '',
      size: '',
      material: '',
      type: '',
      page: 1
    })
  }

  // Check if any filters are active
  const hasActiveFilters =
    params.priceRange !== '' ||
    params.size !== '' ||
    params.material !== '' ||
    params.type !== ''

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 sticky top-[127px] md:top-[137px] bg-background z-10 py-4">
      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Price Range Dropdown */}
        <Dropdown
          options={priceRanges}
          value={params.priceRange || null}
          onChange={handlePriceChange}
          label={t('artworks.priceRange')}
          allOptionLabel={t('artworks.all')}
          showAllOption={true}
          getOptionValue={(option) => String(option.value)}
        />

        {/* Size Dropdown */}
        <Dropdown
          options={sizes}
          value={params.size || null}
          onChange={handleSizeChange}
          label={t('artworks.size')}
          allOptionLabel={t('artworks.all')}
          showAllOption={true}
          getOptionValue={(option) => String(option.value)}
        />

        {/* Material Dropdown */}
        <Dropdown
          options={materials}
          value={params.material || null}
          onChange={handleMaterialChange}
          label={t('artworks.material')}
          allOptionLabel={t('artworks.all')}
          showAllOption={true}
          getOptionValue={(option) => String(option.value)}
        />

        {/* Type Dropdown */}
        <Dropdown
          options={types}
          value={params.type || null}
          onChange={handleTypeChange}
          label={t('artworks.type')}
          allOptionLabel={t('artworks.all')}
          showAllOption={true}
          getOptionValue={(option) => String(option.value)}
        />


        {/* Clear all button - only visible when filters are active */}
        {hasActiveFilters && (
          <>
            <span className="text-white/40 select-none hidden md:inline">|</span>
            <Button
              text="Clear all"
              additionalClassName="purple small"
              action={handleClearAll}
              className="!m-0"
            />
          </>
        )}
      </div>

      {/* Results count */}
      <div className="text-white/60 text-sm">
        {artworksLength} {t('artworks.artworksFound')}
      </div>
    </div >
  )
}

export default ArtworksFilter

