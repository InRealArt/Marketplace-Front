import { Nft } from '@/mocks/types';
import List from './List';

interface ListOfNftsProps {
  nav: string[];
  viewAllLink?: string;
  nfts: Nft[];
}

const ListOfNfts = ({ nav, viewAllLink, nfts }: ListOfNftsProps) => {
  const allFilters: string[] = [
    'Science-fiction',
    '3D',
    'Modeling',
    'Romantisme',
    'Landscape',
    'Music',
    'Photographie',
    'Top',
    'Top monde',
  ];
  return (
    <section className="ListOfNfts">
      <List
        context="nft"
        nav={nav}
        viewAllLink={viewAllLink}
        list={nfts}
        filters={allFilters}
      />
    </section>
  );
};

export default ListOfNfts;
