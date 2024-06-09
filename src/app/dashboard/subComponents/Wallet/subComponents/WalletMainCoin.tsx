import Image from 'next/image';
import React from 'react';

interface WalletMainCoinProps {
  name: string;
  quantity: string;
  totalValue: number;
}
const WalletMainCoin = ({
  name,
  quantity,
  totalValue,
}: WalletMainCoinProps) => {
  return (
    <section className="WalletMainCoin">
      <Image
        className="WalletMainCoin__image"
        priority={true}
        alt="My NFT"
        src="/icons/Etheru.svg"
        width={48}
        height={48}
      />
      <div className="WalletMainCoin__infos">
        <h2>{name}</h2>
        <p>{quantity}</p>
      </div>

      <h2 className="WalletMainCoin__totalValue">{totalValue.toString()} €</h2>
    </section>
  );
};

export default WalletMainCoin;
