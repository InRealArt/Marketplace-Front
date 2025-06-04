import React from 'react';
import ArtistBio from './ArtistBio';
import ArtistBackground from './ArtistBackground';
import ArtistActions from './ArtistActions';
import { ArtistType } from '@/types';

interface ArtistProps {
  artist: Partial<ArtistType>
  imgNft: string
}

const ArtistHeader = ({ artist, imgNft }: ArtistProps) => {
  const { imageUrl, pseudo, description, backgroundImage, isGallery } = artist || {}

  return (
    <section>
      <ArtistBackground imgNft={(backgroundImage || imgNft) as string} isGallery={isGallery} />
      <div className="relative mt-[132px] sm:mt-[293px]">
        <ArtistActions imageUrl={imageUrl || ""} isGallery={artist.isGallery} />
        <ArtistBio name={pseudo} description={description} />
      </div>
    </section>
  );
};

export default ArtistHeader;
