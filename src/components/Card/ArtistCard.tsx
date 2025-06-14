import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArtistType } from '@/types';
import { useAppSelector } from '@/redux/hooks';
import { getNftsByArtist } from '@/redux/reducers/nfts/selectors';
import { getImageFromUri } from '@/utils/getImageFromUri';

interface ArtistCardProps {
  artist: ArtistType;
}

const ArtistCard = ({ artist }: ArtistCardProps) => {
  const { id, name, imageUrl, backgroundImage } = artist;
  const nfts = useAppSelector((state) => getNftsByArtist(state, id))
  const imgUri = nfts[0]?.imageUri
  const background = imgUri ? getImageFromUri(imgUri) : backgroundImage

  // hide boucheix
  if (artist.id === 2) {
    return null;
  }
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
