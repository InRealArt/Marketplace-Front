import React from 'react';
import { getImageFromUri } from '@/utils/getImageFromUri';

const ArtistBackground = ({ imgNft, isGallery }: { imgNft: string; isGallery: boolean | null | undefined }) => {
  return (
    <div
      className="Artist__background"
      style={{
        backgroundImage: ` url('${isGallery ? imgNft : getImageFromUri(imgNft)}')`,
      }}
    ></div>
  );
};

export default ArtistBackground;
