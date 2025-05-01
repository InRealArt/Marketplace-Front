'use client'
import ContactUs from '@/components/Home/ContactUs';
import Intro from '@/components/Home/Intro';
import ArtistsListSlider from '@/components/List/ArtistsListSlider';
import ListOfNfts from '@/components/List/ListOfNfts';
import { useArtistsStore } from '@/store/artistsStore';
import { useNftsStore } from '@/store/nftsStore';
import { useEffect } from 'react';

const Landing = () => {
  const { artists, fetchArtists } = useArtistsStore();
  const { nfts, fetchNfts } = useNftsStore();
  
  useEffect(() => {
    if (nfts.length === 0) {
      fetchNfts();
    }
    if (artists.length === 0) {
      fetchArtists();
    }
  }, []);

  
  return (
    <main className="Landing">
      <Intro />
      <ArtistsListSlider artists={artists} title="Artists of the Moment" />
      <ListOfNfts nav={[{ tab: 'Popular Artworks ', list: nfts, context: 'nft' }]} viewAllLink="/artwork" />
      <ContactUs />
    </main>
  );
};

export default Landing;
