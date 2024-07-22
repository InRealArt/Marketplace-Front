'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NftPrice from './NftPrice';
import { ReadMore } from '@/components/utils/ReadMore';
import DescriptionModal from '@/components/Modal/DescriptionModal';
import dynamic from 'next/dynamic';
import { ArtistType, NftType } from '@/types';
import { getImageFromUri } from '@/utils/getImageFromUri';
import { Address } from 'viem';
import { ArrowBigLeft, ArrowBigRight, Share2, StarsIcon } from 'lucide-react';
import { TransactionData, fetchTransactionsByNft } from '@/lib/transactions';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface NftIntroProps {
  nft: Partial<NftType>
  artist: ArtistType | null | undefined
  contractAddress: Address
}
const NftIntro = ({ nft, artist, contractAddress }: NftIntroProps) => {
  const { name, description, imageUri, mockups } = nft;
  const [showDescriptionModal, setShowDescriptionModal] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const [transactions, setTransactions] = useState<TransactionData[]>();

  const images = mockups ? [...[getImageFromUri(imageUri || "")], ...mockups] : [getImageFromUri(imageUri || "")]

  const fetchTransactionsData = async () => {
    const transactionsByNft = await fetchTransactionsByNft(nft.tokenId, contractAddress)
    setTransactions(transactionsByNft.filter(transaction => transaction.functionName === 'purchaseItem') as TransactionData[])
  };

  useEffect(() => {
    fetchTransactionsData()
  }, [])

  const dates = transactions?.map(transaction => `${transaction.created_at}`)
  const prices = transactions?.map(transaction => Number(transaction.price))

  const series = [
    {
      name: 'ETH price',
      data: prices?.length ? prices : [0]
    },
  ]

  const options = {
    fontFamily: 'Poppins, sans-serif',
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        autoSelected: 'pan',
        show: false,
      },
    },
    markers: {
      size: 5
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [5, 5, 4],
      curve: 'smooth'
    },
    colors: ['#b39e73'],
    yaxis: {
      labels: {
        style: {
          colors: '#ffffff',
        },
      },
    },
    xaxis: {
      type: 'datetime',
      categories: dates?.length ? dates : [new Date()],
      labels: {
        style: {
          colors: '#ffffff',
        },
      },
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
      theme: 'dark',
    },
  }

  return (
    <section className="Nft__intro">
      {imageUri && <div
        className="Nft__image"
        style={{
          backgroundImage: ` url('${images[currentImageIndex]}')`,
        }}
      >
        {currentImageIndex !== 0 && <ArrowBigLeft className='Nft__arrow Nft__arrow--left' onClick={() => setCurrentImageIndex(currentImageIndex - 1)} />}
        {currentImageIndex + 1 !== images.length && <ArrowBigRight className='Nft__arrow Nft__arrow--right' onClick={() => setCurrentImageIndex(currentImageIndex + 1)} />}
        <div className="Nft__actions">
          <p className="Nft__action"><Share2 width={20} height={20} className='Nft__actionIcon' /> Share</p>
        </div>

        <div className="Nft__label"><StarsIcon width={18} height={18} />IRA exclusive</div>
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
            amountOfWords={35}
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
        contractAddress={contractAddress}
      />
      <ReactApexChart
        className="NftGraphic"
        series={series as ApexAxisChartSeries}
        options={options as ApexCharts.ApexOptions | undefined}
        type="area"
        width={'100%'}
        height={250}
      />
    </section>
  );
};

export default NftIntro;
