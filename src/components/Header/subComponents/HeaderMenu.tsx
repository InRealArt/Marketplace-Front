import React from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

interface HeaderMenuProps {
  hideMenu: () => void;
}

const HeaderMenu = ({ hideMenu }: HeaderMenuProps) => {
  return (
    <section className="HeaderMenu">
      <div className="HeaderMenu__topContent">
        <h1 className="HeaderMenu__title">Mon Compte</h1>
        <X
          className="HeaderMenu__close"
          onClick={hideMenu}
          width={28}
          height={28}
        />
      </div>
      <nav className="HeaderMenu__nav">
        <Link
          onClick={hideMenu}
          className={`HeaderMenu__link`}
          href={'/wallet'}
        >
          Wallet
        </Link>
        <Link
          onClick={hideMenu}
          className={`HeaderMenu__link`}
          href={'/profil'}
        >
          Profil
        </Link>
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
