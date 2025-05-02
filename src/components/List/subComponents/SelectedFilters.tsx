import { useFormContext } from 'react-hook-form';
import { X } from 'lucide-react';

const SelectedFilters = () => {
  const { watch, unregister } = useFormContext();
  const filtersItems: string[][] = watch(['filters']);

  return (
    <div className="flex flex-wrap items-center gap-5 mt-5">
      {(filtersItems?.[0] || []).map((filter: string) => {
        const index = filtersItems[0].indexOf(filter);
        return (
          <div key={`${filter}__selected`} className="inline-flex p-[15px_10px] justify-center items-center gap-2.5 rounded-[10px] bg-[#525252] font-poppins text-lg cursor-pointer">
            <span>{filter}</span>
            <X onClick={() => unregister(`filters.[${index}]`)} />
          </div>
        );
      })}
      {filtersItems[0]?.length > 0 && (
        <span
          className="font-poppins text-lg cursor-pointer"
          onClick={() => unregister('filters')}
        >
          Clear all filters
        </span>
      )}
    </div>
  );
};

export default SelectedFilters;
