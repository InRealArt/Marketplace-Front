'use client'
import List from './List';
import { ListNavigationType } from '@/types';
import { useAppSelector } from '@/redux/hooks';
import { getNftsTags } from '@/redux/reducers/nfts/selectors';

interface ListOfNftsProps {
  nav: ListNavigationType[];
  viewAllLink?: string;
}

const ListOfNfts = ({ nav, viewAllLink }: ListOfNftsProps) => {
  const nftsTags = useAppSelector((state) => getNftsTags(state))

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
