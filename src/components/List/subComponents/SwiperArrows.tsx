'use client';
import { MoveLeft, MoveRight } from 'lucide-react';
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
      <MoveLeft
        onClick={() => swiper.slidePrev()}
        className={`${className}__arrow ${
          leftDisabled && `${className}__arrow--disabled`
        }`}
        width={100}
        height={80}
      />
      <MoveRight
        onClick={() => swiper.slideNext()}
        className={`${className}__arrow ${
          rightDisabled && `${className}__arrow--disabled`
        }`}
        width={100}
        height={80}
      />
    </div>
  );
};

export default SwiperArrows;
