'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import nfts from '@/mocks/nfts.json';
import artists from '@/mocks/artists.json';
import NftIntro from './subComponents/NftIntro';
import NftFilters from './subComponents/NftFilters';
import ArtistsListSlider from '@/components/List/ArtistsListSlider';

const NftPage = () => {
  const { id: currentId } = useParams();
  const currentNFT = nfts.find(({ id }) => currentId === id);
  const { name, price, likes, filters, description, artist } = currentNFT || {};

  if (currentNFT === undefined) return null;

  return (
    <main className="Nft">
      <NftIntro
        likes={likes}
        price={price}
        name={name}
        artist={artist}
        description={description}
      />
      <NftFilters filters={filters} />
      <ArtistsListSlider artists={artists} title="Artistes associés" />
    </main>
  );
};

export default NftPage;
