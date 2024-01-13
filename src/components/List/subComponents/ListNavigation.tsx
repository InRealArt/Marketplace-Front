'use client';
import Button from '@/components/Button/Button';
import Image from 'next/image';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface ListNavigationProps {
  nav: string[];
  additionalClassName?: string;
  viewAllLink?: string;
}

const ListNavigation = ({
  nav,
  additionalClassName,
  viewAllLink,
}: ListNavigationProps) => {
  const { register } = useFormContext();
  const [navActive, setNavActive] = useState(nav[0]);

  return (
    <div className={`ListNavigation ListNavigation--${additionalClassName}`}>
      <div className="ListNavigation__nav">
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
      </div>

      <section className="ListNavigation__filters">
        <div className="ListNavigation__searchContainer">
          <input
            className="ListNavigation__search"
            type="search"
            placeholder="Research"
            {...register('search')}
          />

          <Image
            className="ListNavigation__search--icon"
            priority={true}
            alt="Search Icon"
            src="/icons/Search.png"
            width={29}
            height={28}
          />
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
  );
};

export default ListNavigation;
