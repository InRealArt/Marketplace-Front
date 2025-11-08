'use client'
import React from 'react'
import Dropdown from '@/components/Common/Dropdown'

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

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
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

        {/* Separator visible only on desktop */}
        <span className="text-white/40 select-none hidden md:inline">|</span>
      </div>

      {/* Results count */}
      <div className="text-white/60 text-sm">
        {artworksLength} {t('artworks.artworksFound')}
      </div>
    </div>
  )
}

export default ArtworksFilter

