'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import ShareModal from '@/components/Modal/ShareModal';
import ZoomGalleryModal from '@/components/Modal/ZoomGalleryModal';
import dynamic from 'next/dynamic';
import { ItemPhysicalType } from '@/types';
import { ArrowBigLeft, ArrowBigRight, Share2, StarsIcon, Eye, Flame, View } from 'lucide-react';
import { useViewCounter } from '@/hooks/useViewCounter';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

interface ArtworkMainImageProps {
  nft: ItemPhysicalType
  currentImageIndex: number
  setCurrentImageIndex: (index: number) => void
  images: string[]
  onSwiperInit?: (swiper: any) => void
}

const ArtworkMainImage = ({ nft, currentImageIndex, setCurrentImageIndex, images, onSwiperInit }: ArtworkMainImageProps) => {
  const { name, realViewCount, fakeViewCount } = nft.Item || {};
  // Use the view counter hook
  const { displayViewCount, isPopular } = useViewCounter(
    nft.Item?.id,
    realViewCount || 0,
    fakeViewCount || 0
  );

  const swiperRef = useRef<any>(null);
  const [showZoomGallery, setShowZoomGallery] = useState(false);

  return (
    <div className="w-full md:w-[calc(100%-100px)] h-full ">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          if (onSwiperInit) onSwiperInit(swiper);
        }}
        onSlideChange={(swiper) => {
          const index = swiper.isEnd ? images.length - 1 : swiper.activeIndex;
          setCurrentImageIndex(index);
        }}
        className='w-full h-[calc(100%-60px)]'
      >

        {images.map(image => (
          <SwiperSlide key={`main-slide-${image}`}>
            <div
              className="relative rounded-[10px] w-full h-full bg-no-repeat bg-[80%_auto] bg-center bg-black min-h-[500px]"
              style={{
                backgroundImage: `url('${image}')`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
              }}
            >
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="w-full flex gap-2 mt-2 justify-center">
        <p className="flex m-0 gap-[10px] p-[13px_15px] items-center rounded-[10px] border border-white bg-[rgba(255,255,255,0.3)] backdrop-blur-[26px] text-[14px]">
          {isPopular ? (
            <Flame width={20} height={20} className="text-amber-500" />
          ) : (
            <Eye width={20} height={20} />
          )}
          <span>{displayViewCount.toLocaleString()}</span>
          <span className="text-xs opacity-70">Views on this artwork</span>
        </p>

        <p
          onClick={() => setShowZoomGallery(true)}
          className="flex m-0 gap-[10px] p-[13px_15px] items-center rounded-[10px] border border-white bg-[rgba(255,255,255,0.3)] backdrop-blur-[26px] text-[14px] cursor-pointer hover:bg-[rgba(255,255,255,0.4)] transition-colors"
        >
          <View width={20} height={20} /> View all images
        </p>
        <ShareModal
          url={`/artworks/${nft.Item.slug}`}
          title={name || 'Check out this amazing artwork'}
        >
          <p className="flex m-0 gap-[10px] p-[13px_15px] items-center rounded-[10px] border border-white bg-[rgba(255,255,255,0.3)] backdrop-blur-[26px] text-[14px] cursor-pointer hover:bg-[rgba(255,255,255,0.4)] transition-colors">
            <Share2 width={20} height={20} /> Share
          </p>
        </ShareModal>
      </div>

      {/* Zoom Gallery Modal */}
      <ZoomGalleryModal
        show={showZoomGallery}
        hide={() => setShowZoomGallery(false)}
        images={images}
        initialSlide={currentImageIndex}
        title={name || 'Artwork Gallery'}
      />
    </div>
  );
};

export default ArtworkMainImage;
