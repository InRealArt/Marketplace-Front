import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderMenuProps {
  setShowMenu: () => void;
}

const HeaderMenu = ({ setShowMenu }: HeaderMenuProps) => {
  return (
    <section className="HeaderMenu">
      <div className="HeaderMenu__topContent">
        <h1 className="HeaderMenu__title">Mon Compte</h1>
        <Image
          className="HeaderMenu__close"
          onClick={setShowMenu}
          priority={true}
          alt="Close Menu"
          src="/icons/Cross.png"
          width={28}
          height={28}
        />
      </div>
      <nav className="HeaderMenu__nav">
        <Link className={`HeaderMenu__link`} href={'/wallet'}>
          Wallet
        </Link>
        <Link className={`HeaderMenu__link`} href={'/profil'}>
          Profil
        </Link>
        <Link className={`HeaderMenu__link`} href={'/nfts'}>
          All NFTs
        </Link>
        <Link className={`HeaderMenu__link`} href={'/artists'}>
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
