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
        <Button
          text='Make an offer'
          action={() => { }}
          additionalClassName='whiteBorder'
          className='flex-1'
        />
      </div>
      {artwork.stockQty > 0 ? <>
        <Button
          text='Buy now'
          action={handleAddToCart}
          additionalClassName='purple'
          className='flex-1'
        />
      </> :
        <Button
          text='Sold out'
          additionalClassName='disabled'
          className='flex-1'
        />}
        <p className="mt-2 text-xs text-[rgba(255,255,255,0.7)]">*Tax included</p>
    </div>
  );
};

export default ArtworkPrice;
