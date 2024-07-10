'use client';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import NftCard from '../Card/NftCard';
import { useForm, FormProvider } from 'react-hook-form';
import ArtistCard from '../Card/ArtistCard';
import ListHeader from './subComponents/ListHeader';
import { ArtistType, CollectionType, ListNavigationType, NftType } from '@/types';
import CollectionCard from '../Card/CollectionCard';
import { useState } from 'react';
import { ResourceNftStatuses } from '@prisma/client';
import { useAccount } from 'wagmi';

interface ListProps {
  nav: ListNavigationType[];
  viewAllLink?: string;
  filters?: string[];
}

const List = ({ nav, viewAllLink, filters }: ListProps) => {
  const {isConnected, address} = useAccount()
  const [navActive, setNavActive] = useState(nav[0]);
  const [onlyToBuy, setOnlyToBuy] = useState(false);

  const methods = useForm();
  const searchFieldText = methods.watch(['search'])[0];
  const filtersSelected: string[] = methods.watch(['filters'])[0];
  const navActiveItem = nav.find(navItem => navItem.tab === navActive.tab)

  const listWithQuery =
    searchFieldText?.length > 0
      ? navActiveItem?.list.filter(
        (item) =>
          ((item as NftType | ArtistType).name || (item as CollectionType).symbol).toLowerCase().indexOf(searchFieldText?.toLowerCase()) !==
          -1,
      )
      : navActiveItem?.list;

  const listWithTags = (filtersSelected?.length > 0)
    ? listWithQuery?.filter(
      (nft) =>
        filtersSelected?.every((item) => (nft as NftType).tags?.includes(item)),
    )
    : listWithQuery;

  const listOfNftsToBuyOrNot = onlyToBuy && navActiveItem?.context === 'nft' ? (listWithTags as NftType[])?.filter((nft) => nft.status === ResourceNftStatuses.LISTED && (isConnected && (address !== nft.previousOwner) && (address !== nft.owner))) : listWithTags

  const showListByType = (item: NftType | ArtistType | CollectionType) => {
    switch (navActiveItem?.context) {
      case 'nft':
        return <NftCard key={item.id} nft={item as NftType} />
      case 'artist':
        return <ArtistCard key={item.id} artist={item as ArtistType} />
      case 'collection':
        return <CollectionCard key={item.id} collection={item as CollectionType} />
    }
  }


  return (
    <section className="List">
      <FormProvider {...methods}>
        <ListHeader
          nav={nav}
          filters={navActiveItem?.context === 'nft' && filters ? filters : []}
          viewAllLink={viewAllLink}
          navActive={navActive}
          setNavActive={setNavActive}
          setOnlyToBuy={setOnlyToBuy}
          onlyToBuy={onlyToBuy}
        />
      </FormProvider>
      <div className="List__items">
        {listOfNftsToBuyOrNot?.map((item) => showListByType(item))}
      </div>
    </section>
  );
};

export default List;
