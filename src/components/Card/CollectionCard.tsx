import React from 'react';
import { CollectionType } from '@/types';
import { useAppSelector } from '@/redux/hooks';
import { getNftsByCollection } from '@/redux/reducers/nfts/selectors';
import { getImageFromUri } from '@/utils/getImageFromUri';

interface CollectionCardProps {
  collection: CollectionType;
}

const CollectionCard = ({ collection }: CollectionCardProps) => {
  const { id, symbol } = collection;
  const nfts = useAppSelector((state) => getNftsByCollection(state, id))
  const imgUri = nfts[0]?.imageUri

  return (
    <div className="ArtistCard">
      {imgUri && <div
        className="ArtistCard__background"
        style={{
          backgroundImage: ` url('${getImageFromUri(imgUri)}')`,
        }}
      />}
      <div className="ArtistCard__infos">
        <div>
          <h2 className="ArtistCard__title">{symbol}</h2>
          <p className="ArtistCard__nfts">{nfts.length} nfts</p>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
