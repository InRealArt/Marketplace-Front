'use client';
import Button from '@/components/Button/Button';
import { ChevronDown, Search as SearchIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { Button as PopoverButton } from '@nextui-org/react';
import Popup from '@/components/Popup/Popup';

interface ListFiltersProps {
  filters: string[];
  viewAllLink?: string;
  onlyToBuy: boolean;
  setOnlyToBuy: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListFilters = ({ filters, viewAllLink, setOnlyToBuy, onlyToBuy }: ListFiltersProps) => {
  return (
    <section className="ListHeader__filters">
      <Search />
      {/* <Button
        action={() => setOnlyToBuy(!onlyToBuy)}
        text="Show NFTs to buy" /> */}

      {filters.length > 0 && <FilterTags filters={filters} />}

      {viewAllLink && (
        <Button
          link={viewAllLink}
          text="View All"
          additionalClassName="viewAll"
        />
      )}
    </section>
  );
};

const Search = () => {
  const { register } = useFormContext();
  return (
    <div className="ListHeader__searchContainer">
      <input
        className="ListHeader__search"
        type="search"
        placeholder="Research"
        {...register('search')}
      />
      <SearchIcon className="ListHeader__search--icon" width={28} height={28} />
    </div>
  );
};

const FilterTags = ({ filters }: { filters: string[] }) => {
  const { register } = useFormContext();
  const placement = 'bottom-end';

  return (
    <div className="ListHeader__filterContainer">
      <Popup
        placement={placement}
        buttonTrigger={
          <PopoverButton className="Button Button--whiteBorder">
            Filter
            <ChevronDown width={28} height={28} />
          </PopoverButton>
        }
      >
        <div className="Popup FilterPopup">
          {filters.map((filter) => {
            return (
              <div key={`${filter}__popup`} className="FilterPopup__filter">
                <input
                  {...register('filters')}
                  type="checkbox"
                  value={filter}
                />
                <label htmlFor={filter}>{filter}</label>
              </div>
            );
          })}
        </div>
      </Popup>
    </div>
  );
};

export default ListFilters;
