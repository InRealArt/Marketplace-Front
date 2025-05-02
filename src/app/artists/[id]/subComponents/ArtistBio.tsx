import React from 'react';
import Button from '@/components/Button/Button';
import { Heart, Share2 } from 'lucide-react';
import { ReadMore } from '@/components/utils/ReadMore';
import { ArtistType } from '@/types';

interface ArtistBioProps {
  name?: ArtistType['name'];
  description?: ArtistType['description'];
}

const ArtistBio = ({ name, description }: ArtistBioProps) => {
  return (
    <div className="w-full flex justify-between items-start">
      <div>
        <h1 className="font-semibold mt-[15px] text-[24px] sm:text-[36px]">{name}</h1>

        <div className="mt-[20px] w-full sm:w-[70%]">
          <h3 className="font-medium mb-[20px] text-[18px]">Biographie</h3>
          <ReadMore
            additionalClassName="text-[16px] font-poppins text-gray-400"
            id="read-more-text"
            text={description || ''}
            amountOfWords={40}
          />
        </div>
      </div>
      <div className="gap-[10px] hidden sm:flex">
        <Button
          text="Share"
          additionalClassName="blur"
          icon={<Share2 className="Button__icon" width={28} height={28} />}
        />
      </div>
    </div>
  );
};

export default ArtistBio;
