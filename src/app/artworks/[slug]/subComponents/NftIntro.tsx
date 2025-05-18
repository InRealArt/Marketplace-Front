'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NftPrice from './NftPrice';
import { ReadMore } from '@/components/utils/ReadMore';
import DescriptionModal from '@/components/Modal/DescriptionModal';
import dynamic from 'next/dynamic';
import { ArtistType, ItemPhysicalType } from '@/types';
import { Address } from 'viem';
import { ArrowBigLeft, ArrowBigRight, Share2, StarsIcon } from 'lucide-react';
import { TransactionData, fetchTransactionsByNft } from '@/lib/transactions';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface NftIntroProps {
  nft: ItemPhysicalType
  artist: ArtistType | null | undefined
  // contractAddress: Address
}

const NftIntro = ({ nft, artist }: NftIntroProps) => {
  const { name, description, mainImageUrl, secondaryImagesUrl } = nft.Item || {};
  const [showDescriptionModal, setShowDescriptionModal] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const images = secondaryImagesUrl ? [mainImageUrl, ...secondaryImagesUrl] : [mainImageUrl]


  return (
    <section className="grid grid-rows-auto grid-cols-auto md:grid-cols-[calc(60%-10px)_calc(40%-10px)] gap-[20px] ">
      {mainImageUrl && <div
        className="relative row-auto md:row-span-3 rounded-[10px] bg-no-repeat bg-[80%_auto] bg-center bg-black  h-[380px] md:h-[680px] lg:h-[900px]"
        style={{
          backgroundImage: ` url('${images[currentImageIndex]}')`,
        }}
      >
        {currentImageIndex !== 0 && (
          <ArrowBigLeft 
            className="cursor-pointer w-[50px] h-[50px] absolute top-1/2 -translate-y-1/2 left-[10px]" 
            onClick={() => setCurrentImageIndex(currentImageIndex - 1)} 
          />
        )}
        {currentImageIndex + 1 !== images.length && (
          <ArrowBigRight 
            className="cursor-pointer w-[50px] h-[50px] absolute top-1/2 -translate-y-1/2 right-[10px]" 
            onClick={() => setCurrentImageIndex(currentImageIndex + 1)} 
          />
        )}
        <div className="absolute right-[25px] top-[25px] inline-flex gap-5 p-[13px_15px] items-center rounded-[10px] border border-white bg-[rgba(255,255,255,0.3)] backdrop-blur-[26px] text-[14px]">
          <p className="flex m-0 gap-[10px]">
            <Share2 width={20} height={20} /> Share
          </p>
        </div>

        <div className="absolute left-[25px] bottom-[25px] p-[13px_15px] rounded-[10px] border border-white bg-[rgba(49,49,48,0.3)] backdrop-blur-[26px] text-[14px] flex items-center gap-[5px]">
          <StarsIcon width={18} height={18} />IRA exclusive
        </div>
      </div>}
      
      <div className="row-1 rounded-[10px] border border-[#a6a6a6] bg-[#313130] p-[20px_15px] md:p-[25px_20px]">
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
        
        <NftPrice nft={nft} />
      </div>
      {/* <ReactApexChart
        className="rounded-[10px] border border-[#a6a6a6] bg-[#313130]"
        series={series as ApexAxisChartSeries}
        options={options as ApexCharts.ApexOptions | undefined}
        type="area"
        width={'100%'}
        height={250}
      /> */}
    </section>
  );
};

export default NftIntro;
