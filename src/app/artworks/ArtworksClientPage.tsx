'use client'
import React from 'react'
import ArtworkList from '@/components/artists/ArtworkList'
import { ItemPhysicalType } from '@/types'

interface ArtworksClientPageProps {
  artworks: ItemPhysicalType[]
  totalPages: number
  currentPage: number
  totalResults: number
  priceRanges: { value: string, label: string }[]
  sizes: { value: string, label: string }[]
  materials: { value: string, label: string }[]
  types: { value: string, label: string }[]
  filtersClassName?: string
}

const ArtworksClientPage = ({
  artworks,
  totalPages,
  currentPage,
  totalResults,
  priceRanges,
  sizes,
  materials,
  types,
  filtersClassName
}: ArtworksClientPageProps) => {
  return (
    <div className="m-auto mt-10">
      <ArtworkList
        artworks={artworks}
        totalPages={totalPages}
        currentPage={currentPage}
        totalResults={totalResults}
        priceRanges={priceRanges}
        sizes={sizes}
        materials={materials}
        types={types}
        filtersClassName={filtersClassName}
      />
    </div>
  )
}

export default ArtworksClientPage

