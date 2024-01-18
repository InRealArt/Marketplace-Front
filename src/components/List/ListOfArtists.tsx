import { Artist } from '@/mocks/types';
import List from './List';

interface ListOfArtistsProps {
  nav: string[];
  artists: Artist[];
}

const ListOfArtists = ({ nav, artists }: ListOfArtistsProps) => {
  const allFilters: string[] = [
    'Science-fiction',
    '3D',
    'Modeling',
    'Romantisme',
    'Landscape',
    'Music',
    'Photographie',
    'Top',
    'Collectibles',
    'Top monde',
    'Top france',
  ];
  return (
    <section className="ListOfArtists">
      <List filters={allFilters} context="artist" nav={nav} list={artists} />
    </section>
  );
};

export default ListOfArtists;
