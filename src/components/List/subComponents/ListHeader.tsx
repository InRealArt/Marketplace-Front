'use client';
import SelectedFilters from './SelectedFilters';
import ListNavigation from './ListNavigation';
import ListFilters from './ListFilters';
import { ListNavigationType } from '@/types';
import Button from '@/components/Button/Button';

interface ListHeaderProps {
  nav: ListNavigationType[];
  filters: string[];
  additionalClassName?: string;
  viewAllLink?: string;
  navActive: ListNavigationType;
  setNavActive: React.Dispatch<React.SetStateAction<ListNavigationType>>;
  onlyToBuy: boolean;
  setOnlyToBuy: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListHeader = ({
  nav,
  filters,
  additionalClassName,
  viewAllLink,
  navActive,
  onlyToBuy,
  setNavActive,
  setOnlyToBuy,
}: ListHeaderProps) => {
  return (
    <>
      <div className={`flex flex-col items-start justify-start border-none ${additionalClassName} font-montserrat lg:border-solid lg:flex-row lg:items-center lg:justify-between lg:border-b-2 lg:border-[#3d3d3d]`}>
        <ListNavigation
          nav={nav}
          navActive={navActive}
          setNavActive={setNavActive}
          viewAllLink={viewAllLink}
        />
        <ListFilters
          filters={filters}
          viewAllLink={viewAllLink}
          setOnlyToBuy={setOnlyToBuy}
          onlyToBuy={onlyToBuy}
        />
      </div>
      {/* {navActive.context === 'nft' && <Button
        action={() => setOnlyToBuy(!onlyToBuy)}
        text="Show only NFTs to buy"
        additionalClassName='whiteBorder onlyToBuy'
        activeClassName={`${onlyToBuy ? "active" : ""}`}
      />} */}
      <SelectedFilters />
    </>
  );
};

export default ListHeader;
