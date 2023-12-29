import Intro from '@/components/Home/Intro';
import ListOfArtists from '@/components/Home/ListOfArtists';
import artists from '@/mocks/artists.json';

const Landing = () => {
  return (
    <main className="Landing">
      <Intro />
      <ListOfArtists artists={artists} />
    </main>
  );
};

export default Landing;
