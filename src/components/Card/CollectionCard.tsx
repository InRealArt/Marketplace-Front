import React from 'react';
import { CollectionType } from '@/types';
import { getImageFromUri } from '@/utils/getImageFromUri';
import { useNftsStore } from '@/store/nftsStore';

interface CollectionCardProps {
  collection: CollectionType;
}

const CollectionCard = ({ collection }: CollectionCardProps) => {
  const { id, symbol } = collection;
  const { getNftsByCollection } = useNftsStore();
  const nfts = getNftsByCollection(id)
  const imgUri = nfts[0]?.mainImageUrl

  return (
    <div className="relative w-full mt-10 h-auto rounded-[17px] bg-white sm:w-[calc(50%-10px)] md:w-[calc(33.333%-20px)] lg:w-[calc(25%-20px)]">
      {imgUri && <div
        className="relative w-auto h-[180px] rounded-t-[17px] bg-no-repeat bg-cover bg-center md:h-[150px] lg:h-[185px]"
        style={{
          backgroundImage: `url('${getImageFromUri(imgUri)}')`,
        }}
      />}
      <div className="relative flex items-end px-2.5 -top-2.5 md:p-5 md:items-center md:top-0">
        <div>
          <h2 className="font-poppins text-base font-medium mb-1.5 text-[#1d1d1b] md:text-[22px] md:font-semibold md:mb-0">{symbol}</h2>
          <p className="hidden md:block font-poppins text-base font-medium text-[#1d1d1b] m-0">{nfts.length} nfts</p>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
