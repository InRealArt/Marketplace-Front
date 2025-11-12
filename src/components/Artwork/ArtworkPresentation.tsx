'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { ItemPhysicalType, ArtistWithRelations } from '@/types';

import ArtworkGallery from './Image/ArtworkGallery';
import ArtworkInfos from './Infos/ArtworkInfos';
import ArtworkDetailsTabs from './ArtworkDetailsTabs';


interface ArtworkPresentationProps {
  artwork: ItemPhysicalType
  artist: ArtistWithRelations | null | undefined
}

const ArtworkPresentation = ({ artwork, artist }: ArtworkPresentationProps) => {

  return (
    <section className="flex flex-col lg:flex-row gap-[20px] relative">
      <div className="w-full lg:w-[70%]">
        <ArtworkGallery artwork={artwork} />
        <ArtworkInfos artwork={artwork} artist={artist} additionalClassName="lg:hidden" />
        <ArtworkDetailsTabs artwork={artwork} />
      </div>
      <ArtworkInfos artwork={artwork} artist={artist} additionalClassName="hidden lg:block" />
    </section>
  );
};

export default ArtworkPresentation;
