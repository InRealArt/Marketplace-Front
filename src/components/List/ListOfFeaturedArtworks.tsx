'use client'
import List from './List';
import { ListNavigationType } from '@/types';
import { useItemsStore } from '@/store/itemsStore';

interface ListOfFeaturedArtworksProps {
  nav: ListNavigationType[];
  viewAllLink?: string;
}

const ListOfFeaturedArtworks = ({ nav, viewAllLink }: ListOfFeaturedArtworksProps) => {
  // const { nfts } = useItemsStore();
  // const nftsTags = nfts
  //   .map(nft => nft.tags !== undefined ? nft.tags : [])
  //   .flat(1)
  //   .filter((item, index, self) => self.indexOf(item) === index);

  return (
    <section className="ListOfNfts">
      <List
        nav={nav}
        viewAllLink={viewAllLink}
        filters={[]}
      />
    </section>
  );
};

export default ListOfFeaturedArtworks; 