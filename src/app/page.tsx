'use client'
import ContactUs from '@/components/Home/ContactUs';
import Intro from '@/components/Home/Intro';
import ArtistsListSlider from '@/components/List/ArtistsListSlider';
import ListOfNfts from '@/components/List/ListOfNfts';
import useFetchData from '@/customHooks/useFetchData';
import { useAppSelector } from '@/redux/hooks';
import { getIraNfts } from '@/redux/reducers/nfts/selectors';

const Landing = () => {
  const { artists } = useFetchData()
  const iraNfts = useAppSelector((state) => getIraNfts(state))

  return (
    <main className="Landing">
      <Intro />
      <ArtistsListSlider artists={artists} title="Artists of the Moment" />
      <ListOfNfts nav={[{ tab: 'Popular Artworks ', list: iraNfts, context: 'nft' }]} viewAllLink="/artwork" />
      <ContactUs />
    </main>
  );
};

export default Landing;
