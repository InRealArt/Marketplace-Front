'use client'
import ContactUs from '@/components/Home/ContactUs';
import Intro from '@/components/Home/Intro';
import ArtistsListSlider from '@/components/List/ArtistsListSlider';
import ListOfNfts from '@/components/List/ListOfNfts';
import useFetchData from '@/customHooks/useFetchData';

const Landing = () => {
  const {artists, nfts} = useFetchData()

  return (
    <main className="Landing">
      <Intro />
      <ArtistsListSlider artists={artists} title="Artistes du moments" />
      <ListOfNfts nav={[{ tab: 'Popular Artworks ', list: nfts, context: 'nft' }]} viewAllLink="/nfts" />
      <ContactUs />
    </main>
  );
};

export default Landing;
