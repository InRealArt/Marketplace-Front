'use client'
import React, { useEffect } from 'react';
import ListOfArtists from '@/components/List/ListOfArtists';
// import { useArtistsData } from '@/customHooks/useArtistsData';
import useFetchData from '@/customHooks/useFetchData';
import useZustandFetchData from '@/customHooks/useZustandFetchData';
import ListOfArtistsZustand from '@/components/List/ListOfArtistsZustand';
import { useArtistsStore } from '@/store/artistsStore';


const Artists = () => {
  const { fetchArtists, artists } = useArtistsStore()

  useEffect(() => {
    if (artists.length === 0) {
      fetchArtists();
    }
  }, []);

  return (
    <main className="Artists">
      {/* <ListOfArtists nav={[{ tab: 'All Artists', list: artists, context: 'artist' }]} /> */}
      <ListOfArtistsZustand nav={[{ tab: 'All Artists', list: artists, context: 'artist' }]} />
    </main>
  );
};

export default Artists;
