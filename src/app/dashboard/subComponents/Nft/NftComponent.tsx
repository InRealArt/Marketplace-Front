'use client';
import React from 'react';
import { OwnedNft } from 'alchemy-sdk';

import NftMain from './NftMain';

interface Props {
  nftsOwned: OwnedNft[];
}

const NftComponent = ({ nftsOwned }: Props) => {
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
        </div>
      </section>
    </>
  );
};

export default NftComponent;
