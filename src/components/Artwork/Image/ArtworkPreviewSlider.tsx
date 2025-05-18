'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import ShareModal from '@/components/Modal/ShareModal';
import dynamic from 'next/dynamic';
import {  ItemPhysicalType } from '@/types';
import { ArrowBigLeft, ArrowBigRight, Share2, StarsIcon, Eye, Flame } from 'lucide-react';
import { useViewCounter } from '@/hooks/useViewCounter';

// Import Swiper React components and CSS
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';


interface ArtworkThumbnailSliderProps {
  nft: ItemPhysicalType
  currentImageIndex: number
  setCurrentImageIndex: (index: number) => void
  images: string[]  
}

const ArtworkThumbnailSlider = ({ nft, currentImageIndex, setCurrentImageIndex, images }: ArtworkThumbnailSliderProps) => {
  const { name } = nft.Item || {};
  
  return (
        <div className="md:w-[100px] h-full overflow-scroll">
          <Swiper
            direction="vertical"
            spaceBetween={10}
            slidesPerView="auto"
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation]}
            className="h-full thumbnails-swiper"
          >
            {images.map((img, index) => (
              <SwiperSlide key={`thumb-${index}`} className="!h-auto cursor-pointer">
                <div 
                  className={`w-[80px] h-[80px] rounded-[6px] overflow-hidden ${index === currentImageIndex ? 'ring-2 ring-amber-500' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image 
                    src={img || ''} 
                    alt={`${name} thumbnail ${index + 1}`} 
                    width={80} 
                    height={80} 
                    className="object-cover w-full h-full"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
  );
};

export default ArtworkThumbnailSlider;
