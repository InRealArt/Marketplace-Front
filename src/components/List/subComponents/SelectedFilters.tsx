import { useFormContext } from 'react-hook-form';
import { X } from 'lucide-react';

const SelectedFilters = () => {
  const { watch, unregister } = useFormContext();
  const filtersItems = watch(['filters']);
  return (
    <div className="ListHeader__itemsSelected">
      {filtersItems?.[0]?.map((filter: string) => {
        const index = filtersItems[0].indexOf(filter);
        return (
          <div key={`${filter}__selected`} className="ListHeader__item">
            <span>{filter}</span>
            <X onClick={() => unregister(`filters.[${index}]`)} />
          </div>
        );
      })}
      {filtersItems[0]?.length > 0 && (
        <span
          className="ListHeader__clear"
          onClick={() => unregister('filters')}
        >
          Clear all filters
        </span>
      )}
    </div>
  );
};

export default SelectedFilters;
