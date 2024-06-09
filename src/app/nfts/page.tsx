'use client'
import React from 'react';
import ListOfNfts from '@/components/List/ListOfNfts';
import useFetchData from '@/customHooks/useFetchData';

const Nfts = () => {
  // const nftsByArtist = useAppSelector((state) => getNftsByArtist(state, 1)) // to implement filter by artist
  const { nfts } = useFetchData()

  return (
    <main className="Nfts">
      <ListOfNfts
        nav={[{ tab: 'All Artworks', list: nfts, context: 'nft' }, { tab: 'Communautary', list: [], context: 'nft' }]}
      />
    </main>
  );
};

export default Nfts;
