'use client'
import React from 'react';
import ListOfArtists from '@/components/List/ListOfArtists';
import useFetchData from '@/customHooks/useFetchData';

const Artists = () => {
  const { artists } = useFetchData()

  return (
    <main className="Artists">
      <ListOfArtists nav={[{ tab: 'All Artists', list: artists, context: 'artist' }]} />
    </main>
  );
};

export default Artists;
