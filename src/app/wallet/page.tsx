'use client';
import React, { useState } from 'react';
import WalletNav from './subComponents/WalletNav';
import { WalletTabs } from '@/utils/constants';
import WalletHistory from './subComponents/WalletHistory';
import WalletMainCoin from './subComponents/WalletMainCoin';
import WalletGlobalView from './subComponents/WalletGlobalView';
import { WalletIcon } from 'lucide-react';
import Image from 'next/image';

const Wallet = () => {
  const [activeTab, setActiveTab] = useState(WalletTabs.WALLET);
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
      id: WalletTabs.LINK_TO_WALLET,
      text: 'Link Wallet',
      icon: (
        <Image
          priority={true}
          alt="My NFT"
          src="/icons/Etheru.svg"
          width={28}
          height={28}
        />
      ),
      callBack: () => {
        setActiveTab(WalletTabs.LINK_TO_WALLET);
      },
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
  return (
    <main className="Wallet">
      <WalletNav navItems={navItems} activeTab={activeTab} />
      <section className="Wallet__main">
        <h2 className="Wallet__title">Value History</h2>
        <div className="Wallet__content">
          {activeTab === WalletTabs.WALLET && <WalletHistory />}
        </div>
      </section>
      <section className="Wallet__rightTop">
        <h2 className="Wallet__title">Main coin</h2>
        <div className="Wallet__content">
          {activeTab === WalletTabs.WALLET && <WalletMainCoin />}
        </div>
      </section>

      <section className="Wallet__rightBottom">
        <h2 className="Wallet__title">Global View</h2>
        <div className="Wallet__content">
          {activeTab === WalletTabs.WALLET && <WalletGlobalView />}
        </div>
      </section>
    </main>
  );
};

export default Wallet;
