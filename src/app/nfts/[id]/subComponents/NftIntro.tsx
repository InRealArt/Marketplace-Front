import React from 'react';
import { Nft } from '@/mocks/types';
import Link from 'next/link';
import NftPrice from './NftPrice';
import Chart from 'react-apexcharts';
import { exampleConfig } from '../config';

const NftIntro = (props: Partial<Nft>) => {
  const { name, likes, description, artist, img } = props;
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
          <div
            className="Nft__artist__image"
            style={{
              backgroundImage: ` url('${artist?.img}')`,
            }}
          />
          <div className="Nft__artist__name">
            <Link href={`/artists/${artist?.id}`}>{artist?.name}</Link>
            <h3>{name}</h3>
          </div>
        </div>
        <div className="Nft__description">
          <h3 className="Nft__description__title">Description</h3>
          <p
            className="Nft__description__text"
            dangerouslySetInnerHTML={{ __html: description || '' }}
          />
        </div>
      </div>
      <NftPrice {...props} />
      <Chart
        className="NftGraphic"
        series={exampleConfig.series}
        options={exampleConfig.options as ApexCharts.ApexOptions | undefined}
        type="candlestick"
        height={300}
      />
    </section>
  );
};

export default NftIntro;
