'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button/Button';
import { NftType } from '@/types';
import { Address } from 'viem';
import { useAppSelector } from '@/redux/hooks';
import { getArtistByNft } from '@/redux/reducers/artists/selectors';

interface NftPriceProps {
  nft: NftType
}

enum PriceOption {
  NFT = 'nft',
  PHYSICAL = 'physical',
  NFT_PLUS_PHYSICAL = 'nftPlusPhysical'
}

interface PriceOptionConfig {
  value: PriceOption;
  label: string;
  priceKey: keyof NftType;
  disabled?: boolean;
}

const PRICE_OPTIONS: PriceOptionConfig[] = [
  {
    value: PriceOption.PHYSICAL,
    label: 'Physical Only',
    priceKey: 'pricePhysicalBeforeTax'
  },
  {
    value: PriceOption.NFT,
    label: 'NFT Only',
    priceKey: 'priceNftBeforeTax',
    disabled: true
  },
  {
    value: PriceOption.NFT_PLUS_PHYSICAL,
    label: 'NFT + Physical',
    priceKey: 'priceNftPlusPhysicalBeforeTax',
    disabled: true
  }
];

const NftPrice = ({ nft }: NftPriceProps) => {
  const [activeOption, setActiveOption] = useState<PriceOption>(PriceOption.PHYSICAL);

  const getCurrentPrice = () => {
    const option = PRICE_OPTIONS.find(opt => opt.value === activeOption);
    const price = option ? nft[option.priceKey] : 0;
    return typeof price === 'number' ? price : 0;
  };

  return (
    <div className="Nft__price">
      <div className="Nft__price__options">
        {PRICE_OPTIONS.map((option) => (
          <Button
            key={option.value}
            text={option.label}
            action={() => setActiveOption(option.value)}
            additionalClassName={activeOption === option.value ? 'gold' : 'secondary'}
            disabled={option.disabled}
          />
        ))}
      </div>
      <div className="Nft__price__content">
        <div className="Nft__price__details">
          <p className="Nft__price__label">
            {PRICE_OPTIONS.find(opt => opt.value === activeOption)?.label}
          </p>
          <p className="Nft__price__label">{getCurrentPrice()} euros</p>
        </div>
      </div>
      <div className="Nft__price__actions">
        <Button
          text='Buy now'
          link={`/artworks/${nft.slug}`}
          additionalClassName='gold'
          activeClassName='large'
        />
        <Button
          text='Add to cart'
          link={`/artworks/${nft.slug}`}
          additionalClassName='secondary'
          activeClassName='large'
        />
      </div>
    </div>
  );
};

export default NftPrice;
