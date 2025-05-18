'use client';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import NftCard from '../Card/NftCard';
import { useForm, FormProvider } from 'react-hook-form';
import ArtistCard from '../Card/ArtistCard';
import ListHeader from './subComponents/ListHeader';
import { ArtistType, CollectionType, ListNavigationType, ItemPhysicalType } from '@/types';
import CollectionCard from '../Card/CollectionCard';
import { useEffect, useState } from 'react';
import { PhysicalItemStatus } from '@prisma/client';

interface ListProps {
  nav: ListNavigationType[];
  viewAllLink?: string;
  filters?: string[];
}

const List = ({ nav, viewAllLink, filters }: ListProps) => {
  const methods = useForm();
  
  const [navActive, setNavActive] = useState<ListNavigationType>(nav[0]);
  const [navActiveItem, setNavActiveItem] = useState<ListNavigationType | undefined>(nav[0]);
  const [onlyToBuy, setOnlyToBuy] = useState(false);

  useEffect(() => {
    if (!navActive) {
      setNavActive(nav[0])
      setNavActiveItem(nav[0])
    } else {
      const newNavActive = nav.find((item) => item.tab === navActive.tab)
      if (newNavActive) {
        setNavActive(newNavActive)
        setNavActiveItem(newNavActive)
      } else {
        setNavActive(nav[0])
        setNavActiveItem(nav[0])
      }
    }
  }, [nav, navActive])

  // Si NFT, filtrer pour OnlyToBuy
  const listOfNftsToBuyOrNot = navActiveItem?.context === 'nft' && onlyToBuy
    ? (navActiveItem.list as ItemPhysicalType[]).filter(
      nft => nft.status === PhysicalItemStatus.listed
    )
    : navActiveItem?.list

  const showListByType = (item: ItemPhysicalType | ArtistType | CollectionType) => {
    switch (navActiveItem?.context) {
      case 'nft':
        return <NftCard key={item.id} nft={item as ItemPhysicalType} />
      case 'artist':
        return <ArtistCard key={item.id} artist={item as ArtistType} />
      case 'collection':
        return <CollectionCard key={item.id} collection={item as CollectionType} />
    }
  }

  return (
    <section className="mt-[60px] lg:mt-[100px]">
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
      <div className="flex flex-wrap justify-start gap-5 lg:gap-[26px] xl:gap-[30px]">
        {listOfNftsToBuyOrNot?.map((item) => showListByType(item))}
      </div>
    </section>
  );
};

export default List; 