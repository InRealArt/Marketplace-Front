import React from 'react';
import Button from '@/components/Button/Button';
import { Artist } from '@/mocks/types';

interface ArtistBioProps {
  name: Artist['name'] | undefined;
  bio: Artist['bio'] | undefined;
}

const ArtistBio = ({ name, bio }: ArtistBioProps) => {
  return (
    <div className="Artist__bio">
      <div>
        <h1 className="Artist__name">{name}</h1>

        <div className="Artist__description">
          <h3 className="Artist__description__title">Description</h3>
          <p className="Artist__description__text">{bio}</p>
        </div>
      </div>
      <div className="Artist__actions">
        <Button
          text="Share"
          additionalClassName="blur"
          icon="/icons/Share.png"
        />
        <Button
          text="Follow"
          additionalClassName="blur"
          icon="/icons/Share.png"
        />
      </div>
    </div>
  );
};

export default ArtistBio;
