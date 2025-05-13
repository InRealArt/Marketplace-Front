'use client'
import List from './List';
import { ListNavigationType } from '@/types';
import { useItemsStore } from '@/store/itemsStore';

interface ListOfNftsProps {
  nav: ListNavigationType[];
  viewAllLink?: string;
}

const ListOfNfts = ({ nav, viewAllLink }: ListOfNftsProps) => {
  const { nfts } = useItemsStore();
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