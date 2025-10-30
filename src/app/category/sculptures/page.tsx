import React from 'react'
import ArtworkGridTitle from '@/components/client/artwork/ArtworkGridTitle'
import ArtworkGrid from '@/components/server/ArtworksGrid'
import Container from '@/components/Common/Container'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

interface SculpturesPageProps {
  searchParams: SearchParams
}

const SCULPTURES_TITLE = 'Sculptures'

const SculpturesPage = async ({ searchParams }: SculpturesPageProps) => {
  return (
    <Container>
      <main className="w-full">
        <div className="w-full px-4 md:px-6 lg:px-8">
          <ArtworkGridTitle title={SCULPTURES_TITLE} />
          <ArtworkGrid searchParams={searchParams} mediumName="Sculpture" />
        </div>
      </main>
    </Container>
  )
}

export default SculpturesPage 