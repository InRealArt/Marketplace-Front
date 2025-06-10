'use client'
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

import ArtistHeader from './subComponents/ArtistHeader'
import ListOfNfts from '@/components/List/ListOfFeaturedArtworks'
import { ListNavigationType } from '@/types'
import { useArtistsStore } from '@/store/artistsStore'
import { useCollectionsStore } from '@/store/collectionsStore'
import { useItemsStore } from '@/store/itemsStore'
import { useBackofficeUserStore } from '@/store/backofficeUserStore'

const Artist = () => {
  const { slug } = useParams() as { slug: string }

  const { getItemsByArtistSlug, fetchItems } = useItemsStore()
  const { getCollectionsByArtistSlug, fetchCollections } = useCollectionsStore()
  const { fetchUsers } = useBackofficeUserStore()

  const { getArtistBySlug, fetchArtists, artists, galleries, isLoading } = useArtistsStore()

  useEffect(() => {
    fetchArtists()
    fetchItems()
    fetchCollections()
    fetchUsers()
  }, [fetchArtists, fetchItems, fetchCollections, fetchUsers])

  // Attendre que les données soient chargées pour chercher l'artiste
  const artist = !isLoading ? getArtistBySlug(slug) : undefined
  const nftsByArtist = artist ? getItemsByArtistSlug(slug) : []
  const collectionsByArtist = artist ? getCollectionsByArtistSlug(slug) : []

  // Debug log pour voir les données
  useEffect(() => {
    console.log('Slug recherché:', slug)
    console.log('Artistes disponibles:', artists)
    console.log('Galeries disponibles:', galleries)
    console.log('Artiste trouvé:', artist)
    console.log('Is loading:', isLoading)
  }, [slug, artists, galleries, artist, isLoading])

  const imgUri = nftsByArtist[0]?.item.mainImageUrl || ''

  const navigationInfos = [
    { tab: 'All Artworks', list: nftsByArtist, context: 'nft' },
    { tab: 'All Collections', list: collectionsByArtist, context: 'collection' }
  ] as ListNavigationType[]

  // Afficher un état de chargement
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p>Loading artist data...</p>
        </div>
      </div>
    )
  }

  // Afficher un message d'erreur si l'artiste n'est pas trouvé après le chargement
  if (!isLoading && artist === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artist not found</h1>
          <p>The artist with the slug &quote;{slug}&quote; does not exist.</p>
          <p className="mt-2">
            <Link href="/artists" className="text-blue-500 hover:underline">
              Back to artists
            </Link>
          </p>
        </div>
      </div>
    )
  }

  if (artist === undefined) return null

  return (
    <main>
      <ArtistHeader artist={artist} imgNft={imgUri} />
      {!artist.isGallery && <div className="mt-5"><ListOfNfts nav={navigationInfos} /></div>}
    </main>
  )
}

export default Artist 