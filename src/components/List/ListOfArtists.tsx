import { useBackofficeUserStore } from '@/store/backofficeUserStore';
import List from './List';
import { ListNavigationType } from '@/types';
import { useEffect } from 'react';
import { useNftsStore } from '@/store/nftsStore';

interface ListOfArtistsProps {
  nav: ListNavigationType[];
}

const ListOfArtists = ({ nav }: ListOfArtistsProps) => {
  const { fetchUsers, isLoading } = useBackofficeUserStore();
  const { fetchNfts } = useNftsStore();
  useEffect(() => {
    fetchUsers();
    fetchNfts();
  }, [fetchUsers, fetchNfts]);
  
  return (
    <section className="ListOfArtists">
      {isLoading ? (
        <div className="LoadingState">Loading artists data...</div>
      ) : (
        <List nav={nav} />
      )}
    </section>
  );
};

export default ListOfArtists; 