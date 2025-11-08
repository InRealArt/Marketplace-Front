export default function ArtworkCardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Image skeleton */}
      <div className="relative overflow-hidden rounded-lg bg-gray-800 aspect-square mb-3">
        <div className="absolute inset-0 bg-gray-700" />
      </div>

      {/* Info skeleton */}
      <div className="space-y-2">
        {/* Name skeleton */}
        <div className="h-5 bg-gray-700 rounded w-3/4" />
        
        {/* Price skeleton */}
        <div className="h-4 bg-gray-700 rounded w-1/3" />
      </div>
    </div>
  )
}

