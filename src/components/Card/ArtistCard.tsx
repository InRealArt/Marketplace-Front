import { Artist } from '@/mocks/types';
import Button from '../Button/Button';
import ArtistImage from '../../../public/images/Artist.png';
import React, { forwardRef, ForwardRefRenderFunction } from 'react';

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: ForwardRefRenderFunction<HTMLDivElement, ArtistCardProps> = (
  props: ArtistCardProps,
  ref,
) => {
  const { id, name } = props.artist;
  return (
    <div
      className="ArtistCard"
      style={{ backgroundImage: `url('${ArtistImage.src}')` }}
      ref={ref}
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

export default forwardRef(ArtistCard);
