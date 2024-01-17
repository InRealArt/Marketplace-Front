'use client';
import React, { useState } from 'react';
import WalletNav from './subComponents/WalletNav';
import { WalletTabs } from '@/utils/constants';
import WalletHistory from './subComponents/WalletHistory';
import WalletMainCoin from './subComponents/WalletMainCoin';
import WalletGlobalView from './subComponents/WalletGlobalView';

const Wallet = () => {
  const [activeTab, setActiveTab] = useState(WalletTabs.WALLET);
  return (
    <main className="Wallet">
      <WalletNav activeTab={activeTab} />
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
