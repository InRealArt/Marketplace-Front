import React from 'react'
import ArtworkGridTitle from '@/components/client/artwork/ArtworkGridTitle'
import PaintingsGrid from '@/components/server/PaintingsGrid'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

interface PaintingsPageProps {
  searchParams: SearchParams
}

const PaintingsPage = async ({ searchParams }: PaintingsPageProps) => {
  return (
    <main className="w-full">
      <div className="w-full px-4 md:px-6 lg:px-8 pt-[120px]">
        <ArtworkGridTitle title="Peintures" />
        <PaintingsGrid searchParams={searchParams} />
      </div>
    </main>
  )
}

export default PaintingsPage 