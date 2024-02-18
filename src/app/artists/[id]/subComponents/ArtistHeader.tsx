import React from 'react';
import { Artist } from '@/mocks/types';
import ArtistBio from './ArtistBio';
import ArtistBackground from './ArtistBackground';
import ArtistActions from './ArtistActions';

const ArtistHeader = ({ name, bio, img, imgNFT }: Partial<Artist>) => {
  return (
    <section className="Artist__header">
      <ArtistBackground imgNFT={imgNFT} />
      <div className="Artist__infos">
        <ArtistActions img={img} />
        <ArtistBio name={name} bio={bio} />
      </div>
    </section>
  );
};

export default ArtistHeader;
