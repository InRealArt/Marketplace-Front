export default function ArtistCardSkeleton() {
  return (
    <div className="group cursor-pointer animate-pulse">
      <div className="relative overflow-hidden rounded-lg bg-gray-800 aspect-square mb-4">
        {/* Image placeholder */}
        <div className="absolute inset-0 bg-gray-700" />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Artist name skeleton */}
      <div className="h-6 bg-gray-700 rounded w-3/4 mb-2" />
      
      {/* Artist role/info skeleton */}
      <div className="h-4 bg-gray-700 rounded w-1/2" />
    </div>
  )
}

