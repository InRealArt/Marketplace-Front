'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import artists from '@/mocks/artists.json';
import nfts from '@/mocks/nfts.json';

import ArtistHeader from './subComponents/ArtistHeader';
import ListOfNfts from '@/components/List/ListOfNfts';

const Artist = () => {
  const { id: currentId } = useParams();
  const currentArtist = artists.find(({ id }) => currentId === id);
  const { name, bio } = currentArtist || {};

  if (currentArtist === undefined) return null;

  return (
    <main className="Artist">
      <ArtistHeader name={name} bio={bio} />
      <ListOfNfts nav={['All NFTs', 'All Collection']} nfts={nfts} />
    </main>
  );
};

export default Artist;
