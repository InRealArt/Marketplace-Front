'use client'
import React, { useState, useRef, useEffect } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  icon?: React.ReactNode
  className?: string
  inputClassName?: string
  iconClassName?: string
  onFocus?: () => void
  onBlur?: () => void
}

const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search...',
  icon,
  className = '',
  inputClassName = '',
  iconClassName = '',
  onFocus,
  onBlur
}: SearchBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Keep expanded if there's a value
  useEffect(() => {
    if (value.trim()) {
      setIsExpanded(true)
    }
  }, [value])

  // Default search icon if none provided
  const defaultIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    </svg>
  )

  const handleIconClick = () => {
    setIsExpanded(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Don't collapse if clicking inside the container
    if (containerRef.current?.contains(e.relatedTarget as Node)) {
      return
    }
    
    if (!value.trim()) {
      setIsExpanded(false)
    }
    
    onBlur?.()
  }

  const handleFocus = () => {
    setIsExpanded(true)
    onFocus?.()
  }

  return (
    <div 
      ref={containerRef}
      className={`
        inline-flex items-center gap-2 rounded-full border border-white/30 text-white shadow-sm
        transition-all duration-300 ease-in-out overflow-hidden
        ${isExpanded ? 'px-4 py-1.5' : 'px-1.5 py-1.5 cursor-pointer'}
        ${className}
      `}
    >
      <div
        onClick={!isExpanded ? handleIconClick : undefined}
        className={`flex-shrink-0 ${!isExpanded ? 'cursor-pointer' : ''} ${iconClassName}`}
      >
        {icon || defaultIcon}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`
          bg-transparent outline-none text-sm
          transition-all duration-300 ease-in-out text-white
          ${isExpanded ? 'w-full opacity-100 block' : 'w-0 opacity-0 hidden'}
          ${inputClassName}
        `}
      />
    </div>
  )
}

export default SearchBar
