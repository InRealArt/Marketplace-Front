import React from 'react'
import ArtistCard from '@/components/Card/ArtistCard'
import { ArtistWithRelations } from '@/types'

interface ArtistListProps {
  artists: ArtistWithRelations[]
  className?: string
}

const ArtistList = ({
  artists,
  className = ''
}: ArtistListProps) => {
  return (
    <div className={`grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {artists.map(artist => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  )
}

export default ArtistList
