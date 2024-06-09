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
    <section className="Artist__header">
      <ArtistBackground imgNft={(backgroundImage || imgNft) as string} isGallery={isGallery} />
      <div className="Artist__infos">
        <ArtistActions imageUrl={imageUrl || ""} isGallery={artist.isGallery} />
        <ArtistBio name={pseudo} description={description} />
      </div>
    </section>
  );
};

export default ArtistHeader;
