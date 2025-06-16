import React from 'react'
import ArtworkGridTitle from '@/components/client/artwork/ArtworkGridTitle'
import ArtworkGrid from '@/components/server/ArtworksGrid'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

interface PaintingsPageProps {
  searchParams: SearchParams
}

const PAINTINGS_TITLES = 'Paintings'

const PaintingsPage = async ({ searchParams }: PaintingsPageProps) => {
  return (
    <main className="w-full">
      <div className="w-full px-4 md:px-6 lg:px-8 pt-[120px]">
        <ArtworkGridTitle title={PAINTINGS_TITLES} />
        <ArtworkGrid searchParams={searchParams} mediumName="Peinture" />
      </div>
    </main>
  )
}

export default PaintingsPage 