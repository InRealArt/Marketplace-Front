'use client'
import React, { useEffect } from 'react';
import ListOfNfts from '@/components/List/ListOfNfts';
import { useNftsStore } from '@/store/nftsStore';

const Nfts = () => {
  const { fetchNfts, getCommunautaryNfts, getIraNfts, nfts } = useNftsStore()
  console.log(nfts);
  
  useEffect(() => {
    if (nfts.length === 0) {
      fetchNfts()
    }
  }, [])

  return (
    <main className="Nfts">
      <ListOfNfts
        nav={[{ tab: 'Ira Artworks', list: getIraNfts(), context: 'nft' }, { tab: 'Communautary Artworks', list: getCommunautaryNfts(), context: 'nft' }]}
      />
    </main>
  );
};

export default Nfts;
