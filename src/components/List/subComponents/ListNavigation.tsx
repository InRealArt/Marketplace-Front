'use client';
import Button from '@/components/Button/Button';
import { ChevronDown, Search, X } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button as PopoverButton,
} from '@nextui-org/react';

interface ListNavigationProps {
  nav: string[];
  filters: string[];
  additionalClassName?: string;
  viewAllLink?: string;
}

const ListNavigation = ({
  nav,
  filters,
  additionalClassName,
  viewAllLink,
}: ListNavigationProps) => {
  const { register, watch, unregister } = useFormContext();
  const filtersItems = watch(['filters']);
  const [navActive, setNavActive] = useState<string>(nav[0]);
  const placement = 'bottom-end';
  return (
    <>
      <div className={`ListNavigation ListNavigation--${additionalClassName}`}>
        <nav className="ListNavigation__nav">
          {nav.map((title) => (
            <h1
              key={title}
              onClick={() => setNavActive(title)}
              className={`ListNavigation__title ${
                navActive === title ? 'ListNavigation__title--active' : ''
              }`}
            >
              {title}
            </h1>
          ))}
        </nav>

        <section className="ListNavigation__filters">
          <div className="ListNavigation__searchContainer">
            <input
              className="ListNavigation__search"
              type="search"
              placeholder="Research"
              {...register('search')}
            />

            <Search
              className="ListNavigation__search--icon"
              width={28}
              height={28}
            />
          </div>

          <div className="ListNavigation__filterContainer">
            <Popover key={placement} placement={placement} showArrow>
              <PopoverTrigger>
                <PopoverButton className="Button Button--whiteBorder">
                  Filter
                  <ChevronDown width={28} height={28} />
                </PopoverButton>
              </PopoverTrigger>
              <PopoverContent>
                <div className="Popup FilterPopup">
                  {filters.map((filter) => {
                    return (
                      <div className="FilterPopup__filter">
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
              </PopoverContent>
            </Popover>
          </div>

          {viewAllLink && (
            <Button
              link={viewAllLink}
              text="View All"
              additionalClassName="viewAll"
            />
          )}
        </section>
      </div>
      <div className="ListNavigation__itemsSelected">
        {filtersItems?.[0]?.map((filter: string) => {
          const index = filtersItems[0].indexOf(filter);

          return (
            <div className="ListNavigation__item">
              <span>{filter}</span>
              <X onClick={() => unregister(`filters.[${index}]`)} />
            </div>
          );
        })}
        {filtersItems[0]?.length > 0 && (
          <span
            className="ListNavigation__clear"
            onClick={() => unregister('filters')}
          >
            Clear all filters
          </span>
        )}
      </div>
    </>
  );
};

export default ListNavigation;
