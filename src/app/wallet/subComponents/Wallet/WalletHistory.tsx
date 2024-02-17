import Image from 'next/image';
import React, { useState } from 'react';

interface Props {
  chains: {
    symbol: string;
    quantity: string;
    totalValue: number;
  }[];
}

const WalletHistory = ({ chains }: Props) => {
  const tabs = ['Semaine', 'Mois', 'Année'];
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  return (
    <section className="WalletHistory">
      <div className="WalletHistory__tabs">
        {tabs.map((tab) => (
          <p
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`WalletHistory__tab ${
              tab === activeTab && 'WalletHistory__tab--active'
            }`}
          >
            {tab}
          </p>
        ))}
      </div>
      {chains.map((currency) => (
        <div key={currency.symbol} className="WalletHistory__currency">
          <Image
            className="WalletHistory__image"
            priority={true}
            alt="My NFT"
            src="/icons/Etheru.svg"
            width={48}
            height={48}
          />
          <div className="WalletHistory__infos">
            <h2>{currency.symbol}</h2>
            <p>{currency.quantity}</p>
          </div>

          <h2 className="WalletHistory__totalValue">{currency.totalValue} €</h2>
        </div>
      ))}
    </section>
  );
};

export default WalletHistory;
