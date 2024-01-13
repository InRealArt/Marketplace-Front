import React from 'react';
import { Nft } from '@/mocks/types';

interface NftFiltersProps {
  filters: Nft['filters'] | undefined;
}
const NftFilters = ({ filters }: NftFiltersProps) => {
  return (
    <section className="Nft__filterSection">
      <h1>Filtres associés</h1>
      <div className="Nft__filters">
        {filters?.map((filter: string) => (
          <span key={filter} className="Nft__filter">
            {filter}
          </span>
        ))}
      </div>
    </section>
  );
};

export default NftFilters;
