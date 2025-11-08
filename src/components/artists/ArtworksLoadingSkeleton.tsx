import ArtworkCardSkeleton from './ArtworkCardSkeleton'

interface ArtworksLoadingSkeletonProps {
  count?: number
}

export default function ArtworksLoadingSkeleton({ count = 12 }: ArtworksLoadingSkeletonProps) {
  return (
    <div>
      {/* Filter skeleton */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 animate-pulse">
        <div className="flex flex-wrap items-center gap-4">
          {/* Dropdown skeletons */}
          <div className="h-10 w-32 bg-gray-700 rounded-lg" />
          <div className="h-10 w-32 bg-gray-700 rounded-lg" />
          <div className="h-10 w-32 bg-gray-700 rounded-lg" />
          <div className="h-10 w-32 bg-gray-700 rounded-lg" />
          <div className="hidden md:block text-white/40">|</div>
        </div>
        <div className="h-4 w-32 bg-gray-700 rounded" />
      </div>

      {/* Artwork cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <ArtworkCardSkeleton key={index} />
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex items-center justify-center gap-2 mt-8 animate-pulse">
        <div className="w-10 h-10 bg-gray-700 rounded-lg" />
        <div className="w-10 h-10 bg-gray-700 rounded-lg" />
        <div className="w-10 h-10 bg-gray-700 rounded-lg" />
        <div className="w-10 h-10 bg-gray-700 rounded-lg" />
        <div className="w-10 h-10 bg-gray-700 rounded-lg" />
      </div>
    </div>
  )
}

