import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FlameIcon } from 'lucide-react';
import Button from '../Button/Button';
import { NftType } from '@/types';
import { useAppSelector } from '@/redux/hooks';
import { getArtistByNft } from '@/redux/reducers/artists/selectors';

interface NftCardProps {
  nft: NftType;
}

const NftCard = ({ nft }: NftCardProps) => {
  const { name, slug } = nft;
  const artist = useAppSelector((state) => getArtistByNft(state, nft.idUser))

  return (
    <div className="flex flex-col items-center relative w-full mt-10 h-auto p-2.5 rounded-[17px] sm:w-[calc(50%-20px)] lg:w-[calc(33.333%-40px)]">
      <Link 
        className="relative w-full h-[350px] flex items-center justify-center overflow-hidden transition-all duration-200 ease-in-out rounded-[17px] bg-gradient-to-r from-white/30 via-[rgb(88,88,88,0.74)] to-white/30 sm:h-[410px] lg:h-[440px]" 
        href={`/artworks/${slug || nft.id}`}
      >
        <picture className="h-full w-full flex items-center justify-center">
          {nft.mainImageUrl && (
            <Image 
              className="w-full h-full max-h-[80%] max-w-[80%] object-center object-contain" 
              alt={nft.name || ''} 
              width={300} 
              height={300} 
              src={nft.mainImageUrl} 
            />
          )}
        </picture>
        <div className="absolute flex items-center bottom-5 left-5 px-[15px] py-[13px] rounded-[10px] border border-white bg-[rgba(84,84,84,0.3)] backdrop-blur-[26px] font-poppins text-sm">
          <FlameIcon width={23} height={23} /> <span className="ml-2.5">Famous artist</span>
        </div>
      </Link>
      <div className="w-[calc(100%-30px)] rounded-[17px] mt-2.5 px-[15px] py-0">
        <div className="relative flex items-center justify-between py-[15px] w-full">
          <div className="max-w-[60%]">
            <Link 
              className="block font-poppins text-base text-[#dedcd8] m-0 mb-2.5 truncate whitespace-nowrap overflow-hidden" 
              href={`/artists/${artist?.slug || artist?.id}`}
            >
              {artist?.pseudo}
            </Link>
            <Link 
              className="block font-poppins text-lg font-semibold truncate whitespace-nowrap overflow-hidden" 
              href={`/artworks/${slug || nft.id}`}
            >
              {name}
            </Link>
          </div>
          <div className="flex items-center font-poppins text-base">
            {nft.priceNftBeforeTax} €
          </div>
        </div>
        <Button
          text='Buy now'
          link={`/artworks/${slug || nft.id}`}
          additionalClassName='gold'
          activeClassName='large'
          className="w-full"
        />
      </div>
    </div>
  );
};

export default NftCard;
