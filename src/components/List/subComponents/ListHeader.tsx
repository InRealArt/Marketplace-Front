'use client';
import { useState } from 'react';
import SelectedFilters from './SelectedFilters';
import ListNavigation from './ListNavigation';
import ListFilters from './ListFilters';

interface ListHeaderProps {
  nav: string[];
  filters: string[];
  additionalClassName?: string;
  viewAllLink?: string;
}

const ListHeader = ({
  nav,
  filters,
  additionalClassName,
  viewAllLink,
}: ListHeaderProps) => {
  const [navActive, setNavActive] = useState<string>(nav[0]);
  return (
    <>
      <div className={`ListHeader ListHeader--${additionalClassName}`}>
        <ListNavigation
          nav={nav}
          navActive={navActive}
          setNavActive={setNavActive}
        />
        <ListFilters filters={filters} viewAllLink={viewAllLink} />
      </div>
      <SelectedFilters />
    </>
  );
};

export default ListHeader;
