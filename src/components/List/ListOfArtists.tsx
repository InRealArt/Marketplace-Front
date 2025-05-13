import { useBackofficeUserStore } from '@/store/backofficeUserStore';
import List from './List';
import { ListNavigationType } from '@/types';
import { useEffect } from 'react';
import { useItemsStore } from '@/store/itemsStore';

interface ListOfArtistsProps {
  nav: ListNavigationType[];
}

const ListOfArtists = ({ nav }: ListOfArtistsProps) => {
  const { fetchUsers, isLoading } = useBackofficeUserStore();
  const { fetchItems } = useItemsStore();
  useEffect(() => {
    fetchUsers();
    fetchItems();
  }, [fetchUsers, fetchItems]);
  
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