'use client';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import ArtworkPresentation from '../../../components/Artwork/ArtworkPresentation';
import ArtistsListSlider from '@/components/List/ArtistsListSlider';
import { useItemsStore } from '@/store/itemsStore';
import ArtworkTags from '../../../components/Artwork/ArtworkTags';
import { useArtistsStore } from '@/store/artistsStore';
import { ArtistType, NftSlug } from '@/types';

const NftPage = () => {
  const { slug } = useParams();
  const { artists } = useArtistsStore();
  const { getItemBySlug, fetchItems } = useItemsStore();

  const nft = getItemBySlug(slug as NftSlug);
  const artistMock = { id: 1, name: 'John', surname: 'Doe', pseudo: 'John Doe', imageUrl: 'https://via.placeholder.com/150', description: 'John Doe is a famous artist', publicKey: '0x1234567890abcdef', isGallery: true, backgroundImage: 'https://via.placeholder.com/150', artworkStyle: 'Abstract', slug: 'john-doe' } as ArtistType

  useEffect(() => {
    if (nft === undefined) {
      fetchItems();
    }
  }, [nft]);  

  if (!nft) {
    return null;
  }

  return (
    <main className="mt-[100px] md:mt-[90px]">
      <ArtworkPresentation
        key={`nft-${nft.id}`}
        nft={nft}
        artist={artistMock}
      />
      <ArtworkTags tags={nft.Item.tags} />
      <ArtistsListSlider artists={artists} title="Associated Artists" />
    </main>
  );
};

export default NftPage;
