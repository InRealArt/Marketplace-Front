import React from 'react';
import ArtistLargeBg from '../../../../../public/images/ArtistLargeBg.png';
import { Artist } from '@/mocks/types';

const ArtistBackground = ({ imgNFT }: Partial<Artist>) => {
  console.log(imgNFT);
  
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
