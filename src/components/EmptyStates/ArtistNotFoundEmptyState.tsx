import Link from 'next/link'
import { UserX } from 'lucide-react'

interface ArtistNotFoundEmptyStateProps {
  slug: string
}

export default function ArtistNotFoundEmptyState({ slug }: ArtistNotFoundEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-16 px-4 text-center">
      {/* Icon */}
      <div className="mb-6 rounded-full bg-white/5 p-6">
        <UserX className="w-16 h-16 text-white/40" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold text-white mb-3">
        Artist not found
      </h1>

      {/* Description */}
      <p className="text-white/60 max-w-md mb-2">
        The artist with the slug <span className="text-white font-mono">"{slug}"</span> does not exist.
      </p>
      <p className="text-white/60 max-w-md mb-6">
        Please check the URL or browse our artists directory.
      </p>

      {/* Back button */}
      <Link
        href="/artists"
        className="px-6 py-3 bg-[#b39e73] text-white rounded-lg hover:bg-[#a08d62] transition-colors font-medium"
      >
        Browse all artists
      </Link>
    </div>
  )
}

