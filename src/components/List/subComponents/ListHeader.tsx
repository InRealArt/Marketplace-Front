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
      <div className={`ListHeader ListHeader--${additionalClassName}`}>
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
