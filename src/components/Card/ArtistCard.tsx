import { Artist } from '@/mocks/types';
import Button from '../Button/Button';
import ArtistImage from '../../../public/images/Artist.png';
import React from 'react';

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard = ({ artist }: ArtistCardProps) => {
  const { id, name } = artist;
  return (
    <div
      className="ArtistCard"
      style={{
        backgroundImage: `linear-gradient(0deg, #353232 1.66%, rgba(53, 50, 50, 0.00) 49.82%), url('${ArtistImage.src}')`,
      }}
    >
      <div className="ArtistCard__infos">
        <h2 className="ArtistCard__name">{name}</h2>
        <Button
          additionalClassName="purple"
          text="See their arts"
          link={`/artist/${id}`}
        />
      </div>
    </div>
  );
};

export default ArtistCard;
