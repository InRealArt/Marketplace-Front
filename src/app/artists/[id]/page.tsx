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
  const { name, bio, img, imgNFT } = currentArtist || {};

  if (currentArtist === undefined) return null;

  return (
    <main className="Artist">
      <ArtistHeader name={name} bio={bio} img={img} imgNFT={imgNFT} />
      <ListOfNfts
        nav={['All NFTs', 'All Collection']}
        nfts={nfts.filter((nft) => nft.artist.id === currentId)}
      />
    </main>
  );
};

export default Artist;
