'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import NftIntro from './subComponents/NftIntro';
import ArtistsListSlider from '@/components/List/ArtistsListSlider';
import { useReadContract } from 'wagmi';
import { marketplaceAbi } from '@/web3/IraMarketplaceAbi';
import { marketplaceAddress } from '@/utils/constants';
import { useAppSelector } from '@/redux/hooks';
import { getNftById } from '@/redux/reducers/nfts/selectors';
import { getArtistByNft } from '@/redux/reducers/artists/selectors';
import { getCollectionById } from '@/redux/reducers/collections/selectors';
import { Address } from 'viem';
import NftTags from './subComponents/NftTags';
import useFetchData from '@/customHooks/useFetchData';

const NftPage = () => {
  const { id: currentId } = useParams();
  const { artists } = useFetchData()
  
  const nft = useAppSelector((state) => getNftById(state, Number(currentId)))
  const artist = useAppSelector((state) => getArtistByNft(state, nft?.collectionId || 0))
  const collection = useAppSelector((state) => getCollectionById(state, nft?.collectionId || 0))

  const { data: nftInfo } = useReadContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "getItem",
    args: [BigInt(nft?.itemId || 0)]
  });

  const { data: isSold } = useReadContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "isSold",
    args: [BigInt(nft?.itemId || 0)]
  });

  if (!nft || !collection) return null;

  return (
    <main className="Nft">
      <NftIntro
        nft={{ ...nft, price: Number(nftInfo?.price) }}
        artist={artist}
        sold={isSold}
        contractAddress={collection.contractAddress as Address}
      />
      <NftTags tags={nft.tags} />
      <ArtistsListSlider artists={artists} title="Associated Artists" />
    </main>
  );
};

export default NftPage;
