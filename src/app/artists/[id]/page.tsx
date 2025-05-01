'use client';
import React from 'react';
import { useParams } from 'next/navigation';

import ArtistHeader from './subComponents/ArtistHeader';
import ListOfNfts from '@/components/List/ListOfNfts';
import { ListNavigationType } from '@/types';
import { useArtistsStore } from '@/store/artistsStore';
import { useCollectionsStore } from '@/store/collectionsStore';
import { useNftsStore } from '@/store/nftsStore';

const Artist = () => {
  const { id: currentId } = useParams() as { id: string };
  const numericId = Number(currentId);

  console.log('Artist', numericId)
  const { getNftsByArtist } = useNftsStore()
  const nftsByArtist = getNftsByArtist(numericId)
  const { getCollectionsByArtist } = useCollectionsStore();
  const collectionsByArtist = getCollectionsByArtist(numericId);

  const artistStore = useArtistsStore();
  const artist = artistStore.artists.concat(artistStore.galleries).find(a => a.id === numericId);

  const imgUri = nftsByArtist[0]?.mainImageUrl || "";

  const navigationInfos = [
    { tab: 'All Artworks', list: nftsByArtist, context: 'nft' },
    { tab: 'All Collections', list: collectionsByArtist, context: 'collection' }
  ] as ListNavigationType[];

  if (artist === undefined) return null;

  return (
    <main className="Artist">
      <ArtistHeader artist={artist} imgNft={imgUri} />
      {!artist.isGallery && <ListOfNfts nav={navigationInfos} />}
    </main>
  );
};

export default Artist; 