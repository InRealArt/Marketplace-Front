'use client';
import React, { useEffect, useRef, useState } from 'react';
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


interface ArtworkThumbnailSliderProps {
  nft: ItemPhysicalType
  currentImageIndex: number
  setCurrentImageIndex: (index: number) => void
  images: string[]
}

const SLIDER_HEIGHT = 88;

const ArtworkThumbnailSlider = ({ nft, currentImageIndex, setCurrentImageIndex, images }: ArtworkThumbnailSliderProps) => {
  const { name } = nft.item || {};
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile on initial render and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on mount
    checkIfMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // Scroll to the current thumbnail
  useEffect(() => {
    if (!sliderRef.current) return;
    
    sliderRef.current.scrollTo({
      // For mobile: scroll horizontally (left), for desktop: scroll vertically (top)
      ...(isMobile 
        ? { left: (currentImageIndex * SLIDER_HEIGHT) } 
        : { top: (currentImageIndex * SLIDER_HEIGHT) }),
      behavior: 'smooth',
    });
  }, [currentImageIndex, isMobile]);
  
  return (
    <div
      ref={sliderRef}
      className="h-[100px] lg:h-full lg:w-[100px] overflow-scroll mt-2 max-h-[75vh] lg:flex lg:flex-col gap-2 items-center pl-2 lg:pl-0 pt-2 whitespace-nowrap no-scrollbar"
    >
      {images.map((img, index) => (
        <div
          key={`thumbnail-${index}`}
          className={`cursor-pointer inline-block mr-2 lg:mr-0`}
          onClick={() => setCurrentImageIndex(index)}
        >
          <Image
            src={img || ''}
            alt={`${name} thumbnail ${index + 1}`}
            width={80}
            height={80}
            className={`object-cover rounded-[6px] w-[80px] h-[80px] ${index === currentImageIndex ? 'ring-2 ring-amber-500' : ''}`}
          />
        </div>
      ))}
    </div>
  );
};

export default ArtworkThumbnailSlider;
