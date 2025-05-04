'use client';
import React, { useState } from 'react';
import Button from '@/components/Button/Button';
import { NftType } from '@/types';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';

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
  const { addToCart } = useCart();

  const getCurrentPrice = () => {
    const option = PRICE_OPTIONS.find(opt => opt.value === activeOption);
    const price = option ? nft[option.priceKey] : 0;
    return typeof price === 'number' ? price : 0;
  };

  const handleAddToCart = async () => {
    const result = await addToCart(nft, activeOption);
    
    if (result.success) {
      toast.success(`${nft.name} added to cart`);
    } else if (result.error) {
      toast.error(result.error);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-gradient-to-b from-[rgba(30,30,30,0.5)] to-[rgba(20,20,20,0.8)] rounded-[8px] border border-[rgba(255,255,255,0.1)] shadow-[0_4px_20px_rgba(0,0,0,0.25)] backdrop-blur-[5px]">
      <div className="flex gap-3 justify-center flex-wrap">
        {PRICE_OPTIONS.map((option) => (
          <Button
            key={option.value}
            text={option.label}
            action={() => setActiveOption(option.value)}
            additionalClassName={activeOption === option.value ? 'gold' : 'whiteBorder'}
            disabled={option.disabled}
          />
        ))}
      </div>
      <div className="flex items-center gap-4 bg-[rgba(0,0,0,0.2)] p-4 rounded-[8px]">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-[rgba(255,255,255,0.7)]">
            {PRICE_OPTIONS.find(opt => opt.value === activeOption)?.label}
          </p>
          <p className="text-sm text-[rgba(255,255,255,0.7)]">{getCurrentPrice()} euros</p>
        </div>
      </div>
      <div className="flex gap-4 mt-2">
        <Button
          text='Buy now'
          link={`/artworks/${nft.slug}`}
          additionalClassName='gold'
          className='flex-1'
        />
        <Button
          text='Add to cart'
          action={handleAddToCart}
          additionalClassName='whiteBorder'
          className='flex-1'
        />
      </div>
    </div>
  );
};

export default NftPrice;
