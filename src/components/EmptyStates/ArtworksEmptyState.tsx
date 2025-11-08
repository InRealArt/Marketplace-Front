import { PackageOpen } from 'lucide-react'

interface ArtworksEmptyStateProps {
  hasFilters?: boolean
  onResetFilters?: () => void
}

export default function ArtworksEmptyState({ 
  hasFilters = false, 
  onResetFilters 
}: ArtworksEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Icon */}
      <div className="mb-6 rounded-full bg-white/5 p-6">
        <PackageOpen className="w-16 h-16 text-white/40" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-semibold text-white mb-3">
        {hasFilters ? 'No artworks found' : 'No artworks available'}
      </h3>

      {/* Description */}
      <p className="text-white/60 max-w-md mb-6">
        {hasFilters 
          ? 'We couldn\'t find any artworks matching your current filters. Try adjusting your criteria.'
          : 'This artist has no artworks available at the moment. Please check back later.'
        }
      </p>

      {/* Reset button (only show if filters are active) */}
      {hasFilters && onResetFilters && (
        <button
          onClick={onResetFilters}
          className="px-6 py-3 bg-[#b39e73] text-white rounded-lg hover:bg-[#a08d62] transition-colors font-medium"
        >
          Clear all filters
        </button>
      )}
    </div>
  )
}

