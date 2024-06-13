import React, { useEffect } from 'react';
import Image from 'next/image';
import useFetchData from '@/customHooks/useFetchData';
import { NftType } from '@/types';
import { getImageFromUri } from '@/utils/getImageFromUri';
import { useReadContract } from 'wagmi';
import { marketplaceAbi } from '@/web3/IraMarketplaceAbi';
import { marketplaceAddress } from '@/utils/constants';
import Link from 'next/link';

interface NftItemProps {
  nft: NftType
}

const NftItem = ({ nft }: NftItemProps) => {
  const { data: nftInfo } = useReadContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "getItem",
    args: [BigInt(nft?.itemId || 0)]
  });
  return <Link href={`/nfts/${nft.id}`} key={nft.tokenId} className="WalletNftList__item">
    {nft.imageUri && <Image
      className="WalletNftList__item__image"
      width={50}
      height={60}
      alt="NFT Image"
      src={getImageFromUri(nft.imageUri)}
    />}
    <h2 className="WalletNftList__item__name">{nft.name}</h2>
    <p className="WalletNftList__item__price">{Number(nftInfo?.price)} ETH</p>
  </Link>
}

const NftList = () => {
  const { nfts, refetch } = useFetchData(undefined)
  useEffect(() => {
    refetch()
  }, [])
  if (!nfts.length) {
    return null
  }
  return (
    <div className="WalletNftList">
      {nfts.filter(nft => nft.isOwner === true).map((nft) => (
        <NftItem key={nft.id} nft={nft} />
      ))}
    </div>
  );
};

export default NftList;
