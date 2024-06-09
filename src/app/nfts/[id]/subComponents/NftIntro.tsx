'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NftPrice from './NftPrice';
import { exampleConfig } from '../config';
import { ReadMore } from '@/components/utils/ReadMore';
import DescriptionModal from '@/components/Modal/DescriptionModal';
import dynamic from 'next/dynamic';
import { ArtistType, NftType } from '@/types';
import { getImageFromUri } from '@/utils/getImageFromUri';
import { Address } from 'viem';
import { Share2 } from 'lucide-react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface NftIntroProps {
  nft: Partial<NftType>
  artist: ArtistType | null | undefined
  sold: boolean | undefined
  contractAddress: Address
}
const NftIntro = ({ nft, artist, sold, contractAddress }: NftIntroProps) => {
  const { name, description, imageUri } = nft;
  const [showDescriptionModal, setShowDescriptionModal] = useState<boolean>(false);
  return (
    <section className="Nft__intro">
      {imageUri && <div
        className="Nft__image"
        style={{
          backgroundImage: ` url('${getImageFromUri(imageUri)}')`,
        }}
      >
        <div className="Nft__actions">
          <p className="Nft__action"><Share2 width={20} height={20} className='Nft__actionIcon' /> Share</p>
        </div>

        <div className="Nft__label">IRA communautaire</div>
      </div>}
      <div className="Nft__infos">
        <div className="Nft__artist">
          {artist?.imageUrl && (
            <Image
              className="Nft__artist__image"
              priority={true}
              alt="My NFT"
              src={artist?.imageUrl}
              width={28}
              height={28}
            />
          )}
          <div className="Nft__artist__name">
            <Link href={`/artists/${artist?.id}`}>{artist?.pseudo}</Link>
            <h3>{name}</h3>
          </div>
        </div>
        <div className="Nft__description">
          <h3 className="Nft__description__title">Description</h3>
          <ReadMore
            additionalClassName="Nft__description"
            id="nft-description"
            text={description || ''}
            amountOfWords={20}
            action={() => setShowDescriptionModal(true)}
          />
          <DescriptionModal
            showDescriptionModal={showDescriptionModal}
            setShowDescriptionModal={setShowDescriptionModal}
            description={description || ''}
            name={name || ''}
          />
        </div>
      </div>
      <NftPrice
        nft={nft}
        sold={sold}
        contractAddress={contractAddress}
      />
      <ReactApexChart
        className="NftGraphic"
        series={exampleConfig.series}
        options={exampleConfig.options as ApexCharts.ApexOptions | undefined}
        type="area"
        width={'100%'}
        height={250}
      />
    </section>
  );
};

export default NftIntro;
