import { Nft } from '@/mocks/types';
import List from './List';

interface ListOfNftsProps {
  nav: string[];
  viewAllLink?: string;
  nfts: Nft[];
}

const ListOfNfts = ({ nav, viewAllLink, nfts }: ListOfNftsProps) => {
  return (
    <section className="ListOfNfts">
      <List context="nft" nav={nav} viewAllLink={viewAllLink} list={nfts} />
    </section>
  );
};

export default ListOfNfts;
