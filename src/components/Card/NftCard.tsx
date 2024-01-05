import { Nft } from '@/mocks/types';
import Button from '../Button/Button';
import NftImage from '../../../public/images/Nft.png';
import React from 'react';
import Image from 'next/image';

interface NftCardProps {
  nft: Nft;
}

const NftCard = ({ nft }: NftCardProps) => {
  const { id, title, tag, price, likes } = nft;
  return (
    <div className="NftCard">
      <div
        className="NftCard__background"
        style={{
          backgroundImage: ` url('${NftImage.src}')`,
        }}
      >
        <div className="NftCard__likes">
          <Image
            className=""
            priority={true}
            alt="heart"
            src="/icons/Heart.png"
            width={23}
            height={23}
          />{' '}
          <span>{likes} likes</span>
        </div>
      </div>
      <div className="NftCard__infos">
        <div>
          <p className="NftCard__tag">{tag}</p>
          <h2 className="NftCard__title">{title}</h2>
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
      <Button additionalClassName="gold" text="Buy" link={`/nft/${id}`} />
    </div>
  );
};

export default NftCard;
