'use client';
import { MoveLeft, MoveRight } from 'lucide-react';
import { useSwiper } from 'swiper/react';

interface SwiperArrowsProps {
  className?: string
  canGoPrev: boolean
  canGoNext: boolean
}

const SwiperArrows = ({
  className,
  canGoPrev,
  canGoNext
}: SwiperArrowsProps) => {
  const swiper = useSwiper()

  return (
    <div className={className}>
      <MoveLeft
        onClick={() => canGoPrev && swiper.slidePrev()}
        className={`cursor-pointer sm:w-[40px] sm:h-auto ${
          canGoPrev ? '' : 'pointer-events-none text-[#a7a7a7]'
        }`}
        width={80}
        height={60}
      />
      <MoveRight
        onClick={() => canGoNext && swiper.slideNext()}
        className={`cursor-pointer sm:w-[40px] sm:h-auto ${
          canGoNext ? '' : 'pointer-events-none text-[#a7a7a7]'
        }`}
        width={80}
        height={60}
      />
    </div>
  );
};

export default SwiperArrows;
