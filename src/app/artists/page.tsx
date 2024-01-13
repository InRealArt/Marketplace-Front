import React from 'react';
import ListOfArtists from '@/components/List/ListOfArtists';
import artists from '@/mocks/artists.json';

const Artists = () => {
  return (
    <main className="Artists">
      <ListOfArtists nav={['All Artistes']} artists={artists} />
    </main>
  );
};

export default Artists;
