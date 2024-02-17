'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import { WalletIcon } from 'lucide-react';
import { WalletTabs } from '@/utils/constants';

import WalletNav from './subComponents/Wallet/WalletNav';

import WalletEmptyState from './EmptyState';

// BLOCKCHAIN
import { contractAdress, abi } from '@/utils/constants';

import { useContractRead } from 'wagmi';
import { useNftOwned } from '@/utils/getAllNfts';
import NftPage from './subComponents/Nft/NftPage';
import WalletPage from './subComponents/Wallet/WalletPage';

const Wallet = () => {
  const navItems: {
    id: WalletTabs;
    text: string;
    icon: JSX.Element;
    callBack?: () => unknown;
  }[] = [
    {
      id: WalletTabs.WALLET,
      text: 'Wallet',
      icon: <WalletIcon width={28} height={28} />,
      callBack: () => setActiveTab(WalletTabs.WALLET),
    },
    {
      id: WalletTabs.NFT,
      text: 'My Nft',
      icon: (
        <Image
          priority={true}
          alt="My NFT"
          src="/icons/NftIcon.svg"
          width={28}
          height={28}
        />
      ),
      callBack: () => setActiveTab(WalletTabs.NFT),
    },
  ];

  const { isConnected, address } = useAccount();
  const [activeTab, setActiveTab] = useState(WalletTabs.WALLET);

  // const result  = useContractRead({
  //   abi: abi,
  //   address: contractAdress,
  //   functionName: 'balanceOf',
  //   args: [address]
  // });

  const { nftsOwned } = useNftOwned(address || '');

  return (
    <main
      className={`Wallet Wallet--is${activeTab} ${
        !isConnected ? 'Wallet--isDisconnected' : ''
      }`}
    >
      <WalletNav navItems={navItems} activeTab={activeTab} />
      {isConnected ? (
        <>
          {activeTab === WalletTabs.WALLET && <WalletPage />}
          {activeTab === WalletTabs.NFT && <NftPage nftsOwned={nftsOwned} />}
        </>
      ) : (
        <WalletEmptyState />
      )}
    </main>
  );
};

export default Wallet;
