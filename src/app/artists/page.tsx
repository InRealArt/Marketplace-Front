'use client'
import React from 'react';
import ListOfArtists from '@/components/List/ListOfArtists';
// import { useArtistsData } from '@/customHooks/useArtistsData';
import useFetchData from '@/customHooks/useFetchData';
import useZustandFetchData from '@/customHooks/useZustandFetchData';
import ListOfArtistsZustand from '@/components/List/ListOfArtistsZustand';


const Artists = () => {
  const { artists } = useZustandFetchData()
  // const { artists} = useFetchData()

  return (
    <main className="Artists">
      {/* <ListOfArtists nav={[{ tab: 'All Artists', list: artists, context: 'artist' }]} /> */}
      <ListOfArtistsZustand nav={[{ tab: 'All Artists', list: artists, context: 'artist' }]} />
    </main>
  );
};

export default Artists;
