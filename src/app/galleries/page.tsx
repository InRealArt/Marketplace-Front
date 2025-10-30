'use client'
import React from 'react';
import ListOfArtists from '@/components/List/ListOfArtists';
import { useArtistsStore } from '@/store/artistsStore';
import Container from '@/components/Common/Container';

const Galleries = () => {
  const { galleries } = useArtistsStore()
  return (
    <Container>
      <main className="Artists">
        <ListOfArtists nav={[{ tab: 'All galleries', list: galleries, context: 'artist' }]} />
      </main>
    </Container>
  );
};

export default Galleries;
