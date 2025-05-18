'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import ShareModal from '@/components/Modal/ShareModal';
import dynamic from 'next/dynamic';
import { ItemPhysicalType } from '@/types';
import { ArrowBigLeft, ArrowBigRight, Share2, StarsIcon, Eye, Flame } from 'lucide-react';
import { useViewCounter } from '@/hooks/useViewCounter';

// Import Swiper React components and CSS
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import ArtworkThumbnailSlider from './ArtworkPreviewSlider';
import ArtworkMainImage from './ArtworkMainImage';


interface ArtworkGalleryProps {
  nft: ItemPhysicalType
}

const ArtworkGallery = ({ nft }: ArtworkGalleryProps) => {
  const { mainImageUrl, secondaryImagesUrl } = nft.Item || {};
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const images = secondaryImagesUrl ? [mainImageUrl, ...secondaryImagesUrl] : [mainImageUrl];

  return (
    <div className="relative row-auto md:row-span-3 rounded-[10px] flex flex-col md:flex-row gap-3  h-full max-h-[75vh]">
      {/* Thumbnail Vertical Slider */}
      <ArtworkThumbnailSlider
        nft={nft}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        images={images}
      />

      {/* Main Image */}
      <ArtworkMainImage
        nft={nft}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        images={images}
      />
    </div>
  );
};

export default ArtworkGallery;
