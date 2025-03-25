'use client'
import ListZustand from './ListZustand';
import { ListNavigationType } from '@/types';
import { useNftsStore } from '@/store/nftsStore';

interface ListOfNftsProps {
  nav: ListNavigationType[];
  viewAllLink?: string;
}

const ListOfNftsZustand = ({ nav, viewAllLink }: ListOfNftsProps) => {
  // Récupérer les tags des NFTs via Zustand
  const { nfts } = useNftsStore();
  const nftsTags = nfts
    .map(nft => nft.tags !== undefined ? nft.tags : [])
    .flat(1)
    .filter((item, index, self) => self.indexOf(item) === index);

  return (
    <section className="ListOfNfts">
      <ListZustand
        nav={nav}
        viewAllLink={viewAllLink}
        filters={nftsTags}
      />
    </section>
  );
};

export default ListOfNftsZustand; 