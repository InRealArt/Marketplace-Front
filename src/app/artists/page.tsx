'use client'
import React, { useEffect } from 'react';
import ListOfArtists from '@/components/List/ListOfArtists';
import { useArtistsStore } from '@/store/artistsStore';


const Artists = () => {
  const { fetchArtists, artists } = useArtistsStore()

  useEffect(() => {
    if (artists.length === 0) {
      fetchArtists();
    }
  }, []);

  return (
    <main>
      {/* <ListOfArtists nav={[{ tab: 'All Artists', list: artists, context: 'artist' }]} /> */}
      <ListOfArtists nav={[{ tab: 'All Artists', list: artists, context: 'artist' }]} />
    </main>
  );
};

export default Artists;
