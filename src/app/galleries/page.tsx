'use client'
import React from 'react';
import ListOfArtists from '@/components/List/ListOfArtists';
import { useArtistsStore } from '@/store/artistsStore';

const Galleries = () => {
  const { galleries } = useArtistsStore()
  return (
    <main className="Artists">
      <ListOfArtists nav={[{ tab: 'All galleries', list: galleries, context: 'artist' }]} />
    </main>
  );
};

export default Galleries;
