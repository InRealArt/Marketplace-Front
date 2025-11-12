'use client'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/Common/Container'
import { ArtistWithRelations } from '@/types'

interface ArtistHighlightProps {
  artist: ArtistWithRelations | null
}

const ArtistHighlight = ({ artist }: ArtistHighlightProps) => {
  if (!artist) return null

  const fullName = `${artist.name ?? ''} ${artist.surname ?? ''}`.trim()
  const biography = artist.biography ?? ''

  return (
    <Container className="mt-14">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div className="space-y-6 text-white w-full md:w-[50%]">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">Meet the artist</p>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            {fullName || 'Featured artist'}
          </h2>

          {biography && (
            <p className="text-xs leading-relaxed text-white/70 md:text-base text-justify">
              {biography}
            </p>
          )}

          {artist.slug && (
            <Link
              href={`/artists/${artist.slug}`}
              className="inline-flex items-center text-sm font-medium text-[#b39e73] hover:text-[#c9b583] transition-colors"
            >
              Discover {fullName || 'artist'}&apos;s profile →
            </Link>
          )}
        </div>

        {artist.photo && (
          <Image
            className='w-full h-auto max-w-[500px]'
            src={artist.photo}
            alt={fullName || 'Artist portrait'}
            width={500}
            height={500}
          />
        )}
      </div>
    </Container>
  )
}

export default ArtistHighlight

