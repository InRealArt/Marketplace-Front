import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArtistType } from '@/types';
import { useNftsStore } from '@/store/nftsStore';

interface ArtistCardProps {
  artist: ArtistType;
}

const ArtistCard = ({ artist }: ArtistCardProps) => {
  const { id, name, imageUrl, backgroundImage } = artist;
  
  const { getNftsByArtist } = useNftsStore();
  const nfts = getNftsByArtist(id);

  const imgUri = nfts[0]?.mainImageUrl;
  const background = imgUri ?? backgroundImage;

  return (
    <div className="ArtistCard">
      <Link href={`/artists/${id}`}>
        {background ? <div
          className="ArtistCard__background"
          style={{
            backgroundImage: ` url('${background}')`,
          }}
        /> : <div className="ArtistCard__emptyBackground"></div>}
      </Link>
      <div className="ArtistCard__infos">
        {imageUrl && (
          <Image
            className="ArtistCard__miniature"
            priority={true}
            alt="artist miniature"
            src={imageUrl}
            width={50}
            height={50}
          />
        )}{' '}
        <div>
          <h2 className="ArtistCard__title">{name}</h2>
          {!artist.isGallery && <p className="ArtistCard__nfts">{nfts.length} nfts</p>}
        </div>
      </div>
    </div>
  );
};

export default ArtistCard; 