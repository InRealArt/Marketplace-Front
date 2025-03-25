import ListZustand from './ListZustand';
import { ListNavigationType } from '@/types';

interface ListOfArtistsProps {
  nav: ListNavigationType[];
}

const ListOfArtistsZustand = ({ nav }: ListOfArtistsProps) => {
  return (
    <section className="ListOfArtists">
      <ListZustand nav={nav} />
    </section>
  );
};

export default ListOfArtistsZustand; 