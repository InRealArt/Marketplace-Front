'use client';
import React from 'react';
import Button from '@/components/Button/Button';
import { ItemPhysicalType, PriceOption } from '@/types';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';
import { useModalStore } from '@/store/modalStore';

interface ArtworkPriceProps {
  artwork: ItemPhysicalType
}


const ArtworkPrice = ({ artwork }: ArtworkPriceProps) => {
  const { addToCart } = useCart();
  const { openCart } = useModalStore();


  const handleAddToCart = async () => {
    openCart();
    const result = await addToCart(artwork);

    if (result.success) {
      toast.success(`${artwork.item.name} added to cart`);
    } else if (result.error) {
      toast.error(result.error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center gap-6">
        <div>
          <p className="text-sm">Total price</p>
          <p className="text-sm text-[rgba(255,255,255,0.7)]">{artwork.price} €*</p>
        </div>

      </div>
      <div className='flex justify-between gap-2'>
        {artwork.stockQty > 0 ? <>
          <Button
            text='Buy now'
            action={handleAddToCart}
            additionalClassName='medium purple'
            className='flex-1'
          />
        </> :
          <Button
            text='Sold out'
            additionalClassName='medium disabled '
            className='flex-1'
          />}
        <Button
          text='Make an offer'
          action={() => { }}
          additionalClassName={`medium whiteBorder ${artwork.stockQty > 0 ? '' : 'disabled'}`}
          className='flex-1'
        />
      </div>

      <p className="mt-2 text-xs text-[rgba(255,255,255,0.7)]">*Tax included</p>
    </div>
  );
};

export default ArtworkPrice;
