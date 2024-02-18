'use client';
import React from 'react';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import Button from '@/components/Button/Button';

const WalletEmptyState = () => {
  const { openConnectModal } = useConnectModal();

  return (
    <section className="WalletEmptyState">
      <h1 className="WalletEmptyState__title">
        Votre Portefeuille n&apos;est pas connecter
      </h1>
      <p className="WalletEmptyState__description">
        Veuillez connecter votre portefeuille si vous souhaitez visualisez vos
        NFTS ainsi que les différentes statistiques.
      </p>

      <section className="WalletEmptyState">
        <ConnectButton.Custom>
          {() => {
            return (
              <Button
                additionalClassName="gold"
                action={openConnectModal}
                text="Connect Wallet"
              />
            );
          }}
        </ConnectButton.Custom>
      </section>
    </section>
  );
};

export default WalletEmptyState;
