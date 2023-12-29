'use client';
import { Artist } from '@/mocks/types';
import ArtistCard from '../Card/ArtistCard';
import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';

interface ListOfArtistsProps {
  artists: Artist[];
}

const CARD_WIDTH = 380;
const CARD_GAP = 20;
const SLIDER_MAX_WIDTH = 1380;

const ListOfArtists = ({ artists }: ListOfArtistsProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const cardRef = useRef<any>(null);
  const cardWidth: number =
    (cardRef.current?.clientWidth || CARD_WIDTH) + CARD_GAP;
  const sliderWidth: number = artists.length * cardWidth;

  const leftDisabled: boolean = activeSlide <= 0;
  const rightDisabled: boolean = activeSlide >= artists.length - 1;

  return (
    <section className="ListOfArtists">
      <h1 className="ListOfArtists__title">Artistes du moments</h1>
      <div className="ListOfArtists__container">
        <div
          className="ListOfArtists__items"
          style={{
            transform: `translateX(-${cardWidth * activeSlide}px)`,
            width: sliderWidth,
          }}
        >
          {artists.map((artist) => (
            <ArtistCard ref={cardRef} key={artist.id} artist={artist} />
          ))}
        </div>
      </div>
      <div className="ListOfArtists__arrows">
        <Image
          onClick={() => setActiveSlide(activeSlide - 1)}
          priority={true}
          className={`ListOfArtists__arrow ListOfArtists__arrow--left ${
            leftDisabled && 'ListOfArtists__arrow--disabled'
          }`}
          alt="arrow"
          src={`${
            leftDisabled ? '/icons/ArrowDisabled.png' : '/icons/Arrow.png'
          }`}
          width={71}
          height={38}
        />
        <Image
          onClick={() => setActiveSlide(activeSlide + 1)}
          priority={true}
          className={`ListOfArtists__arrow ${
            rightDisabled && 'ListOfArtists__arrow--disabled'
          }`}
          alt="arrow"
          src={`${
            rightDisabled ? '/icons/ArrowDisabled.png' : '/icons/Arrow.png'
          }`}
          width={71}
          height={38}
        />
      </div>
    </section>
  );
};

export default ListOfArtists;
