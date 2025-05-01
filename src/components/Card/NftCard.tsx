import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FlameIcon } from 'lucide-react';
import Button from '../Button/Button';
import { NftType } from '@/types';
import { useAppSelector } from '@/redux/hooks';
import { getArtistByNft } from '@/redux/reducers/artists/selectors';

interface NftCardProps {
  nft: NftType;
}

const NftCard = ({ nft }: NftCardProps) => {
  const { name, slug } = nft;
  const artist = useAppSelector((state) => getArtistByNft(state, nft.idUser))

  return (
    <div className="NftCard">
      <Link className="NftCard__image" href={`/artworks/${slug || nft.id}`}>
        <picture className="NftCard__picture">
          {nft.mainImageUrl && <Image className='NftCard__img' alt={nft.name || ''} width={300} height={300} src={nft.mainImageUrl} />}
        </picture>
        <div className="NftCard__likes">
          <FlameIcon width={23} height={23} /> <span>Famous artist</span>
        </div>
      </Link>
      <div className="NftCard__bottom">
        <div className="NftCard__infos">
          <div className="NftCard__bio">
            <Link className="NftCard__artist" href={`/artists/${artist?.slug || artist?.id}`}>
              {artist?.pseudo}
            </Link>
            <Link className="NftCard__title" href={`/artworks/${slug || nft.id}`}>
              {name}
            </Link>
          </div>
          <div className="NftCard__price">
            {nft.priceNftBeforeTax} €
          </div>
        </div>
        <Button
          text='Buy now'
          link={`/artworks/${slug || nft.id}`}
          additionalClassName='gold'
          activeClassName='large'
        />
      </div>
    </div>
  );
};

export default NftCard;
