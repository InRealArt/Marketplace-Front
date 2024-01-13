import React from 'react';
import nfts from '@/mocks/nfts.json';
import ListOfNfts from '@/components/List/ListOfNfts';

const Nfts = () => {
  return (
    <main className="Nfts">
      <ListOfNfts nav={['All NFTs', 'Communautary']} nfts={nfts} />
    </main>
  );
};

export default Nfts;
