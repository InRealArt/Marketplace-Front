'use client';
import React from 'react';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import Button from '@/components/Button/Button';

const WalletEmptyState = () => {
  const { openConnectModal } = useConnectModal();

  return (
    <section className="WalletEmptyState">
      <h1 className="WalletEmptyState__title">
      Your web3 wallet is not connected
      </h1>
      <p className="WalletEmptyState__description">
        Please connect your wallet if you wish to view your NFTs and various statistics
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
