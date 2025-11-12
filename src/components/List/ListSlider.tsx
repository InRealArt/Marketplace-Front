'use client'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import SwiperArrows from './subComponents/SwiperArrows'
import ArtistCard from '../Card/ArtistCardSlider'
import ArtworkCard from '../Card/ArtworkCard'
import { ArtistWithRelations, ItemPhysicalType } from '@/types'
import Container from '@/components/Common/Container'

type SliderContext = 'artist' | 'artwork'

interface ListSliderProps {
  context: SliderContext
  title: string
  backgroundColor?: string
  artists?: ArtistWithRelations[]
  artworks?: ItemPhysicalType[]
}

const ListSlider = ({
  context,
  title,
  artists = [],
  artworks = [],
  backgroundColor = ''
}: ListSliderProps) => {
  const [canGoPrev, setCanGoPrev] = useState(false)
  const [canGoNext, setCanGoNext] = useState(true)

  const items = context === 'artist'
    ? artists
    : artworks.map(artwork => ({
      ...artwork,
      item: {
        ...artwork.item,
        idUser: artwork.item.idUser ?? 0,
        metaDescription: artwork.item.metaDescription ?? '',
        metaTitle: artwork.item.metaTitle ?? '',
        realViewCount: artwork.item.realViewCount ?? 0,
        fakeViewCount: artwork.item.fakeViewCount ?? 0,
        featured: (artwork.item as any).featured ?? false,
        artistId: (artwork.item as any).artistId ?? 0,
        mediumId: artwork.item.mediumId ?? null,
        styleId: artwork.item.styleId ?? null,
        techniqueId: artwork.item.techniqueId ?? null,
        createdAt: artwork.item.createdAt ?? null
      }
    }))

  if (items.length === 0) {
    return null
  }

  return (
    <section className={`mt-[60px] py-[15px] ${backgroundColor}`}>
      <Container>
        <h2 className="inline-block font-semibold font-montserrat text-[28px] sm:text-[22px] pb-2 mb-[24px]">
          {title}
        </h2>
        <div className="overflow-hidden w-full transition-all duration-500 ease">
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1.2}
            slidesPerGroup={1}
            grabCursor
            onSwiper={(swiper) => {
              setCanGoPrev(!swiper.isBeginning)
              setCanGoNext(!swiper.isEnd)
            }}
            onSlideChange={(swiper) =>
              {
                setCanGoPrev(!swiper.isBeginning)
                setCanGoNext(!swiper.isEnd)
              }
            }
            breakpoints={{
              768: {
                slidesPerView: 2,
                slidesPerGroup: 2
              },
              1024: {
                slidesPerView: 3,
                slidesPerGroup: 3
              },
              1440: {
                slidesPerView: 4,
                slidesPerGroup: 4
              }
            }}
          >
            {items.map((item, index) => (
              <SwiperSlide key={`${context}-${index}-${'id' in item ? item.id : index}`}>
                {context === 'artist' ? (
                  <ArtistCard artist={item as ArtistWithRelations} />
                ) : (
                  <ArtworkCard artwork={item as ItemPhysicalType} />
                )}
              </SwiperSlide>
            ))}

            <SwiperArrows
              className="flex justify-end mt-[40px] ml-auto sm:mt-[20px]"
              canGoPrev={canGoPrev}
              canGoNext={canGoNext}
            />
          </Swiper>
        </div>
      </Container>
    </section>
  )
}

export default ListSlider

