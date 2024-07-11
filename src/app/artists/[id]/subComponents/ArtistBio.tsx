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
    <div className="Artist__bio">
      <div>
        <h1 className="Artist__name">{name}</h1>

        <div className="Artist__description">
          <h3 className="Artist__description__title">Biographie</h3>
          <ReadMore
            additionalClassName="Artist__description"
            id="read-more-text"
            text={description || ''}
            amountOfWords={40}
          />
        </div>
      </div>
      <div className="Artist__actions">
        <Button
          text="Share"
          additionalClassName="blur"
          icon={<Share2 className="Button__icon" width={28} height={28} />}
        />
        {/* <Button
          text="Follow"
          additionalClassName="blur"
          icon={<Heart className="Button__icon" width={28} height={28} />}
        /> */}
      </div>
    </div>
  );
};

export default ArtistBio;
