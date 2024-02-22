'use client';
import React from 'react';
import { OwnedNft } from 'alchemy-sdk';

import NftMain from './NftMain';
import NftList from './NftList';

interface Props {
  nftsOwned: OwnedNft[];
}

const NftPage = ({ nftsOwned }: Props) => {
  console.log(nftsOwned);

  return (
    <>
      <section className="Wallet__main">
        <h2 className="Wallet__title">Main Information</h2>
        <div className="Wallet__content">
          {' '}
          <NftMain nbOfNfts={nftsOwned.length} />
        </div>
      </section>
      <section className="Wallet__list">
        <h2 className="Wallet__title">NFTs List</h2>
        <div className="Wallet__content">
          <NftList nftsOwned={nftsOwned} />
        </div>
      </section>
    </>
  );
};

export default NftPage;
