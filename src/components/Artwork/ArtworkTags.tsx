import React from 'react';
import { ItemPhysicalType } from '@/types';

interface ArtworkTagsProps {
  tags?: ItemPhysicalType['Item']['tags'];
}
const ArtworkTags = ({ tags }: ArtworkTagsProps) => {
  return (
    <section className="mt-5">
      <h1 className="mb-4 text-2xl font-medium text-white">Associated Tags</h1>
      <div className="flex flex-wrap items-center gap-y-5 gap-x-2.5 p-5 rounded-[10px] border border-[#a6a6a6] bg-[#313130]">
        {tags?.map((filter: string) => (
          <span 
            key={filter} 
            className="px-[15px] py-[13px] rounded-[10px] border border-white bg-[rgba(84,84,84,0.3)] backdrop-blur-[26px] text-sm"
          >
            {filter}
          </span>
        ))}
      </div>
    </section>
  );
};

export default ArtworkTags;
