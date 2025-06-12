import React from 'react'
import { ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onNext: () => void
  onPrevious: () => void
  disabled?: boolean
  hasNext?: boolean
  hasPrevious?: boolean
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onNext,
  onPrevious,
  disabled = false,
  hasNext = true,
  hasPrevious = true
}: PaginationProps) {
  const generatePageNumbers = () => {
    const pages = []
    const showEllipsis = totalPages > 7

    if (!showEllipsis) {
      // Si moins de 7 pages, on affiche tout
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Logique pour l'ellipse
      if (currentPage <= 4) {
        // Début : 1, 2, 3, 4, 5, ..., totalPages
        for (let i = 1; i <= Math.min(5, totalPages); i++) {
          pages.push(i)
        }
        if (totalPages > 5) {
          pages.push('...')
          pages.push(totalPages)
        }
      } else if (currentPage >= totalPages - 3) {
        // Fin : 1, ..., totalPages-4, totalPages-3, totalPages-2, totalPages-1, totalPages
        pages.push(1)
        if (totalPages > 5) {
          pages.push('...')
        }
        for (let i = Math.max(totalPages - 4, 2); i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // Milieu : 1, ..., currentPage-1, currentPage, currentPage+1, ..., totalPages
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = generatePageNumbers()

  // Ne pas afficher la pagination s'il n'y a qu'une page ou aucune page
  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-3 py-2 text-white"
            >
              ...
            </span>
          )
        }

        const isCurrentPage = page === currentPage
        const pageNumber = page as number

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            disabled={disabled}
            className={`
              px-3 py-2 rounded text-sm font-medium transition-colors
              ${isCurrentPage
                ? 'bg-[#6052ff] text-white'
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {pageNumber}
          </button>
        )
      })}

      {/* Bouton Suivant - seulement s'il y a une page suivante */}
      {hasNext && (
        <button
          onClick={onNext}
          disabled={disabled || !hasNext}
          className={`
            px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-1
            ${disabled || !hasNext
              ? 'text-gray-500 cursor-not-allowed'
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }
          `}
        >
          Next
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  )
} 