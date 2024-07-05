'use client'
import React from 'react';
import ListOfNfts from '@/components/List/ListOfNfts';
import useFetchData from '@/customHooks/useFetchData';
import { useAppSelector } from '@/redux/hooks';
import { getCommunautaryNfts } from '@/redux/reducers/nfts/selectors';

const Nfts = () => {
  const { nfts } = useFetchData()
  const communautaryNfts = useAppSelector((state) => getCommunautaryNfts(state))

  return (
    <main className="Nfts">
      <ListOfNfts
        nav={[{ tab: 'Ira Artworks', list: nfts, context: 'nft' }, { tab: 'Communautary Artworks', list: communautaryNfts, context: 'nft' }]}
      />
    </main>
  );
};

export default Nfts;
