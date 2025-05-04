'use client';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import NftIntro from './subComponents/NftIntro';
import ArtistsListSlider from '@/components/List/ArtistsListSlider';
import { useNftsStore } from '@/store/nftsStore';
import NftTags from './subComponents/NftTags';
import { useArtistsStore } from '@/store/artistsStore';
import { ArtistType, NftSlug } from '@/types';

const NftPage = () => {
  const { slug } = useParams();
  const { artists } = useArtistsStore();
  const { getNftBySlug, fetchNfts } = useNftsStore();

  const nft = getNftBySlug(slug as NftSlug);
  const artistMock = { id: 1, name: 'John', surname: 'Doe', pseudo: 'John Doe', imageUrl: 'https://via.placeholder.com/150', description: 'John Doe is a famous artist', publicKey: '0x1234567890abcdef', isGallery: true, backgroundImage: 'https://via.placeholder.com/150', artworkStyle: 'Abstract', slug: 'john-doe' } as ArtistType

  useEffect(() => {
    if (nft === undefined) {
      fetchNfts();
    }
  }, []);  

  if (!nft) return null;

  return (
    <main className="mt-[100px] md:mt-[90px]">
      <NftIntro
        nft={nft}
        artist={artistMock}
      />
      <NftTags tags={nft.tags} />
      <ArtistsListSlider artists={artists} title="Associated Artists" />
    </main>
  );
};

export default NftPage;
