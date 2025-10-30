'use client'
import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showFirstLast?: boolean
  showPrevNext?: boolean
  maxVisiblePages?: number
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'ghost'
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 5,
  className = '',
  size = 'md',
  variant = 'default'
}: PaginationProps) {
  // Don't render if there's only one page or no pages
  if (totalPages <= 1) return null

  // Calculate which pages to show
  const getVisiblePages = () => {
    const pages: (number | string)[] = []
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Calculate start and end of visible range
      let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
      let end = Math.min(totalPages, start + maxVisiblePages - 1)
      
      // Adjust start if we're near the end
      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1)
      }
      
      // Add first page and ellipsis if needed
      if (start > 1) {
        pages.push(1)
        if (start > 2) {
          pages.push('...')
        }
      }
      
      // Add visible pages
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      // Add ellipsis and last page if needed
      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push('...')
        }
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  }

  // Variant classes
  const getVariantClasses = (isActive: boolean, isDisabled: boolean = false) => {
    if (isDisabled) {
      return 'bg-gray-100 text-gray-400 cursor-not-allowed'
    }
    
    if (isActive) {
      switch (variant) {
        case 'outline':
          return 'bg-blue-500 text-white border-blue-500'
        case 'ghost':
          return 'bg-blue-100 text-blue-700'
        default:
          return 'bg-blue-500 text-white'
      }
    }
    
    switch (variant) {
      case 'outline':
        return 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
      case 'ghost':
        return 'bg-transparent text-gray-700 hover:bg-gray-100'
      default:
        return 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
    }
  }

  const baseButtonClass = `
    ${sizeClasses[size]} 
    rounded-md font-medium transition-colors duration-200 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50
  `.trim()

  const visiblePages = getVisiblePages()

  return (
    <nav className={`flex items-center justify-center gap-1 ${className}`} aria-label="Pagination">
      {/* First page button */}
      {showFirstLast && currentPage > 1 && (
        <button
          onClick={() => onPageChange(1)}
          className={`${baseButtonClass} ${getVariantClasses(false)}`}
          aria-label="Go to first page"
        >
          First
        </button>
      )}

      {/* Previous button */}
      {showPrevNext && (
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`${baseButtonClass} ${getVariantClasses(false, currentPage === 1)}`}
          aria-label="Go to previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {/* Page numbers */}
      {visiblePages.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className={`${sizeClasses[size]} text-gray-500`}>...</span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={`${baseButtonClass} ${getVariantClasses(page === currentPage)}`}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      {/* Next button */}
      {showPrevNext && (
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`${baseButtonClass} ${getVariantClasses(false, currentPage === totalPages)}`}
          aria-label="Go to next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* Last page button */}
      {showFirstLast && currentPage < totalPages && (
        <button
          onClick={() => onPageChange(totalPages)}
          className={`${baseButtonClass} ${getVariantClasses(false)}`}
          aria-label="Go to last page"
        >
          Last
        </button>
      )}
    </nav>
  )
}

// Optional: Export a simplified version for common use cases
export function SimplePagination({
  currentPage,
  totalPages,
  onPageChange,
  className
}: Pick<PaginationProps, 'currentPage' | 'totalPages' | 'onPageChange' | 'className'>) {
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      showFirstLast={false}
      maxVisiblePages={3}
      size="sm"
      variant="ghost"
      className={className}
    />
  )
}