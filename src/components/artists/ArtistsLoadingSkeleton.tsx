import ArtistCardSkeleton from './ArtistCardSkeleton'

export default function ArtistsLoadingSkeleton() {
  return (
    <div className="m-auto mt-10">
      {/* Filter skeleton */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 animate-pulse">
        <div className="flex items-center gap-4">
          {/* Dropdown skeletons */}
          <div className="h-10 w-40 bg-gray-700 rounded-lg" />
          <div className="h-10 w-40 bg-gray-700 rounded-lg" />
          <div className="hidden md:block text-white/40">|</div>
          <div className="hidden md:block h-10 w-48 bg-gray-700 rounded-full" />
        </div>
        <div className="flex items-center gap-4">
          <div className="md:hidden h-10 w-48 bg-gray-700 rounded-full" />
          <div className="h-4 w-32 bg-gray-700 rounded" />
        </div>
      </div>

      {/* Artist cards grid with 10 skeletons */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <ArtistCardSkeleton key={index} />
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

