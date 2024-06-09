'use client'
import React from 'react';
import ListOfArtists from '@/components/List/ListOfArtists';
import useFetchData from '@/customHooks/useFetchData';

const Galleries = () => {
  const { galleries } = useFetchData()
  console.log(galleries);
  return (
    <main className="Artists">
      <ListOfArtists nav={[{ tab: 'All galleries', list: galleries, context: 'artist' }]} />
    </main>
  );
};

export default Galleries;
