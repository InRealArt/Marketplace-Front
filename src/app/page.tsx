import ContactUs from '@/components/Home/ContactUs';
import Intro from '@/components/Home/Intro';
import ArtistsListSlider from '@/components/List/ArtistsListSlider';
import ListOfNfts from '@/components/List/ListOfNfts';
import artists from '@/mocks/artists.json';
import nfts from '@/mocks/nfts.json';

const Landing = () => {
  return (
    <main className="Landing">
      <Intro />
      <ArtistsListSlider artists={artists} title="Artistes du moments" />
      <ListOfNfts nav={['NFT Populaires']} viewAllLink="/nfts" nfts={nfts} />
      <ContactUs />
    </main>
  );
};

export default Landing;
