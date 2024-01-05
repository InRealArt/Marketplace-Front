import ContactUs from '@/components/Home/ContactUs';
import Intro from '@/components/Home/Intro';
import ListOfArtists from '@/components/List/ListOfArtists';
import ListOfNfts from '@/components/List/ListOfNfts';
import artists from '@/mocks/artists.json';
import nfts from '@/mocks/nfts.json';

const Landing = () => {
  return (
    <main className="Landing">
      <Intro />
      <ListOfArtists artists={artists} />
      <ListOfNfts nfts={nfts} />
      <ContactUs />
    </main>
  );
};

export default Landing;
