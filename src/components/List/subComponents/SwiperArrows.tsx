'use client';
import Image from 'next/image';
import { useSwiper } from 'swiper/react';

interface SwiperArrowsProps {
  className: string;
  artistsLength: number;
  activeSlide: number;
}

const SwiperArrows = ({
  className,
  artistsLength,
  activeSlide,
}: SwiperArrowsProps) => {
  const swiper = useSwiper();
  const leftDisabled: boolean = activeSlide <= 0;
  const rightDisabled: boolean = activeSlide >= artistsLength - 1;

  return (
    <div className={`${className}__arrows`}>
      <Image
        onClick={() => swiper.slidePrev()}
        priority={true}
        className={`${className}__arrow ${className}__arrow--left ${
          leftDisabled && `${className}__arrow--disabled`
        }`}
        alt="arrow"
        src={`${
          leftDisabled ? '/icons/ArrowDisabled.png' : '/icons/Arrow.png'
        }`}
        width={71}
        height={38}
      />
      <Image
        onClick={() => swiper.slideNext()}
        priority={true}
        className={`${className}__arrow ${
          rightDisabled && `${className}__arrow--disabled`
        }`}
        alt="arrow"
        src={`${
          rightDisabled ? '/icons/ArrowDisabled.png' : '/icons/Arrow.png'
        }`}
        width={71}
        height={38}
      />
    </div>
  );
};

export default SwiperArrows;
