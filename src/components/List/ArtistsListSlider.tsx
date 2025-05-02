'use client';
import ArtistCard from '../Card/ArtistCardSlider';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SwiperArrows from './subComponents/SwiperArrows';
import { ArtistType } from '@/types';
import { Autoplay, Pagination } from 'swiper/modules';

interface ArtistsListSliderProps {
  artists: ArtistType[];
  title: string;
}

const ArtistsListSlider = ({ artists, title }: ArtistsListSliderProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<any>(null);

  return (
    <section className="mt-[100px] md:mt-[60px]">
      <h1 className="inline-block font-semibold font-montserrat text-[36px] sm:text-[24px] py-[25px] border-b-[3px] border-[#b39e73] mb-[35px]">
        {title}
      </h1>
      <div className="overflow-hidden w-full transition-all duration-500 ease">
        <Swiper
          // autoplay={{delay: 6000}}
          modules={[Autoplay, Pagination]}
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
            className="flex justify-end mt-[50px] ml-auto sm:mt-[15px]"
            artistsLength={artists.length}
            activeSlide={activeSlide}
          />
        </Swiper>
      </div>
    </section>
  );
};

export default ArtistsListSlider;
