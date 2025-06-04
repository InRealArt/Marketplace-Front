import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArtistType } from '@/types';
import { useItemsStore } from '@/store/itemsStore';

interface ArtistCardProps {
  artist: ArtistType;
}

const ArtistCard = ({ artist }: ArtistCardProps) => {
  const { id, name, imageUrl, backgroundImage, slug } = artist;
  
  const { getItemsByArtist } = useItemsStore();
  const nfts = getItemsByArtist(id);

  const imgUri = nfts[0]?.mainImageUrl;
  const background = imgUri ?? backgroundImage;

  return (
    <div className="relative w-card-1col sm:w-card-2col md:w-card-3col lg:w-card-4col mt-10 h-auto rounded-[17px] bg-white">
      <Link href={`/artists/${slug || id}`}>
        {background ? (
          <div
            className="relative w-auto h-[180px] md:h-[150px] lg:h-[185px] rounded-t-[17px] bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: `url('${background}')`,
            }}
          />
        ) : (
          <div className="relative w-auto h-[180px] md:h-[150px] lg:h-[185px] rounded-t-[17px] bg-[#525252]"></div>
        )}
      </Link>
      <div className="relative flex items-end p-0 px-2.5 -top-2.5 md:p-5 md:items-center md:top-0">
        {imageUrl && (
          <Image
            className="mr-6 rounded-lg border-[3px] border-[#b39e73] w-[60px] h-[60px]"
            priority={true}
            alt="artist miniature"
            src={imageUrl}
            width={50}
            height={50}
          />
        )}{' '}
        <div>
          <h2 className="font-poppins text-base font-medium md:text-[22px] md:font-semibold text-[#1d1d1b] mb-1.5 md:mb-0">
            {name}
          </h2>
          {!artist.isGallery && (
            <p className="hidden md:block font-poppins text-base font-medium text-[#1d1d1b] m-0">
              {nfts.length} artworks
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistCard; 