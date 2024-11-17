import React from 'react';
import { NftType } from '@/types';

interface NftTagsProps {
  tags?: NftType['tags'];
}
const NftTags = ({ tags }: NftTagsProps) => {
  return (
    <section className="Nft__tagsSection">
      <h1>Associated Tags</h1>
      <div className="Nft__tags">
        {tags?.map((filter: string) => (
          <span key={filter} className="Nft__tag">
            {filter}
          </span>
        ))}
      </div>
    </section>
  );
};

export default NftTags;
