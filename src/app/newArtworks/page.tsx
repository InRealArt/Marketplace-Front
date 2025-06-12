import React from 'react'
import ArtworkGridTitle from '@/components/client/artwork/ArtworkGridTitle'
import ArtworksGrid from '@/components/server/ArtworksGrid'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

interface NewArtworksPageProps {
  searchParams: SearchParams
}

const NEW_ARTWORKS_TITLE = 'Nouveautés'

const NewArtworksPage = async ({ searchParams }: NewArtworksPageProps) => {
  return (
    <main className="w-full">
      <div className="w-full px-4 md:px-6 lg:px-8 pt-[120px]">
        <ArtworkGridTitle title={NEW_ARTWORKS_TITLE} />
        <ArtworksGrid searchParams={searchParams} showNewItems={true} />
      </div>
    </main>
  )
}

export default NewArtworksPage 