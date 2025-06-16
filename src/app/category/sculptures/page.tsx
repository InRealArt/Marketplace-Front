import React from 'react'
import ArtworkGridTitle from '@/components/client/artwork/ArtworkGridTitle'
import ArtworkGrid from '@/components/server/ArtworksGrid'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

interface SculpturesPageProps {
  searchParams: SearchParams
}

const SCULPTURES_TITLE = 'Sculptures'

const SculpturesPage = async ({ searchParams }: SculpturesPageProps) => {
  return (
    <main className="w-full">
      <div className="w-full px-4 md:px-6 lg:px-8 pt-[120px]">
        <ArtworkGridTitle title={SCULPTURES_TITLE} />
        <ArtworkGrid searchParams={searchParams} mediumName="Sculpture" />
      </div>
    </main>
  )
}

export default SculpturesPage 