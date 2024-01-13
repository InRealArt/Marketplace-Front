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
  list: Nft[] | Artist[];
}

const List = ({ context, nav, viewAllLink, list }: ListProps) => {
  const methods = useForm();
  const searchFieldText = methods.watch(['search'])[0];
  const listWithSearchQuery =
    searchFieldText?.length > 0
      ? list.filter(
          (item) =>
            item.name.toLowerCase().indexOf(searchFieldText?.toLowerCase()) !==
            -1,
        )
      : list;

  return (
    <section className="List">
      <FormProvider {...methods}>
        <ListNavigation nav={nav} viewAllLink={viewAllLink} />
      </FormProvider>
      <div className="List__items">
        {listWithSearchQuery.map((item) =>
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
