'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import ShareModal from '@/components/Modal/ShareModal';
import dynamic from 'next/dynamic';
import { ItemPhysicalType } from '@/types';
import { ArrowBigLeft, ArrowBigRight, Share2, StarsIcon, Eye, Flame } from 'lucide-react';
import { useViewCounter } from '@/hooks/useViewCounter';



interface ArtworkMainImageProps {
  nft: ItemPhysicalType
  currentImageIndex: number
  setCurrentImageIndex: (index: number) => void
  images: string[]
}

const ArtworkMainImage = ({ nft, currentImageIndex, setCurrentImageIndex, images }: ArtworkMainImageProps) => {
  const { name, realViewCount, fakeViewCount } = nft.Item || {};

  // Use the view counter hook
  const { displayViewCount, isPopular } = useViewCounter(
    nft.Item?.id,
    realViewCount || 0,
    fakeViewCount || 0
  );

  return (
    <div
      className="relative flex-1 rounded-[10px] bg-no-repeat bg-[80%_auto] bg-center bg-black h-full"
      style={{
        backgroundImage: `url('${images[currentImageIndex]}')`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
      }}
    >
      {/* View counter */}
      <div className="absolute left-[25px] top-[25px] inline-flex gap-2 p-[13px_15px] items-center rounded-[10px] border border-white bg-[rgba(255,255,255,0.3)] backdrop-blur-[26px] text-[14px]">
        <p className="flex m-0 gap-[10px] items-center">
          {isPopular ? (
            <Flame width={20} height={20} className="text-amber-500" />
          ) : (
            <Eye width={20} height={20} />
          )}
          <span>{displayViewCount.toLocaleString()}</span>
          <span className="text-xs opacity-70">Views on this artwork</span>
        </p>
      </div>

      {/* Navigation arrows for main image on mobile */}
      {currentImageIndex !== 0 && (
        <ArrowBigLeft
          className="md:hidden cursor-pointer w-[50px] h-[50px] absolute top-1/2 -translate-y-1/2 left-[10px]"
          onClick={() => setCurrentImageIndex(currentImageIndex - 1)}
        />
      )}
      {currentImageIndex + 1 !== images.length && (
        <ArrowBigRight
          className="md:hidden cursor-pointer w-[50px] h-[50px] absolute top-1/2 -translate-y-1/2 right-[10px]"
          onClick={() => setCurrentImageIndex(currentImageIndex + 1)}
        />
      )}

      {/* Share button */}
      <ShareModal
        url={`/artworks/${nft.Item.slug}`}
        title={name || 'Check out this amazing artwork'}
      >
        <div className="absolute right-[25px] top-[25px] inline-flex gap-5 p-[13px_15px] items-center rounded-[10px] border border-white bg-[rgba(255,255,255,0.3)] backdrop-blur-[26px] text-[14px] cursor-pointer hover:bg-[rgba(255,255,255,0.4)] transition-colors">
          <p className="flex m-0 gap-[10px]">
            <Share2 width={20} height={20} /> Share
          </p>
        </div>
      </ShareModal>

      <div className="absolute left-[25px] bottom-[25px] p-[13px_15px] rounded-[10px] border border-white bg-[rgba(49,49,48,0.3)] backdrop-blur-[26px] text-[14px] flex items-center gap-[5px]">
        <StarsIcon width={18} height={18} />IRA exclusive
      </div>
    </div>
  );
};

export default ArtworkMainImage;
