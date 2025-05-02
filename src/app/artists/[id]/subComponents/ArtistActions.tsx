import React from 'react';
import Button from '@/components/Button/Button';
import Image from 'next/image';
import { Share2 } from 'lucide-react';
import { ArtistType } from '@/types';


const ArtistActions = ({ imageUrl, isGallery }: Partial<ArtistType>) => {
  return (
    <div className="w-full flex justify-between items-start">
      {imageUrl && (
        <Image
          className="rounded-lg border-2 border-[#b39e73] object-cover w-[90px] h-[90px] sm:w-[128px] sm:h-[128px] "
          priority={true}
          alt="Artist Image"
          src={imageUrl}
          width={128}
          height={128}
        />
      )}
      <span className="rounded-[10px] border border-white bg-white/30 backdrop-blur-[26px] py-[13px] px-[15px] text-[14px] hidden sm:block">
        {isGallery ? "Gallery" : "Creator"}
      </span>
      <div className="flex gap-[10px] relative top-[-30px] sm:hidden">
        <Button
          text="Share"
          additionalClassName="blur"
          icon={<Share2 className="Button__icon" width={28} height={28} />}
        />
      </div>
    </div>
  );
};

export default ArtistActions;
