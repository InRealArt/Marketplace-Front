'use client';
import { Nft, Artist } from '@/mocks/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import NftCard from '../Card/NftCard';
import ListNavigation from './subComponents/ListNavigation';
import { useForm, FormProvider } from 'react-hook-form';
import ArtistCard from '../Card/ArtistCard';

interface ListProps {
  context: 'nft' | 'artist';
  nav: string[];
  viewAllLink?: string;
  filters: string[];
  list: Nft[] | Artist[];
}

const List = ({ context, nav, viewAllLink, filters, list }: ListProps) => {
  const methods = useForm();
  const searchFieldText = methods.watch(['search'])[0];
  const filtersSelected: string[] = methods.watch(['filters'])[0];

  const listWithQuery =
    searchFieldText?.length > 0
      ? list.filter(
          (item) =>
            item.name.toLowerCase().indexOf(searchFieldText?.toLowerCase()) !==
            -1,
        )
      : list;

  const listWithFilters =
    filtersSelected?.length > 0
      ? listWithQuery.filter(
          (nft) =>
            filtersSelected?.every((item) => nft.filters?.includes(item)),
        )
      : listWithQuery;

  return (
    <section className="List">
      <FormProvider {...methods}>
        <ListNavigation nav={nav} filters={filters} viewAllLink={viewAllLink} />
      </FormProvider>
      <div className="List__items">
        {listWithFilters.map((item) =>
          context === 'nft' ? (
            <NftCard key={item.id} nft={item as Nft} />
          ) : (
            <ArtistCard key={item.id} artist={item as Artist} />
          ),
        )}
      </div>
    </section>
  );
};

export default List;
