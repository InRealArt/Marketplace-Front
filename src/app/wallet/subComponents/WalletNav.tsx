import { WalletTabs } from '@/utils/constants';
import React from 'react';

interface WalletNavProps {
  activeTab: WalletTabs;
}

const WalletNav = ({ activeTab }: WalletNavProps) => {
  return (
    <section className="Wallet__nav">
      <h2 className="Wallet__title">Menu</h2>
      <div className="Wallet__content"></div>
    </section>
  );
};

export default WalletNav;
