import React from 'react'
import { cn } from '@/lib/utils'

interface ArrowButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  variant?: 'default' | 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
}

export function ArrowButton({ 
  children, 
  href, 
  onClick, 
  className,
  variant = 'default',
  size = 'md'
}: ArrowButtonProps) {
  
  const baseClasses = "inline-flex items-center gap-2 font-medium transition-colors font-montserrat"
  
  const variantClasses = {
    default: "text-white hover:text-white/80",
    light: "text-gray-600 hover:text-gray-900",
    dark: "text-gray-900 hover:text-gray-600"
  }
  
  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg", 
    lg: "text-xl"
  }
  
  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 28
  }

  const buttonContent = (
    <>
      {children}
      <svg 
        width={iconSizes[size]} 
        height={iconSizes[size]} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M5 12H19M19 12L12 5M19 12L12 19" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </>
  )

  const combinedClassName = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  )

  if (href) {
    return (
      <a href={href} className={combinedClassName}>
        {buttonContent}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={combinedClassName}>
      {buttonContent}
    </button>
  )
} 