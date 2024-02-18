import React from 'react';
import { Artist } from '@/mocks/types';

const ArtistBackground = ({ imgNFT }: Partial<Artist>) => {
  return (
    <div
      className="Artist__background"
      style={{
        backgroundImage: ` url('${imgNFT}')`,
      }}
    ></div>
  );
};

export default ArtistBackground;
