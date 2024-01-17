import React from 'react';
import { Nft } from '@/mocks/types';
import Button from '../Button/Button';
import NftImage from '../../../public/images/Nft.png';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';

interface NftCardProps {
  nft: Nft;
}

const NftCard = ({ nft }: NftCardProps) => {
  const { id, name, artist, price, likes } = nft;
  return (
    <div className="NftCard">
      <Link href={`/nfts/${id}`}>
        <div
          className="NftCard__background"
          style={{
            backgroundImage: ` url('${NftImage.src}')`,
          }}
        >
          <div className="NftCard__likes">
            <Heart width={23} height={23} /> <span>{likes} likes</span>
          </div>
        </div>
      </Link>
      <div className="NftCard__infos">
        <div>
          <Link className="NftCard__artist" href={`/artists/${artist?.id}`}>
            {artist?.name}
          </Link>
          <Link className="NftCard__title" href={`/nfts/${id}`}>
            {name}
          </Link>
        </div>
        <div className="NftCard__price">
          <Image
            className=""
            priority={true}
            alt="ether"
            src="/icons/Ether.png"
            width={60}
            height={60}
          />{' '}
          {price}
        </div>
      </div>
      <Button additionalClassName="gold" text="Buy" link={`/nfts/${id}`} />
    </div>
  );
};

export default NftCard;
