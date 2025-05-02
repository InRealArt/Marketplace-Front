import React from 'react';
import Button from '../Button/Button';
import Link from 'next/link';
import { ArtistType } from '@/types';

interface ArtistCardSliderProps {
  artist: ArtistType;
}

const ArtistCardSlider = ({ artist }: ArtistCardSliderProps) => {
  const { id, imageUrl, name, surname } = artist;
  return (
    <Link href={`/artists/${id}`}>
      <div
        className="relative w-full h-[240px] bg-no-repeat bg-cover bg-center mr-5 rounded-[17px] md:h-[380px]"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 2.61%, rgba(0, 0, 0, 0.50) 2.62%, rgba(0, 0, 0, 0.00) 48.1%), url('${imageUrl}')`,
        }}
      >
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-5 flex flex-col items-start w-[90%] md:flex-row md:justify-around md:items-center">
          <h2 className="font-montserrat text-base tracking-[-1.5px] mb-[15px] md:mb-0 md:mr-[5px] md:w-[90px] md:text-xl w-auto">{name} {surname}</h2>
          <Button 
            additionalClassName="purple" 
            text="See their arts" 
            className="ml-0 py-[15px] px-[20px] w-full text-sm tracking-[-1px] md:w-auto md:ml-[5px] md:text-base"
          />
        </div>
      </div>
    </Link>
  );
};

export default ArtistCardSlider;
