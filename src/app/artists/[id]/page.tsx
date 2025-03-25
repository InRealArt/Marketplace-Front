'use client';
import React from 'react';
import { useParams } from 'next/navigation';

import ArtistHeader from './subComponents/ArtistHeader';
import ListOfNftsZustand from '@/components/List/ListOfNftsZustand';
import { ListNavigationType } from '@/types';
import useZustandFetchData from '@/customHooks/useZustandFetchData';
import { useArtistsStore } from '@/store/artistsStore';
import { useCollectionsStore } from '@/store/collectionsStore';

const ArtistZustand = () => {
  const { id: currentId } = useParams() as { id: string };
  const numericId = Number(currentId);
  
  console.log('ArtistZustand', numericId)
  // Récupération des données via Zustand
  const { nftsByArtist } = useZustandFetchData(numericId);
  const { getCollectionsByArtist } = useCollectionsStore();
  const collectionsByArtist = getCollectionsByArtist(numericId);
  
  // Récupération de l'artiste via le store Zustand
  const artistStore = useArtistsStore();
  const artist = artistStore.artists.concat(artistStore.galleries).find(a => a.id === numericId);
  
  const imgUri = nftsByArtist[0]?.imageUri || "";

  const navigationInfos = [
    { tab: 'All Artworks', list: nftsByArtist, context: 'nft' },
    { tab: 'All Collections', list: collectionsByArtist, context: 'collection' }
  ] as ListNavigationType[];

  if (artist === undefined) return null;
  
  return (
    <main className="Artist">
      <ArtistHeader artist={artist} imgNft={imgUri} />
      {!artist.isGallery && <ListOfNftsZustand nav={navigationInfos} />}
    </main>
  );
};

export default ArtistZustand; 