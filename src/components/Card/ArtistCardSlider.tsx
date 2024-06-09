import React from 'react';
import Button from '../Button/Button';
import Link from 'next/link';
import { ArtistType } from '@/types';

interface ArtistCardSliderProps {
  artist: ArtistType;
}

const ArtistCardSlider = ({ artist }: ArtistCardSliderProps) => {
  const { id, imageUrl, pseudo } = artist;
  return (
    <Link href={`/artists/${id}`}>
      <div
        className="ArtistCardSlider"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 2.61%, rgba(0, 0, 0, 0.50) 2.62%, rgba(0, 0, 0, 0.00) 48.1%), url('${imageUrl}')`,
        }}
      >
        <div className="ArtistCardSlider__infos">
          <h2 className="ArtistCardSlider__name">{pseudo}</h2>
          <Button additionalClassName="purple" text="See their arts" />
        </div>
      </div>
    </Link>
  );
};

export default ArtistCardSlider;
