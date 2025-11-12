'use client'
import React, { useRef } from 'react'
import { ItemPhysicalType } from '@/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

import { ZoomIn } from 'lucide-react'

interface ArtworkMainImageProps {
  setCurrentImageIndex: (index: number) => void
  images: string[]
  onSwiperInit?: (swiper: any) => void
}

const ArtworkMainImage = ({
  setCurrentImageIndex,
  images,
  onSwiperInit,
}: ArtworkMainImageProps) => {
  const swiperRef = useRef<any>(null)

  return (
    <div className="relative w-full lg:w-[calc(100%-100px)] h-full min-h-[500px]">
      <Swiper
        navigation
        modules={[Navigation]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
          if (onSwiperInit) onSwiperInit(swiper)
        }}
        onSlideChange={(swiper) => {
          const index = swiper.activeIndex ?? 0
          setCurrentImageIndex(index)
        }}
        className="w-full h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={`main-slide-${index}-${image}`}>
            <div
              className="relative rounded-[10px] w-full h-full bg-no-repeat bg-[80%_auto] bg-center min-h-[500px]"
              style={{
                backgroundImage: `url('${image}')`,
                backgroundSize: 'contain',
                backgroundPosition: 'center'
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ArtworkMainImage
