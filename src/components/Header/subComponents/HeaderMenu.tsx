'use client';
import React from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
interface HeaderMenuProps {
  hideMenu: () => void;
}

const WalletLink = ({ hideMenu }: HeaderMenuProps) => {
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();

  const { data } = useBalance({ address });

  return (
    <ConnectButton.Custom>
      {({ account, chain, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;
        if (!connected) {
          return (
            <p className="HeaderMenu__link" onClick={openConnectModal}>
              Connect Wallet
            </p>
          );
        }

        return (
          <Link
            className="HeaderMenu__link HeaderMenu__link--wallet"
            href={'/wallet'}
            onClick={hideMenu}
          >
            <span className="HeaderMenu__adress">{account.address}</span>
            <p className="HeaderMenu__balance">
              {Number(data?.formatted)?.toFixed(1)} {data?.symbol}
            </p>
          </Link>
        );
      }}
    </ConnectButton.Custom>
  );
};

const HeaderMenu = ({ hideMenu }: HeaderMenuProps) => {
  return (
    <section className="HeaderMenu">
      <div className="HeaderMenu__topContent">
        <h1 className="HeaderMenu__title">Menu</h1>
        <X
          className="HeaderMenu__close"
          onClick={hideMenu}
          width={28}
          height={28}
        />
      </div>
      <nav className="HeaderMenu__nav">
        <WalletLink hideMenu={hideMenu} />
        <Link onClick={hideMenu} className={`HeaderMenu__link`} href={'/nfts'}>
          All NFTs
        </Link>
        <Link
          onClick={hideMenu}
          className={`HeaderMenu__link`}
          href={'/artists'}
        >
          All Artists
        </Link>
      </nav>
      <div className="HeaderMenu__bottomContent">
        <Link
          className={`HeaderMenu__link HeaderMenu__link--bottom`}
          href={'/info'}
        >
          Info
        </Link>
        <Link
          className={`HeaderMenu__link HeaderMenu__link--bottom`}
          href={'/termsofuse'}
        >
          Terms of use
        </Link>
      </div>
    </section>
  );
};

export default HeaderMenu;
