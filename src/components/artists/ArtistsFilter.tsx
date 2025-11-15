'use client'
import React from 'react'
import SearchBar from '@/components/Common/SearchBar'
import Dropdown from '@/components/Common/Dropdown'

// TODO: Import proper translation function
const t = (key: string) => {
  const translations: Record<string, string> = {
    'artists.nationality': 'Nationality',
    'artists.type': 'Type of artist',
    'artists.all': 'All',
    'artists.searchPlaceholder': 'Search artists...',
    'artists.artistsFound': 'artist(s) found'
  }
  return translations[key] || key
}
interface ArtistsFilterProps {
  nationalities: { code: string, label: string }[]
  params: { nationality: string, page: number, q: string }
  setParams: (params: Partial<{ nationality: string, page: number, q: string }>) => void
  artistsLength: number
}

const ArtistsFilter = ({ nationalities, params, setParams, artistsLength }: ArtistsFilterProps) => {
  // Transform nationalities to dropdown options format
  const nationalityOptions = nationalities.map(n => ({
    value: n.code,
    label: n.label
  }))

  const handleNationalityChange = (value: string | number | null) => {
    setParams({
      nationality: value ? String(value).toUpperCase() : '',
      page: 1
    })
  }

  // Placeholder for artist type/role options - will be populated when data is available
  const artistTypeOptions: { value: string; label: string }[] = []

  const handleArtistTypeChange = (value: string | number | null) => {
    // TODO: Implement when data is available
    // setParams({
    //   artistType: value ? String(value) : '',
    //   page: 1
    // })
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 sticky top-[80px] bg-background z-10 py-4">
      {/* Mobile Row 1 / Desktop Left: Dropdowns */}
      <div className="flex items-center gap-4">
        <Dropdown
          options={nationalityOptions}
          value={params.nationality ? params.nationality.toUpperCase() : null}
          onChange={handleNationalityChange}
          label={t('artists.nationality')}
          allOptionLabel={t('artists.all')}
          showAllOption={true}
          getOptionValue={(option) => String(option.value).toUpperCase()}
        />

        <Dropdown
          options={artistTypeOptions}
          value={null}
          onChange={handleArtistTypeChange}
          label={t('artists.type')}
          allOptionLabel={t('artists.all')}
          showAllOption={true}
        />

        {/* Separator visible only on desktop */}
        <span className="text-white/40 select-none hidden md:inline">|</span>

        {/* SearchBar visible only on desktop */}
        <div className="hidden md:block">
          <SearchBar
            value={params.q}
            onChange={(value) => setParams({ q: value, page: 1 })}
            placeholder={t('artists.searchPlaceholder')}
          />
        </div>
      </div>

      {/* Mobile Row 2 / Desktop Right: SearchBar + ArtistsLength */}
      <div className="flex items-center gap-4">
        {/* SearchBar visible only on mobile */}
        <div className="md:hidden">
          <SearchBar
            value={params.q}
            onChange={(value) => setParams({ q: value, page: 1 })}
            placeholder={t('artists.searchPlaceholder')}
          />
        </div>
        {/* Separator visible only on desktop */}
        <span className="text-white/40 select-none md:hidden">|</span>

        <div className="text-white/60 text-sm">{artistsLength} {t('artists.artistsFound')}</div>
      </div>
    </div>
  )
}

export default ArtistsFilter