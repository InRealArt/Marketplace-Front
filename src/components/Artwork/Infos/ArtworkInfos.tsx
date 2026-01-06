'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ReadMore } from '@/components/utils/ReadMore';
import DescriptionModal from '@/components/Modal/DescriptionModal';
import dynamic from 'next/dynamic';
import { ItemPhysicalType, ArtistWithRelations } from '@/types';
import ArtworkPrice from './ArtworkPrice';
import TrustSignals from './TrustSignals';
import ShareModal from '@/components/Modal/ShareModal';
import { Share2 } from 'lucide-react';
import FavoriteButton from '@/components/Common/FavoriteButton';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface ArtworkInfosProps {
  artwork: ItemPhysicalType
  artist: ArtistWithRelations | null | undefined
  additionalClassName?: string
}

const ArtworkInfos = ({ artwork, artist, additionalClassName }: ArtworkInfosProps) => {
  const { name, description, tags = [] } = artwork.item || {};
  const itemMeta = artwork.item ? (artwork.item as any) : {}
  const artworkCategory = itemMeta.category || 'Painting'
  const artworkDimensions = itemMeta.dimensions || '80 × 80 cm'
  const [showDescriptionModal, setShowDescriptionModal] = useState<boolean>(false);

  return (
    <div className={`rounded-[10px] w-full lg:w-[30%] h-full lg:sticky lg:top-[100px] ${additionalClassName}`}>
      <div className="flex items-center justify-between mb-[30px]">
        <div className="sm:text-[15px]">
          <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
          <Link href={`/artists/${artist?.slug}`} className="text-xs md:text-sm tracking-[-0.25px]">
            by {artist?.pseudo}
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ShareModal
            url={`/artworks/${artwork.item.slug}`}
            title={name || 'Check out this amazing artwork'}
          >
            <button
              onClick={() => { }}
              className={`group transition-transform cursor-pointer`}
              aria-label='Share this artwork'
            >
              <Share2 className='text-white' width={20} height={20} />
            </button>
          </ShareModal>
          <FavoriteButton artworkId={String(artwork.id)} variant='minimal' />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 rounded-full border border-white/10 bg-white/10 text-white text-xs font-medium backdrop-blur-sm">
          {artworkCategory}
        </span>
        <span className="px-3 py-1 rounded-full border border-white/10 bg-white/10 text-white text-xs font-medium backdrop-blur-sm">
          {artworkDimensions}
        </span>
      </div>

      {Array.isArray(tags) && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full border border-white/10 bg-white/10 text-white text-xs font-medium backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="text-[16px] mb-4">
        <ReadMore
          additionalClassName="text-[16px] font-poppins"
          id="artwork-description"
          text={description || ''}
          amountOfWords={35}
          action={() => setShowDescriptionModal(true)}
        />
        {/* <DescriptionModal
            showDescriptionModal={showDescriptionModal}
            setShowDescriptionModal={setShowDescriptionModal}
            description={description || ''}
            name={name || ''}
          /> */}
      </div>

      <hr className='my-6 h-[1px] border-none bg-white/10' />
      <ArtworkPrice artwork={artwork} />
      <TrustSignals />
    </div>
  );
};

export default ArtworkInfos;
