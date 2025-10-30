'use client'
import React, {  useRef, useState } from 'react'

// TODO: Import proper translation function
const t = (key: string) => {
  const translations: Record<string, string> = {
    'artists.nationality': 'Nationality',
    'artists.all': 'All',
    'artists.searchPlaceholder': 'Search artists...',
    'artists.artistsFound': 'artist(s) found'
  }
  return translations[key] || key
}
interface ArtistsFilterProps {
  nationalities: { code: string, label: string }[]
  params: { nationality: string, page: number, q: string }
  setParams: (params: { nationality: string, page: number, q: string }) => void
  artistsLength: number
}

const ArtistsFilter = ({ nationalities, params, setParams, artistsLength }: ArtistsFilterProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <div ref={dropdownRef} className="relative inline-block">
          <button
            type="button"
            onClick={() => setIsOpen(o => !o)}
            className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2 shadow-sm hover:shadow transition"
          >
            <span>{t('artists.nationality')}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute z-20 mt-2 w-56 rounded-2xl bg-white p-2 shadow-lg ring-1 ring-black/5">
              <button
                className={`w-full text-left px-3 py-2 rounded-lg ${params.nationality === '' ? 'bg-black/5' : 'hover:bg-black/5'} text-black`}
                onClick={() => { setParams({ ...params, nationality: '', page: 1 }); setIsOpen(false) }}
              >{t('artists.all')}</button>
              <div className="max-h-64 overflow-y-auto">
                {nationalities.map(n => (
                  <button
                    key={n.code}
                    className={`w-full text-left px-3 py-2 rounded-lg text-black ${params.nationality.toUpperCase() === n.code ? 'bg-black/5' : 'hover:bg-black/5'}`}
                    onClick={() => { setParams({ ...params, nationality: n.code, page: 1 }); setIsOpen(false) }}
                  >{n.label}</button>
                ))}
              </div>
            </div>
          )}
        </div>

        <span className="text-white/40 select-none">|</span>

        <div className="inline-flex items-center gap-2 rounded-full bg-white text-black px-4 py-1.5 shadow-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          </svg>
          <input
            value={params.q}
            onChange={e => setParams({ ...params, q: e.target.value, page: 1 })}
            placeholder={t('artists.searchPlaceholder')}
            className="bg-transparent outline-none text-sm min-w-[220px] placeholder-black/40"
          />
        </div>
      </div>
      <div className="text-white/60 text-sm">{artistsLength} {t('artists.artistsFound')}</div>
    </div>
  )
}

export default ArtistsFilter