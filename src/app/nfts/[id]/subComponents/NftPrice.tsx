'use client';
import React, { useState } from 'react';
import { Nft } from '@/mocks/types';
import Image from 'next/image';
import Button from '@/components/Button/Button';
import BuyModal from '@/components/Modal/BuyModal';

const NftPrice = (props: Partial<Nft>) => {
  const { price } = props;
  const [showBuyModal, setShowBuyModal] = useState<boolean>(false);
  return (
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
        <Button
          action={() => setShowBuyModal(true)}
          text="Buy now"
          additionalClassName="gold"
        />
        <Button text="Make offer" additionalClassName="goldBorder" />
        <BuyModal
          {...props}
          showBuyModal={showBuyModal}
          setShowBuyModal={setShowBuyModal}
        />
      </div>
    </div>
  );
};

export default NftPrice;
