import React from 'react';
import { getImageFromUri } from '@/utils/getImageFromUri';

const ArtistBackground = ({ imgNft, isGallery }: { imgNft: string; isGallery: boolean | null | undefined }) => {
  return (
    <div
      className="absolute left-0 top-[80px] w-screen bg-no-repeat bg-cover bg-center h-[100px] sm:h-[280px]"
      style={{
        backgroundImage: ` url('${isGallery ? imgNft : getImageFromUri(imgNft)}')`,
      }}
    ></div>
  );
};

export default ArtistBackground;
