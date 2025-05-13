'use client'
import React, { useEffect } from 'react';
import ListOfNfts from '@/components/List/ListOfNfts';
import { useItemsStore } from '@/store/itemsStore';

const Nfts = () => {
  const { fetchItems, getCommunautaryNfts, getIraNfts, nfts } = useItemsStore()
  console.log(nfts);
  
  useEffect(() => {
    if (nfts.length === 0) {
      fetchItems()
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
