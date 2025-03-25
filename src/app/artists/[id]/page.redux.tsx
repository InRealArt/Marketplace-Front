'use client';
import React from 'react';
import { useParams, useSearchParams } from 'next/navigation';

import ArtistHeader from './subComponents/ArtistHeader';
import ListOfNfts from '@/components/List/ListOfNfts';
import { useAppSelector } from '@/redux/hooks';
import { getArtistById } from '@/redux/reducers/artists/selectors';
import { getCollectionsByArtist } from '@/redux/reducers/collections/selectors';
import { ListNavigationType } from '@/types';
import useFetchData from '@/customHooks/useFetchData';


const Artist = () => {
  const searchParams = useSearchParams();
  
  // Sinon, utiliser la version Redux originale
  const { id: currentId } = useParams() as { id: string };
  const { nftsByArtist } = useFetchData(Number(currentId))

  const artist = useAppSelector((state) => getArtistById(state, Number(currentId)))
  const collectionsByArtist = useAppSelector((state) => getCollectionsByArtist(state, Number(currentId)))
  const imgUri = nftsByArtist[0]?.imageUri || ""

  const navigationInfos = [
    { tab: 'All Artworks', list: nftsByArtist, context: 'nft' },
    { tab: 'All Collections', list: collectionsByArtist, context: 'collection' }
  ] as ListNavigationType[]

  if (artist === undefined) return null;
  return (
    <main className="Artist">
      <ArtistHeader artist={artist} imgNft={imgUri} />
      {!artist.isGallery && <ListOfNfts
        nav={navigationInfos}
      />}
    </main>
  );
};

export default Artist;
