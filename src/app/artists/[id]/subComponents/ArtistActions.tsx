import React from 'react';
import Button from '@/components/Button/Button';
import Image from 'next/image';
import { Heart, Share2 } from 'lucide-react';
import { ArtistType } from '@/types';


const ArtistActions = ({ imageUrl, isGallery }: Partial<ArtistType>) => {
  return (
    <div className="Artist__top">
      {imageUrl && (
        <Image
          className="Artist__img"
          priority={true}
          alt="Artist Image"
          src={imageUrl}
          width={128}
          height={128}
        />
      )}
      <span className="Artist__label">{isGallery ? "Gallery" : "Creator"}</span>
      <div className="Artist__actions Artist__actions--mobile">
        <Button
          text="Share"
          additionalClassName="blur"
          icon={<Share2 className="Button__icon" width={28} height={28} />}
        />
        <Button
          text="Follow"
          additionalClassName="blur"
          icon={<Heart className="Button__icon" width={28} height={28} />}
        />
      </div>
    </div>
  );
};

export default ArtistActions;
