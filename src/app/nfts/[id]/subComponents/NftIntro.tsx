'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Nft } from '@/mocks/types';
import Link from 'next/link';
import NftPrice from './NftPrice';
import { exampleConfig } from '../config';
import { ReadMore } from '@/components/utils/ReadMore';
import DescriptionModal from '@/components/Modal/DescriptionModal';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const NftIntro = (props: Partial<Nft>) => {
  const { name, likes, description, artist, img } = props;
  const [showDescriptionModal, setShowDescriptionModal] =
    useState<boolean>(false);
  return (
    <section className="Nft__intro">
      <div
        className="Nft__image"
        style={{
          backgroundImage: ` url('${img}')`,
        }}
      >
        <div className="Nft__actions">
          <p className="Nft__action">Share</p>
          <p className="Nft__action">{likes} likes</p>
        </div>

        <div className="Nft__label">IRA communautaire</div>
      </div>
      <div className="Nft__infos">
        <div className="Nft__artist">
          {artist?.img && (
            <Image
              className="Nft__artist__image"
              priority={true}
              alt="My NFT"
              src={artist?.img}
              width={28}
              height={28}
            />
          )}
          <div className="Nft__artist__name">
            <Link href={`/artists/${artist?.id}`}>{artist?.name}</Link>
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
          />
        </div>
      </div>
      <NftPrice {...props} />
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
