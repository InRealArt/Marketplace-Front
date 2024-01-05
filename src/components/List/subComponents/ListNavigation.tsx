'use client';
import Button from '@/components/Button/Button';
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
        <input
          className="ListNavigation__search"
          type="search"
          placeholder="Research what you want !"
          {...register('searchNfts')}
        />
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
