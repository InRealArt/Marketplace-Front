'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ReadMore } from '@/components/utils/ReadMore';
import DescriptionModal from '@/components/Modal/DescriptionModal';
import dynamic from 'next/dynamic';
import { ArtistType, ItemPhysicalType } from '@/types';
import ArtworkPrice from './ArtworkPrice';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface ArtworkInfosProps {
  nft: ItemPhysicalType
  artist: ArtistType | null | undefined
}

const ArtworkInfos = ({ nft, artist }: ArtworkInfosProps) => {
  const { name, description } = nft.Item || {};
  const [showDescriptionModal, setShowDescriptionModal] = useState<boolean>(false);
  
  return (      
      <div className="rounded-[10px] border border-[#a6a6a6] bg-[#313130] p-[20px_15px] md:p-[25px_20px] w-full md:w-[40%] h-full">
        <div className="flex p-[15px_20px] items-center rounded-[14px] bg-[#2c2c29] mb-[30px]">
          {artist?.imageUrl && (
            <Image
              className="w-[65px] h-[65px] object-cover border-[3px] border-[#b38273] rounded-[50%] mr-[25px] sm:w-[50px] sm:h-[50px]"
              priority={true}
              alt="My NFT"
              src={artist?.imageUrl}
              width={28}
              height={28}
            />
          )}
          <div className="sm:text-[15px]">
            <Link href={`/artists/${artist?.slug}`} className="text-[18px] tracking-[-0.25px]">
              {artist?.pseudo}
            </Link>
            <h3 className="font-semibold text-[24px] sm:text-[18px]">{name}</h3>
          </div>
        </div>
        
        <div className="text-[16px] mb-4">
          <h3 className="font-medium mb-[10px] text-[18px]">Description</h3>
          <ReadMore
            additionalClassName="text-[16px] font-poppins"
            id="nft-description"
            text={description || ''}
            amountOfWords={35}
            action={() => setShowDescriptionModal(true)}
          />
          <DescriptionModal
            showDescriptionModal={showDescriptionModal}
            setShowDescriptionModal={setShowDescriptionModal}
            description={description || ''}
            name={name || ''}
          />
        </div>
        
        <ArtworkPrice nft={nft} />
      </div>
  );
};

export default ArtworkInfos;
