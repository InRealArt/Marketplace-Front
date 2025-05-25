'use client';
import React, { useRef, useState, useEffect } from 'react';
import Modal from '@/components/Modal/Modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Zoom, Pagination } from 'swiper/modules';
import { Minus, Plus, ZoomIn, ZoomOut, X } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/zoom';
import 'swiper/css/pagination';

interface ZoomGalleryModalProps {
  show: boolean;
  hide: () => void;
  images: string[];
  initialSlide: number;
  title?: string;
}

const ZoomGalleryModal: React.FC<ZoomGalleryModalProps> = ({
  show,
  hide,
  images,
  initialSlide = 0,
  title = 'Gallery View'
}) => {
  const swiperRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(initialSlide);
  
  // Update swiper when initialSlide changes
  useEffect(() => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideTo(initialSlide, 0);
      setCurrentIndex(initialSlide);
    }
  }, [initialSlide, show]);

  // Handle body scrolling and prevent default zoom
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
      
      // Prevent browser zoom on Ctrl+wheel
      const preventZoom = (e: WheelEvent) => {
        if (e.ctrlKey) {
          e.preventDefault();
        }
      };
      
      // Add event listeners to prevent zoom
      document.addEventListener('wheel', preventZoom, { passive: false });
      
      return () => {
        document.body.style.overflow = 'visible';
        document.removeEventListener('wheel', preventZoom);
      };
    }
  }, [show]);
  
  // Handle wheel events for image zooming
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !show) return;
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Only process if we have a swiper instance
      if (!swiperRef.current?.swiper) return;
      
      const swiper = swiperRef.current.swiper;
      const delta = -Math.sign(e.deltaY);
      const currentZoom = swiper.zoom.scale;
      
      // Zoom in or out based on wheel direction
      if (delta > 0 && currentZoom < 3) {
        const newZoom = Math.min(currentZoom + 0.1, 3);
        swiper.zoom.in(newZoom);
        setZoomLevel(newZoom);
      } else if (delta < 0 && currentZoom > 1) {
        const newZoom = Math.max(currentZoom - 0.1, 1);
        swiper.zoom.out(newZoom);
        setZoomLevel(newZoom);
      }
    };
    
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [show]);
  
  // Reset zoom when slide changes
  const handleSlideChange = (swiper: any) => {
    setCurrentIndex(swiper.activeIndex);
    setZoomLevel(1);
  };
  
  // Zoom in/out functions
  const zoomIn = () => {
    if (swiperRef.current?.swiper) {
      const swiper = swiperRef.current.swiper;
      const currentZoom = swiper.zoom.scale;
      const newZoom = Math.min(currentZoom + 0.5, 3);
      swiper.zoom.in(newZoom);
      setZoomLevel(newZoom);
    }
  };
  
  const zoomOut = () => {
    if (swiperRef.current?.swiper) {
      const swiper = swiperRef.current.swiper;
      const currentZoom = swiper.zoom.scale;
      const newZoom = Math.max(currentZoom - 0.5, 1);
      swiper.zoom.out(newZoom);
      setZoomLevel(newZoom);
    }
  };

  if (!show) return null;
  
  return (
    <>
      {/* Custom fullscreen modal */}
      <div className="fixed inset-0 w-screen h-screen z-[999] bg-black" ref={containerRef}>
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-4 bg-black/50 backdrop-blur-sm">
          <h2 className="text-white text-xl font-medium">{title}</h2>
          <button 
            onClick={hide}
            className="p-2 rounded-full hover:bg-white/10"
            aria-label="Close gallery"
          >
            <X size={24} color="white" />
          </button>
        </div>
        
        {/* Main content */}
        <div className="w-full h-full">
          <Swiper
            ref={swiperRef}
            navigation={true}
            zoom={{
              maxRatio: 3,
              minRatio: 1,
            }}
            pagination={{
              type: 'fraction',
            }}
            modules={[Navigation, Zoom, Pagination]}
            initialSlide={initialSlide}
            onSlideChange={handleSlideChange}
            className="w-full h-full"
          >
            {images.map((image, index) => (
              <SwiperSlide key={`zoom-slide-${index}`}>
                <div className="swiper-zoom-container h-full flex items-center justify-center">
                  <img
                    src={image}
                    alt={`Artwork image ${index + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        {/* Zoom controls */}
        <div className="absolute bottom-5 right-5 flex items-center gap-2 z-20 bg-black/40 backdrop-blur-sm p-2 rounded-lg">
          <button 
            onClick={zoomOut}
            disabled={zoomLevel <= 1}
            className={`p-2 rounded-full hover:bg-white/20 ${zoomLevel <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Zoom out"
          >
            <Minus size={20} color="white" />
          </button>
          <span className="text-white text-sm">{Math.round(zoomLevel * 100)}%</span>
          <button 
            onClick={zoomIn}
            disabled={zoomLevel >= 3}
            className={`p-2 rounded-full hover:bg-white/20 ${zoomLevel >= 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Zoom in"
          >
            <Plus size={20} color="white" />
          </button>
        </div>
        
        {/* Instructions */}
        <div className="absolute bottom-5 left-5 text-xs text-white/70 z-20 bg-black/30 backdrop-blur-sm p-2 rounded-lg">
          Use mouse wheel or pinch to zoom • Drag to move around when zoomed
        </div>
      </div>
    </>
  );
};

export default ZoomGalleryModal; 