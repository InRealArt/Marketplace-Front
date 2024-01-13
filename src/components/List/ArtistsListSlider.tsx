'use client';
import { Artist } from '@/mocks/types';
import ArtistCard from '../Card/ArtistCardSlider';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SwiperArrows from './subComponents/SwiperArrows';

interface ArtistsListSliderProps {
  artists: Artist[];
  title: string;
}

const ArtistsListSlider = ({ artists, title }: ArtistsListSliderProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<any>(null);

  return (
    <section className="ArtistsListSlider">
      <h1 className="ArtistsListSlider__title">{title}</h1>
      <div className="ArtistsListSlider__container">
        <Swiper
          spaceBetween={20}
          slidesPerView={2}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) =>
            setActiveSlide(swiper.isEnd ? artists.length : swiper.activeIndex)
          }
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1023: {
              slidesPerView: 3,
            },
            1279: {
              slidesPerView: 4,
            },
          }}
        >
          {artists.map((artist) => (
            <SwiperSlide key={artist.id}>
              <ArtistCard artist={artist} />
            </SwiperSlide>
          ))}

          <SwiperArrows
            className="ArtistsListSlider"
            artistsLength={artists.length}
            activeSlide={activeSlide}
          />
        </Swiper>
      </div>
    </section>
  );
};

export default ArtistsListSlider;
