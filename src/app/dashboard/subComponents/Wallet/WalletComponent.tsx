'use client';
import React from 'react';
import { useAccount, useBalance } from 'wagmi';

import { useEthPrice } from '@/customHooks/getETHPrice';

import WalletMainCoin from './subComponents/WalletMainCoin';
import { formatUnits } from 'viem';
import NftList from './subComponents/NftList';
import WalletMainInfos from './subComponents/WalletMainInfos';

const WalletPage = () => {
  // const [currentNft, setCurrentNft] = useState<NftType | null>()
  const { address } = useAccount();
  const { data } = useBalance({ address });
  const { ethPrice: ethEuroPrice } = useEthPrice('eur');
  const balance = data && formatUnits(data!.value, data!.decimals)

  const currentEthValue = ethEuroPrice
    ? Number(balance) * ethEuroPrice
    : 0;

  const chains = [
    {
      symbol: data?.symbol ?? '',
      quantity: Number(data?.formatted).toFixed(2) ?? '',
      totalValue: Math.round(currentEthValue * 100) / 100,
    },
  ];

  return (
    <>
      <section className="Wallet__main">
        <h2 className="Wallet__title">Main Informations</h2>
        <div className="Wallet__content">
          <WalletMainInfos />
        </div>
      </section>
      <section className="Wallet__rightTop">
        <h2 className="Wallet__title">Main coin</h2>
        <div className="Wallet__content">
          <WalletMainCoin
            name={chains[0].symbol}
            quantity={chains[0].quantity}
            totalValue={chains[0].totalValue}
          />
        </div>
      </section>

      <section className="Wallet__rightBottom">
        <h2 className="Wallet__title">NFT List</h2>
        <div className="Wallet__content">
          <NftList />
        </div>
      </section>
    </>
  );
};

export default WalletPage;
