'use client'
import React, { useState, useRef, useEffect } from 'react'

export interface DropdownOption {
  value: string | number
  label: string
}

interface DropdownMenuProps {
  options: DropdownOption[]
  value: string | number | null | undefined
  onSelect: (value: string | number | null) => void
  allOptionLabel: string
  showAllOption: boolean
  menuClassName?: string
  optionClassName?: string
  getOptionValue: (option: DropdownOption) => string | number
  getOptionLabel: (option: DropdownOption) => string
  renderOption?: (option: DropdownOption, isSelected: boolean) => React.ReactNode
}

const DropdownMenu = ({
  options,
  value,
  onSelect,
  allOptionLabel,
  showAllOption,
  menuClassName = '',
  optionClassName = '',
  getOptionValue,
  getOptionLabel,
  renderOption
}: DropdownMenuProps) => {
  const isOptionSelected = (option: DropdownOption) => {
    const optionValue = getOptionValue(option)
    return String(optionValue) === String(value)
  }

  return (
    <div 
      className={`absolute z-20 mt-2 bg-black rounded-2xl p-2 shadow-lg ring-1 ring-black/5 min-w-[200px] w-max max-w-xs ${menuClassName}`}
    >
      {showAllOption && (
        <button
          className={`
            w-full text-left px-3 py-2 rounded-lg text-white text-sm whitespace-normal break-words
            ${value === null || value === undefined || value === '' ? 'bg-black/5' : 'hover:bg-black/5'}
            ${optionClassName}
          `}
          onClick={() => onSelect(null)}
        >
          {allOptionLabel}
        </button>
      )}
      <div className="max-h-64 overflow-y-auto">
        {options.map((option, index) => {
          const optionValue = getOptionValue(option)
          const optionLabel = getOptionLabel(option)
          const isSelected = isOptionSelected(option)
          const key = String(optionValue) || index

          if (renderOption) {
            return (
              <div key={key}>
                {renderOption(option, isSelected)}
              </div>
            )
          }

          return (
            <button
              key={key}
              className={`
                w-full text-left px-3 py-2 rounded-lg text-white text-sm whitespace-normal break-words
                ${isSelected ? 'bg-black/5' : 'hover:bg-black/5'}
                ${optionClassName}
              `}
              onClick={() => onSelect(optionValue)}
            >
              {optionLabel}
            </button>
          )
        })}
      </div>
    </div>
  )
}

interface DropdownProps {
  options: DropdownOption[]
  value: string | number | null | undefined
  onChange: (value: string | number | null) => void
  label?: string
  allOptionLabel?: string
  showAllOption?: boolean
  placeholder?: string
  className?: string
  buttonClassName?: string
  menuClassName?: string
  optionClassName?: string
  icon?: React.ReactNode
  getOptionValue?: (option: DropdownOption) => string | number
  getOptionLabel?: (option: DropdownOption) => string
  renderOption?: (option: DropdownOption, isSelected: boolean) => React.ReactNode
  onOpen?: () => void
  onClose?: () => void
}

const Dropdown = ({
  options,
  value,
  onChange,
  label,
  allOptionLabel = 'All',
  showAllOption = true,
  placeholder,
  className = '',
  buttonClassName = '',
  menuClassName = '',
  optionClassName = '',
  icon,
  getOptionValue = (option) => option.value,
  getOptionLabel = (option) => option.label,
  renderOption,
  onOpen,
  onClose
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      onOpen?.()
    } else {
      onClose?.()
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onOpen, onClose])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (selectedValue: string | number | null) => {
    onChange(selectedValue)
    setIsOpen(false)
  }

  // Get display label
  const getDisplayLabel = () => {
    if (value === null || value === undefined || value === '') {
      return label || placeholder || 'Select...'
    }
    
    if (showAllOption && value === '') {
      return label || allOptionLabel
    }

    const selectedOption = options.find(opt => getOptionValue(opt) === value || String(getOptionValue(opt)) === String(value))
    return selectedOption ? getOptionLabel(selectedOption) : label || placeholder || 'Select...'
  }

  // Default dropdown icon
  const defaultIcon = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={handleToggle}
        className={`
          inline-flex items-center gap-2 rounded-full border border-white/30 text-white px-4 py-1.5 shadow-sm hover:shadow transition
          ${buttonClassName}
        `}
      >
        <span className="text-sm">{getDisplayLabel()}</span>
        {icon || defaultIcon}
      </button>

      {isOpen && (
        <DropdownMenu
          options={options}
          value={value}
          onSelect={handleSelect}
          allOptionLabel={allOptionLabel}
          showAllOption={showAllOption}
          menuClassName={menuClassName}
          optionClassName={optionClassName}
          getOptionValue={getOptionValue}
          getOptionLabel={getOptionLabel}
          renderOption={renderOption}
        />
      )}
    </div>
  )
}

export default Dropdown
