import React from 'react';
import { Artist } from '@/mocks/types';
import ArtistBio from './ArtistBio';
import ArtistBackground from './ArtistBackground';
import ArtistActions from './ArtistActions';

interface ArtistHeaderProps {
  name?: Artist['name'];
  bio?: Artist['bio'];
}

const ArtistHeader = ({ name, bio }: ArtistHeaderProps) => {
  return (
    <section className="Artist__header">
      <ArtistBackground />
      <div className="Artist__infos">
        <ArtistActions />
        <ArtistBio name={name} bio={bio} />
      </div>
    </section>
  );
};

export default ArtistHeader;
