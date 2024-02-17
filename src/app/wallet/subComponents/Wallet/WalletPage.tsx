'use client';
import React from 'react';
import { useAccount, useBalance } from 'wagmi';

import { useAccountModal } from '@rainbow-me/rainbowkit';
import { useEthPrice } from '@/utils/getETHPrice';

import WalletHistory from './WalletHistory';
import WalletMainCoin from './WalletMainCoin';
import WalletGlobalView from './WalletGlobalView';

const WalletPage = () => {
  const { openAccountModal } = useAccountModal();
  const { address } = useAccount();
  const { data } = useBalance({ address });

  const { ethPrice: ethEuroPrice } = useEthPrice('eur');

  const currentEthValue = ethEuroPrice
    ? Number(data?.formatted) * ethEuroPrice
    : 0;

  // const result  = useContractRead({
  //   abi: abi,
  //   address: contractAdress,
  //   functionName: 'balanceOf',
  //   args: [address]
  // });

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
        <h2 className="Wallet__title">Value History</h2>
        <div className="Wallet__content">
          <WalletHistory chains={chains} />
        </div>
      </section>
      <section className="Wallet__rightTop">
        <h2 className="Wallet__title">Main coin</h2>
        <div className="Wallet__content">
          <WalletMainCoin
            action={openAccountModal}
            name={chains[0].symbol}
            quantity={chains[0].quantity}
            totalValue={chains[0].totalValue}
          />
        </div>
      </section>

      <section className="Wallet__rightBottom">
        <h2 className="Wallet__title">Global View</h2>
        <div className="Wallet__content">
          <WalletGlobalView />
        </div>
      </section>
    </>
  );
};

export default WalletPage;
