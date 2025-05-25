'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { ArtistType, ItemPhysicalType } from '@/types';

import ArtworkGallery from './Image/ArtworkGallery';
import ArtworkInfos from './Infos/ArtworkInfos';


interface ArtworkPresentationProps {
  nft: ItemPhysicalType
  artist: ArtistType | null | undefined
}

const ArtworkPresentation = ({ nft, artist }: ArtworkPresentationProps) => {  
  
  return (
    <section className="flex flex-col md:flex-row gap-[20px]">
      <ArtworkGallery nft={nft} />
      <ArtworkInfos nft={nft} artist={artist} />
    </section>
  );
};

export default ArtworkPresentation;
