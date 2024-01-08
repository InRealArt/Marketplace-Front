'use client';
import Button from '@/components/Button/Button';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';

interface ListNavigationProps {
  title: string;
  additionalClassName?: string;
  viewAllLink?: string;
}

const ListNavigation = ({
  title,
  additionalClassName,
  viewAllLink,
}: ListNavigationProps) => {
  const { register } = useFormContext();

  return (
    <div className={`ListNavigation ListNavigation--${additionalClassName}`}>
      <h1 className="ListNavigation__title ListNavigation__title--active">
        {title}
      </h1>

      <section className="ListNavigation__filters">
        <div className="ListNavigation__searchContainer">
          <input
            className="ListNavigation__search"
            type="search"
            placeholder="Research"
            {...register('searchNfts')}
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
