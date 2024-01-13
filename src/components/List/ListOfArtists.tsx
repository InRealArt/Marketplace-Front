import { Artist } from '@/mocks/types';
import List from './List';

interface ListOfArtistsProps {
  nav: string[];
  artists: Artist[];
}

const ListOfArtists = ({ nav, artists }: ListOfArtistsProps) => {
  return (
    <section className="ListOfArtists">
      <List context="artist" nav={nav} list={artists} />
    </section>
  );
};

export default ListOfArtists;
