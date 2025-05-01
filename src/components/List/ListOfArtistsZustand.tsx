import { useBackofficeUserStore } from '@/store/backofficeUserStore';
import ListZustand from './ListZustand';
import { ListNavigationType } from '@/types';
import { useEffect } from 'react';
import { useNftsStore } from '@/store/nftsStore';

interface ListOfArtistsProps {
  nav: ListNavigationType[];
}

const ListOfArtistsZustand = ({ nav }: ListOfArtistsProps) => {
  const { fetchUsers, isLoading } = useBackofficeUserStore();
  const { fetchNfts } = useNftsStore();
  useEffect(() => {
    // Fetch backoffice users when the component mounts
    fetchUsers();
    fetchNfts();
  }, [fetchUsers, fetchNfts]);
  
  return (
    <section className="ListOfArtists">
      {isLoading ? (
        <div className="LoadingState">Loading artists data...</div>
      ) : (
        <ListZustand nav={nav} />
      )}
    </section>
  );
};

export default ListOfArtistsZustand; 