import React from 'react';
import { Artist } from '@/mocks/types';
import ArtistBackground from '../../../public/images/ArtistBackground.png';
import Image from 'next/image';
import Link from 'next/link';

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard = ({ artist }: ArtistCardProps) => {
  const { id, name, nfts } = artist;
  return (
    <div className="ArtistCard">
      <Link href={`/artists/${id}`}>
        <div
          className="ArtistCard__background"
          style={{
            backgroundImage: ` url('${ArtistBackground.src}')`,
          }}
        ></div>
      </Link>
      <div className="ArtistCard__infos">
        <Image
          className="ArtistCard__miniature"
          priority={true}
          alt="artist miniature"
          src="/images/ArtistMiniature.png"
          width={50}
          height={50}
        />{' '}
        <div>
          <h2 className="ArtistCard__title">{name}</h2>
          <p className="ArtistCard__nfts">{nfts} nfts</p>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
