import React from 'react';
import Button from '@/components/Button/Button';
import { Artist } from '@/mocks/types';
import { Heart, Share2 } from 'lucide-react';

interface ArtistBioProps {
  name?: Artist['name'];
  bio?: Artist['bio'];
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

export default ArtistBio;
