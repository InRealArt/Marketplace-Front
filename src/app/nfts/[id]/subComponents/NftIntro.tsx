import React from 'react';
import NftImage from '../../../../../public/images/NftBig.png';
import ArtistImage from '../../../../../public/images/ArtistMiniature.png';
import { Nft } from '@/mocks/types';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Button/Button';

interface NftIntroProps {
  name: Nft['name'] | undefined;
  likes: Nft['likes'] | undefined;
  price: Nft['price'] | undefined;
  description: Nft['description'] | undefined;
  artist: Nft['artist'] | undefined;
}
const NftIntro = ({
  name,
  likes,
  price,
  description,
  artist,
}: NftIntroProps) => {
  return (
    <section className="Nft__intro">
      <div
        className="Nft__image"
        style={{
          backgroundImage: ` url('${NftImage.src}')`,
        }}
      >
        <div className="Nft__actions">
          <p className="Nft__action">Share</p>
          <p className="Nft__action">{likes} likes</p>
        </div>

        <div className="Nft__label">IRA communautaire</div>
      </div>
      <div className="Nft__infos">
        <div className="Nft__artist">
          <div
            className="Nft__artist__image"
            style={{
              backgroundImage: ` url('${ArtistImage.src}')`,
            }}
          />
          <div className="Nft__artist__name">
            <Link href={`/artists/${artist?.id}`}>{artist?.name}</Link>
            <h3>{name}</h3>
          </div>
        </div>
        <div className="Nft__description">
          <h3 className="Nft__description__title">Description</h3>
          <p className="Nft__description__text">{description}</p>
        </div>
      </div>
      <div className="Nft__price">
        <div className="Nft__price__content">
          <Image
            priority={true}
            className="Nft__ethLogo"
            alt="ETH logo"
            src="/icons/EtherWhite.png"
            width={34}
            height={34}
          />
          <p className="Nft__ethPrice">{price} ETH</p>
        </div>
        <div className="Nft__price__btns">
          <Button text="Buy now" additionalClassName="gold" />
          <Button text="Make offer" additionalClassName="goldBorder" />
        </div>
      </div>
    </section>
  );
};

export default NftIntro;
