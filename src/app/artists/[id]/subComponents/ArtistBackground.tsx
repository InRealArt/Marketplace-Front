import React from 'react';
import ArtistLargeBg from '../../../../../public/images/ArtistLargeBg.png';

const ArtistBackground = () => {
  return (
    <div
      className="Artist__background"
      style={{
        backgroundImage: ` url('${ArtistLargeBg.src}')`,
      }}
    ></div>
  );
};

export default ArtistBackground;
