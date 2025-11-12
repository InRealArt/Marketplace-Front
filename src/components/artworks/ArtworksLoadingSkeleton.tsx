import ArtworkCardSkeleton from '@/components/artists/ArtworkCardSkeleton'

interface ArtworksLoadingSkeletonProps {
  count?: number
}

const ArtworksLoadingSkeleton = ({ count = 12 }: ArtworksLoadingSkeletonProps) => {
  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6 animate-pulse">
        <div className="flex flex-wrap items-center gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="h-10 w-32 rounded-lg bg-white/10" />
          ))}
          <div className="hidden text-white/20 md:block">|</div>
        </div>
        <div className="h-4 w-32 rounded bg-white/10" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: count }).map((_, index) => (
          <ArtworkCardSkeleton key={index} />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 animate-pulse">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={`page-skeleton-${idx}`} className="h-10 w-10 rounded-lg bg-white/10" />
        ))}
      </div>
    </div>
  )
}

export default ArtworksLoadingSkeleton

