'use client';
import { MoveLeft, MoveRight } from 'lucide-react';
import { useSwiper } from 'swiper/react';

interface SwiperArrowsProps {
  className?: string;
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
    <div className={className}>
      <MoveLeft
        onClick={() => swiper.slidePrev()}
        className={`cursor-pointer sm:w-[40px] sm:h-auto ${
          leftDisabled ? 'pointer-events-none text-[#a7a7a7]' : ''
        }`}
        width={100}
        height={80}
      />
      <MoveRight
        onClick={() => swiper.slideNext()}
        className={`cursor-pointer sm:w-[40px] sm:h-auto ${
          rightDisabled ? 'pointer-events-none text-[#a7a7a7]' : ''
        }`}
        width={100}
        height={80}
      />
    </div>
  );
};

export default SwiperArrows;
