'use client'
import React, { useMemo, useRef, useState } from 'react'
import { ItemPhysicalType } from '@/types'
import ArtworkThumbnailSlider from './ArtworkPreviewSlider'
import ArtworkMainImage from './ArtworkMainImage'
import ArtworkGalleryTabs, { ArtworkGalleryTab } from './ArtworkGalleryTabs'
import ZoomGalleryModal from '@/components/Modal/ZoomGalleryModal'

interface ArtworkGalleryProps {
  artwork: ItemPhysicalType
}

const ArtworkGallery = ({ artwork }: ArtworkGalleryProps) => {
  const { mainImageUrl, secondaryImagesUrl } = artwork.item || {}
  const [activeTab, setActiveTab] = useState<ArtworkGalleryTab>('artwork')
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [showZoomGallery, setShowZoomGallery] = useState(false)
  const mainSwiperRef = useRef<any>(null)

  const artworkImages = useMemo(() => {
    const base = secondaryImagesUrl
      ? [mainImageUrl, ...secondaryImagesUrl]
      : mainImageUrl
        ? [mainImageUrl]
        : []
    return base.filter((img): img is string => Boolean(img))
  }, [mainImageUrl, secondaryImagesUrl])

  const mockupImages = useMemo(
    () => [
      '/images/mock/artist/ekaterina-background.avif',
      '/images/Boucheix/artist1.4.jpg',
      '/images/Leloluce/artist3.6.jpg'
    ],
    []
  )

  const currentImages = activeTab === 'artwork' ? artworkImages : mockupImages

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index)
    if (mainSwiperRef.current) {
      mainSwiperRef.current.slideTo(index)
    }
  }

  const handleTabChange = (tab: ArtworkGalleryTab) => {
    if (tab === activeTab) return
    setActiveTab(tab)
    setCurrentImageIndex(0)
    if (mainSwiperRef.current) {
      mainSwiperRef.current.slideTo(0)
    }
  }

  return (
    <>
      <ArtworkGalleryTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onZoom={() => setShowZoomGallery(true)}
      />

      <div className="w-full relative rounded-[10px] flex flex-col-reverse lg:flex-row gap-2 h-auto lg:h-[75vh]">
        <ArtworkThumbnailSlider
          artwork={artwork}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={handleThumbnailClick}
          images={currentImages}
        />

        <ArtworkMainImage
          setCurrentImageIndex={setCurrentImageIndex}
          images={currentImages}
          onSwiperInit={(swiper) => (mainSwiperRef.current = swiper)}
        />
      </div>

      <ZoomGalleryModal
        show={showZoomGallery}
        hide={() => setShowZoomGallery(false)}
        images={currentImages}
        initialSlide={currentImageIndex}
        title={artwork.item?.name || 'Artwork Gallery'}
      />
    </>
  )
}

export default ArtworkGallery
