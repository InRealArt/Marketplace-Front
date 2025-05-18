import React, { useEffect } from 'react';
import Image from 'next/image';
import { ItemPhysicalType } from '@/types';
import { getImageFromUri } from '@/utils/getImageFromUri';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { useItemsStore } from '@/store/itemsStore';

interface NftItemProps {
  nft: ItemPhysicalType;
}

const NftItem = ({ nft }: NftItemProps) => {
  return (
    <Link href={`/artworks/${nft.id}`} className="WalletNftList__item">
      <Image
        priority={true}
        className="WalletNftList__item__image"
        alt={nft.name || ''}
        width={100}
        height={100}
        src={getImageFromUri(nft.mainImageUrl || '')}
      />
      <div className="WalletNftList__item__infos">
        <h3>{nft.name}</h3>
        <p>{nft.priceNftBeforeTax} €</p>
      </div>
    </Link>
  );
};

const NftList = () => {
  const { address } = useAccount();
  const { getCommunautaryNfts, fetchItems } = useItemsStore();
  const communautaryNfts = getCommunautaryNfts();
  const nftsOwned = communautaryNfts.filter((nft: ItemPhysicalType) => (nft.owner === address || nft.previousOwner === address));

  useEffect(() => {
    fetchItems();
  }, []);

  if (!nftsOwned.length) {
    return null;
  }
  return (
    <div className="WalletNftList">
      {nftsOwned.map((nft: ItemPhysicalType) => (
        <NftItem key={nft.id} nft={nft} />
      ))}
    </div>
  );
};

export default NftList;
