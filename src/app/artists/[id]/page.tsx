'use client';
import React, { useEffect } from 'react';
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

  const { getNftsByArtist } = useNftsStore()
  const nftsByArtist = getNftsByArtist(numericId)
  const { getCollectionsByArtist } = useCollectionsStore();
  const collectionsByArtist = getCollectionsByArtist(numericId);

  const { getArtistById, fetchArtists } = useArtistsStore();
  const artist = getArtistById(numericId);

  useEffect(() => {
    fetchArtists()
  }, [fetchArtists])

  const imgUri = nftsByArtist[0]?.mainImageUrl || "";

  const navigationInfos = [
    { tab: 'All Artworks', list: nftsByArtist, context: 'nft' },
    { tab: 'All Collections', list: collectionsByArtist, context: 'collection' }
  ] as ListNavigationType[];

  if (artist === undefined) return null;

  return (
    <main>
      <ArtistHeader artist={artist} imgNft={imgUri} />
      {!artist.isGallery && <div className="mt-5"><ListOfNfts nav={navigationInfos} /></div>}
    </main>
  );
};

export default Artist; 