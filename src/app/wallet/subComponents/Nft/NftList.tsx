import React from 'react';
import Image from 'next/image';
import { OwnedNft } from 'alchemy-sdk';

interface Props {
  nftsOwned: OwnedNft[];
}

const NftList = ({ nftsOwned }: Props) => {
  return (
    <div className="WalletNftList">
      {nftsOwned.map((nft) => (
        <div key={nft.tokenId} className="WalletNftList__item">
          <Image
            className="WalletNftList__item__image"
            width={50}
            height={60}
            alt="NFT Image"
            src={nft.tokenUri || ''}
          />
          <h2 className="WalletNftList__item__name">{nft.contract.name}</h2>
          <p className="WalletNftList__item__price">{20000} €</p>
        </div>
      ))}
    </div>
  );
};

export default NftList;
