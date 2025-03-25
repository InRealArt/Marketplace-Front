'use client';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import NftCard from '../Card/NftCard';
import { useForm, FormProvider } from 'react-hook-form';
import ArtistCardZustand from '../Card/ArtistCardZustand';
import ListHeader from './subComponents/ListHeader';
import { ArtistType, CollectionType, ListNavigationType, NftType } from '@/types';
import CollectionCard from '../Card/CollectionCard';
import { useEffect, useState } from 'react';
import { ResourceNftStatuses } from '@prisma/client';
import { useAccount } from 'wagmi';
import { WalletClient, createWalletClient, custom } from 'viem';
import { CHAIN_USED } from '@/app/providers';

interface ListProps {
  nav: ListNavigationType[];
  viewAllLink?: string;
  filters?: string[];
}

const ListZustand = ({ nav, viewAllLink, filters }: ListProps) => {
  const { isConnected, address } = useAccount()
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
    ? (navActiveItem.list as NftType[]).filter(
      nft => nft.status === ResourceNftStatuses.LISTED
    )
    : navActiveItem?.list

  const showListByType = (item: NftType | ArtistType | CollectionType) => {
    switch (navActiveItem?.context) {
      case 'nft':
        return <NftCard key={item.id} nft={item as NftType} />
      case 'artist':
        return <ArtistCardZustand key={item.id} artist={item as ArtistType} />
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

export default ListZustand; 