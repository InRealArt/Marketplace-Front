import List from './List';
import { ListNavigationType } from '@/types';

interface ListOfArtistsProps {
  nav: ListNavigationType[];
}

const ListOfArtists = ({ nav }: ListOfArtistsProps) => {
  return (
    <section className="ListOfArtists">
      <List nav={nav} />
    </section>
  );
};

export default ListOfArtists;
