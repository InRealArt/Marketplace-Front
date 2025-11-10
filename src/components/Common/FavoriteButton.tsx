'use client'
import React, { useState } from 'react'
import { Heart } from 'lucide-react'

interface FavoriteButtonProps {
  artworkId: number | string
  initialIsFavorite?: boolean
  onToggle?: (isFavorite: boolean) => void
  size?: number
  className?: string
  iconClassName?: string
  variant?: 'default' | 'minimal'
}

const FavoriteButton = ({
  artworkId,
  initialIsFavorite = false,
  onToggle,
  size = 20,
  className = '',
  iconClassName = '',
  variant = 'default'
}: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsFavorite(!isFavorite)
    setIsAnimating(true)
    
    // Call the onToggle callback if provided
    onToggle?.(!isFavorite)
    
    // TODO: Add API call to save favorite state
    // saveFavorite(artworkId, !isFavorite)
    
    // Reset animation
    setTimeout(() => setIsAnimating(false), 300)
  }

  if (variant === 'minimal') {
    return (
      <button
        onClick={handleClick}
        className={`group transition-transform ${isAnimating ? 'scale-110' : 'scale-100'} ${className}`}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart
          size={size}
          className={`transition-all duration-200 ${
            isFavorite
              ? 'fill-red-500 stroke-red-500'
              : 'fill-none stroke-current group-hover:stroke-red-500'
          } ${iconClassName}`}
        />
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className={`
        w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center 
        hover:bg-gray-50 transition-all duration-200
        ${isAnimating ? 'scale-110' : 'scale-100'}
        ${className}
      `}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        size={size}
        className={`transition-all duration-200 ${
          isFavorite
            ? 'fill-red-500 stroke-red-500'
            : 'fill-none stroke-gray-800'
        } ${iconClassName}`}
      />
    </button>
  )
}

export default FavoriteButton

