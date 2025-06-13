'use client'

import { useState } from 'react'
import Image from 'next/image'

interface BadgeProps {
  label?: string
  className?: string
  showIcon?: boolean
  onClick?: () => void
  disabled?: boolean
  backgroundColor?: string
  textColor?: string
}

export function FilterBadge({ 
  label = 'Filtered by :', 
  className = '', 
  showIcon = false,
  onClick,
  disabled = false,
  backgroundColor,
  textColor 
}: BadgeProps) {
  const [isPressed, setIsPressed] = useState(false)

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick()
    }
  }

  const handleMouseDown = () => {
    if (!disabled) {
      setIsPressed(true)
    }
  }

  const handleMouseUp = () => {
    setIsPressed(false)
  }

  const handleMouseLeave = () => {
    setIsPressed(false)
  }

  const isInteractive = onClick && !disabled

  // Couleurs par défaut
  const defaultBgColor = 'rgba(255,255,255,0.95)'
  const defaultTextColor = '#131313'
  
  return (
    <div
      className={`
        rounded-[100px] border-solid border-[#ffffff] border 
        pt-2.5 pr-4 pb-2.5 pl-4 flex flex-row gap-2.5 items-center justify-center 
        shrink-0 relative transition-all duration-200 ease-in-out
        ${!backgroundColor ? 'bg-[rgba(255,255,255,0.95)] hover:bg-[rgba(255,255,255,1)]' : ''}
        ${isInteractive ? 'cursor-pointer hover:shadow-md' : ''}
        ${isPressed ? 'transform scale-95' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      style={{ 
        backdropFilter: 'blur(2px)',
        ...(backgroundColor && { backgroundColor })
      }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={(e) => {
        if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      <div 
        className="text-left font-['Montserrat-Medium',_sans-serif] text-base font-medium relative"
        style={{ color: textColor || defaultTextColor }}
      >
        {label}
      </div>
      {showIcon && (
        <Image
          src="/icons/badge_arrow_down.svg"
          alt="Arrow down"
          width={10}
          height={7}
          className={`transition-transform duration-200 ${isPressed ? 'rotate-180' : ''}`}
        />
      )}
    </div>
  )
}

export default FilterBadge 