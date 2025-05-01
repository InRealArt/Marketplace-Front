'use client';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import NftIntro from './subComponents/NftIntro';
import ArtistsListSlider from '@/components/List/ArtistsListSlider';
import { useReadContract } from 'wagmi';
import { marketplaceAbi } from '@/web3/IraMarketplaceAbi';
import { marketplaceAddress } from '@/utils/constants';
import { useNftsStore } from '@/store/nftsStore';
import { useAppSelector } from '@/redux/hooks';
import { getArtistByNft } from '@/redux/reducers/artists/selectors';
import { getCollectionById } from '@/redux/reducers/collections/selectors';
import { Address } from 'viem';
import NftTags from './subComponents/NftTags';
import { useArtistsStore } from '@/store/artistsStore';
import { NftSlug } from '@/types';

const NftPage = () => {
  const { slug } = useParams();
  const { artists } = useArtistsStore();
  const { getNftBySlug, fetchNfts } = useNftsStore();

  const nft = getNftBySlug(slug as NftSlug);
  const artist = useAppSelector((state) => getArtistByNft(state, nft?.categoryId || 0));

  // const { data: nftInfo } = useReadContract({
  //   abi: marketplaceAbi,
  //   address: marketplaceAddress,
  //   functionName: "getItem",
  //   args: [BigInt(nft?.itemId || 0)]
  // });

  useEffect(() => {
    if (nft === undefined) {
      fetchNfts();
    }
  }, []);  

  if (!nft) return null;

  return (
    <main className="Nft">
      <NftIntro
        nft={nft}
        artist={artist}
        // contractAddress={collection.contractAddress as Address} TODO: add contract address
      />
      <NftTags tags={nft.tags} />
      <ArtistsListSlider artists={artists} title="Associated Artists" />
    </main>
  );
};

export default NftPage;
