'use client'
import ContactUs from '@/components/Home/ContactUs';
import Intro from '@/components/Home/Intro';
import ArtistsListSlider from '@/components/List/ArtistsListSlider';
import ListOfFeaturedArtworks from '@/components/List/ListOfFeaturedArtworks';
import { useArtistsStore } from '@/store/artistsStore';
import { useItemsStore } from '@/store/itemsStore';
import { useEffect } from 'react';

const Landing = () => {
  const { artists, fetchArtists } = useArtistsStore();
  const { fetchItems, getFeaturedItems } = useItemsStore();
  
  useEffect(() => {
      fetchItems();
      fetchArtists();
  }, []);

  const featuredArtworks = getFeaturedItems();

  return (
    <main className="Landing">
      <Intro />
      <ArtistsListSlider artists={artists} title="Artists of the Moment" />
      <ListOfFeaturedArtworks nav={[{ tab: 'Popular Artworks ', list: featuredArtworks, context: 'artwork' }]} viewAllLink="/artworks" />
      <ContactUs />
    </main>
  );
};

export default Landing;
