'use client';
import { Nft } from '@/mocks/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import NftCard from '../Card/NftCard';
import ListNavigation from './subComponents/ListNavigation';
import { useForm, FormProvider } from 'react-hook-form';

interface ListOfNftsProps {
  nfts: Nft[];
}

const ListOfNfts = ({ nfts }: ListOfNftsProps) => {
  const methods = useForm();

  const searchFieldText = methods.watch(['searchNfts'])[0];
  const nftWithSearchQuery =
    searchFieldText?.length > 0
      ? nfts.filter(
          (nft) =>
            nft.title.toLowerCase().indexOf(searchFieldText?.toLowerCase()) !==
            -1,
        )
      : nfts;
  return (
    <section className="ListOfNfts">
      <FormProvider {...methods}>
        <ListNavigation title="NFT Populaires" viewAllLink="/allNfts" />
      </FormProvider>
      <div className="ListOfNfts__items">
        {nftWithSearchQuery.map((nft) => (
          <NftCard key={nft.id} nft={nft} />
        ))}
      </div>
    </section>
  );
};

export default ListOfNfts;
