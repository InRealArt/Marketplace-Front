'use client';
import React, { useRef, useState } from 'react';
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
  const mainSwiperRef = useRef<any>(null);

  // Filter out null values from images array
  const images = secondaryImagesUrl 
    ? [mainImageUrl, ...secondaryImagesUrl].filter((img): img is string => img !== null) 
    : mainImageUrl ? [mainImageUrl] : [];

  // Function to handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
    // If we have the swiper instance, use it to navigate to the selected slide
    if (mainSwiperRef.current) {
      mainSwiperRef.current.slideTo(index);
    }
  };

  return (
    <div className="w-full md:w-[60%] relative rounded-[10px] flex flex-col md:flex-row gap-2 h-auto md:h-[75vh]">
      {/* Thumbnail Vertical Slider */}
      <ArtworkThumbnailSlider
        nft={nft}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={handleThumbnailClick}
        images={images}
      />

      {/* Main Image */}
      <ArtworkMainImage
        nft={nft}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        images={images}
        onSwiperInit={(swiper) => mainSwiperRef.current = swiper}
      />
    </div>
  );
};

export default ArtworkGallery;
