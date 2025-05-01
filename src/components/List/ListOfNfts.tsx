'use client'
import List from './List';
import { ListNavigationType } from '@/types';
import { useNftsStore } from '@/store/nftsStore';

interface ListOfNftsProps {
  nav: ListNavigationType[];
  viewAllLink?: string;
}

const ListOfNfts = ({ nav, viewAllLink }: ListOfNftsProps) => {
  const { nfts } = useNftsStore();
  const nftsTags = nfts
    .map(nft => nft.tags !== undefined ? nft.tags : [])
    .flat(1)
    .filter((item, index, self) => self.indexOf(item) === index);

  return (
    <section className="ListOfNfts">
      <List
        nav={nav}
        viewAllLink={viewAllLink}
        filters={nftsTags}
      />
    </section>
  );
};

export default ListOfNfts; 