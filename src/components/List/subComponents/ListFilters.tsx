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
    <section className="flex justify-end items-center gap-5 w-full mt-[30px] lg:w-[45%] lg:mt-0">
      <Search />

      {filters.length > 0 && <FilterTags filters={filters} />}

      {viewAllLink && (
        <Button
          link={viewAllLink}
          text="View All"
          additionalClassName="viewAll"
          className="hidden lg:flex"
        />
      )}
    </section>
  );
};

const Search = () => {
  const { register } = useFormContext();
  return (
    <div className="relative w-full flex-auto">
      <input
        className="flex w-full h-[54px] items-center py-[15px] px-[30px] rounded-[10px] border border-white text-white bg-transparent font-semibold font-montserrat text-base lg:text-xl"
        type="search"
        placeholder="Research"
        {...register('search')}
      />
      <SearchIcon className="absolute right-5 top-1/2 transform -translate-y-1/2" width={28} height={28} />
    </div>
  );
};

const FilterTags = ({ filters }: { filters: string[] }) => {
  const { register } = useFormContext();
  const placement = 'bottom-end';

  return (
    <div>
      <Popup
        placement={placement}
        buttonTrigger={
          <PopoverButton className="font-poppins text-lg md:text-base tracking-[-1px] font-medium flex py-[15px] px-[30px] text-center justify-center items-center gap-2.5 rounded-[10px] border border-white text-white bg-transparent cursor-pointer md:py-[15px] md:px-[15px]">
            Filter
            <ChevronDown width={28} height={28} />
          </PopoverButton>
        }
      >
        <div className="flex flex-col gap-[15px] max-h-[70vh] overflow-auto">
          {filters.map((filter) => {
            return (
              <div key={`${filter}__popup`} className="flex items-center font-medium font-poppins text-[18px] tracking-[-0.25px]">
                <input
                  {...register('filters')}
                  type="checkbox"
                  value={filter}
                  className="cursor-pointer appearance-none bg-transparent w-[28px] h-[28px] border-2 border-white rounded-[5px] grid place-content-center before:content-[''] before:w-[14px] before:h-[14px] before:rounded-[2px] before:scale-0 before:transition-transform before:duration-120 before:ease-in-out before:bg-[#b39e73] checked:before:scale-100"
                />
                <label htmlFor={filter} className="ml-[20px]">{filter}</label>
              </div>
            );
          })}
        </div>
      </Popup>
    </div>
  );
};

export default ListFilters;
