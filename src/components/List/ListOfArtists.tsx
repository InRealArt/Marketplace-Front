'use client';
import { Artist } from '@/mocks/types';
import ArtistCard from '../Card/ArtistCard';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SwiperArrows from './subComponents/SwiperArrows';

interface ListOfArtistsProps {
  artists: Artist[];
}

const ListOfArtists = ({ artists }: ListOfArtistsProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<any>(null);

  return (
    <section className="ListOfArtists">
      <h1 className="ListOfArtists__title">Artistes du moments</h1>
      <div className="ListOfArtists__container">
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
            1023: {
              slidesPerView: 3,
              spaceBetween: 200,
            },
            1279: {
              slidesPerView: 3,
              spaceBetween: -180,
            },
          }}
        >
          {artists.map((artist) => (
            <SwiperSlide key={artist.id}>
              <ArtistCard artist={artist} />
            </SwiperSlide>
          ))}

          <SwiperArrows
            className="ListOfArtists"
            artistsLength={artists.length}
            activeSlide={activeSlide}
          />
        </Swiper>
      </div>
    </section>
  );
};

export default ListOfArtists;
