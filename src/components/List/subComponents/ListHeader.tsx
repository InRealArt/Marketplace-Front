'use client';
import SelectedFilters from './SelectedFilters';
import ListNavigation from './ListNavigation';
import ListFilters from './ListFilters';
import { ListNavigationType } from '@/types';

interface ListHeaderProps {
  nav: ListNavigationType[];
  filters: string[];
  additionalClassName?: string;
  viewAllLink?: string;
  navActive: ListNavigationType;
  setNavActive: React.Dispatch<React.SetStateAction<ListNavigationType>>;
}

const ListHeader = ({
  nav,
  filters,
  additionalClassName,
  viewAllLink,
  navActive,
  setNavActive
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
        <ListFilters filters={filters} viewAllLink={viewAllLink} />
      </div>
      <SelectedFilters />
    </>
  );
};

export default ListHeader;
