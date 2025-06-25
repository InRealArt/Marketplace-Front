'use client'

import { useModalStore } from '@/store/modalStore'

export default function SearchButton() {
  const { toggleSearch } = useModalStore()

  return (
    <button 
      onClick={toggleSearch}
      className="p-1 hover:opacity-80 transition-opacity"
      aria-label="Search"
    >
      <svg className="w-7 h-7 text-[#f6f8ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </button>
  )
} 