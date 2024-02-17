import { WalletTabs } from '@/utils/constants';
import React from 'react';

interface WalletNavProps {
  navItems: {
    id: WalletTabs;
    text: string;
    icon: JSX.Element;
    callBack?: () => unknown;
  }[];
  activeTab: WalletTabs;
}

const WalletNav = ({ navItems, activeTab }: WalletNavProps) => {
  return (
    <section className="Wallet__nav">
      <h2 className="Wallet__title">Menu</h2>
      <div className="Wallet__content">
        <div className="Wallet__navItems">
          {navItems.map((navItem) => (
            <div
              key={navItem.id}
              onClick={navItem.callBack}
              className={`Wallet__navItem ${
                activeTab === navItem.id ? 'Wallet__navItem--active' : ''
              }`}
            >
              {' '}
              {navItem.icon}
              <span>{navItem.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WalletNav;
