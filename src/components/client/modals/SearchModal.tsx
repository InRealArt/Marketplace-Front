'use client'

import { useEffect, useRef, useState } from 'react'
import { useModalStore } from '@/store/modalStore'

export default function SearchModal() {
  const { showSearch, setShowSearch } = useModalStore()
  const [searchQuery, setSearchQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Handle body overflow when modal is open/closed
  useEffect(() => {
    if (showSearch) {
      document.body.style.overflow = 'hidden'
      // Focus input when modal opens
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup function to restore overflow on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showSearch])

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showSearch) {
        setShowSearch(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [showSearch, setShowSearch])

  const handleOverlayClick = () => {
    setShowSearch(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Handle search logic here
      console.log('Searching for:', searchQuery)
      // You can add navigation or search API call here
    }
  }

  if (!showSearch) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Overlay background */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer" 
        onClick={handleOverlayClick}
      />
      
      {/* Search content */}
      <div className="relative z-10 w-full max-w-2xl mx-4">
        <form onSubmit={handleSubmit} className="relative">
          {/* Search input */}
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher..."
            className="w-full px-6 py-4 text-lg bg-[#1B1C1E] text-white border border-[#4D4D4D] rounded-lg shadow-2xl focus:outline-none placeholder-gray-400"
          />
          
          {/* Search icon */}
          <button
            type="submit"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 hover:opacity-80 transition-opacity"
            aria-label="Submit search"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
        
        {/* Search suggestions or recent searches could go here */}
        {searchQuery && (
          <div className="mt-4 bg-[#2A2A2A] rounded-lg shadow-xl max-h-80 overflow-y-auto">
            <div className="p-4 text-gray-400 text-center">
              Appuyez sur Entrée pour rechercher "{searchQuery}"
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 