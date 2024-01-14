import React from 'react';
import Button from '@/components/Button/Button';
import Image from 'next/image';

const ArtistActions = () => {
  return (
    <div className="Artist__top">
      <Image
        className="Artist__img"
        priority={true}
        alt="Artist Image"
        src="/images/Artist.png"
        width={128}
        height={128}
      />
      <span className="Artist__label">Créateur</span>
      <div className="Artist__actions Artist__actions--mobile">
        <Button
          text="Share"
          icon="/icons/Share.png"
          additionalClassName="blur"
        />
        <Button
          text="Follow"
          icon="/icons/Heart.png"
          additionalClassName="blur"
        />
      </div>
    </div>
  );
};

export default ArtistActions;
