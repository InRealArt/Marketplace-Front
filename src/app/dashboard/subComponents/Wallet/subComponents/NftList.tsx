import React, { useEffect } from 'react';
import Image from 'next/image';
import useFetchData from '@/customHooks/useFetchData';
import { NftType } from '@/types';
import { getImageFromUri } from '@/utils/getImageFromUri';
import { useAccount, useReadContract } from 'wagmi';
import { marketplaceAbi } from '@/web3/IraMarketplaceAbi';
import { marketplaceAddress } from '@/utils/constants';
import Link from 'next/link';

interface NftItemProps {
  nft: NftType
}

const NftItem = ({ nft }: NftItemProps) => {
  return <Link href={`/nfts/${nft.id}`} key={nft.tokenId} className="WalletNftList__item">
    {nft.imageUri && <Image
      className="WalletNftList__item__image"
      width={50}
      height={60}
      alt="NFT Image"
      src={getImageFromUri(nft.imageUri)}
    />}
    <h2 className="WalletNftList__item__name">{nft.name}</h2>
    {/* <p className="WalletNftList__item__price">{Number(nftInfo?.price)} ETH</p> */}
  </Link>
}

const NftList = () => {
  const { nfts, refetch } = useFetchData(undefined)
  const { address } = useAccount()
  useEffect(() => {
    refetch()
  }, [])

  const nftsOwned = nfts.filter(nft => nft.owner === address)
  console.log(nfts);

  if (!nftsOwned.length) {
    return null
  }
  return (
    <div className="WalletNftList">
      {nfts.filter(nft => nft.owner === address).map((nft) => (
        <NftItem key={nft.id} nft={nft} />
      ))}
    </div>
  );
};

export default NftList;
