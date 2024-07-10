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
  </Link>
}

const NftList = () => {
  const { address } = useAccount()
  //Les NFTs des users sont les NFT dont le champ "owner" est valorisé à l'adresse du wallet Metamask connecté 
  // Ces Nfts sont forcément au statut 'SOLD'
  //Il faut ajouter à ces NFT ceux qui ont été listé par le vendeur sur la MarketPlace donc ceux qui respectent les critéres : 
  //  statut = LISTED & previousOwner = currentWallet
  const { communautaryNfts, refetch } = useFetchData(undefined)
  const nftsOwned = communautaryNfts.filter(nft => (nft.owner === address || nft.previousOwner === address))

  useEffect(() => {
    refetch()
  }, [])

  if (!nftsOwned.length) {
    return null
  }
  return (
    <div className="WalletNftList">
      {nftsOwned.map((nft) => (
        <NftItem key={nft.id} nft={nft} />
      ))}
    </div>
  );
};

export default NftList;
