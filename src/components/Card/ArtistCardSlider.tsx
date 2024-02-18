import React from 'react';
import { Artist } from '@/mocks/types';
import Button from '../Button/Button';
import Link from 'next/link';

interface ArtistCardSliderProps {
  artist: Artist;
}

const ArtistCardSlider = ({ artist }: ArtistCardSliderProps) => {
  const { id, name, img } = artist;
  return (
    <Link href={`/artists/${id}`}>
      <div
        className="ArtistCardSlider"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 2.61%, rgba(0, 0, 0, 0.50) 2.62%, rgba(0, 0, 0, 0.00) 48.1%), url('${img}')`,
        }}
      >
        <div className="ArtistCardSlider__infos">
          <h2 className="ArtistCardSlider__name">{name}</h2>
          <Button additionalClassName="purple" text="See their arts" />
        </div>
      </div>
    </Link>
  );
};

export default ArtistCardSlider;
