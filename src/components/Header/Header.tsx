'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeaderMenu from './subComponents/HeaderMenu';

const Header = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <header className="Header">
      <section className="Header__container">
        <Link href={'/'} className="Header__logo">
          <Image
            priority={true}
            alt="logo"
            src="/images/Logo.png"
            width={180}
            height={30}
          />
        </Link>
        <Link href={'/'} className="Header__logo Header__logo--mobile">
          <Image
            priority={true}
            alt="logo"
            src="/images/LogoMobile.png"
            width={34}
            height={34}
          />
        </Link>

        <nav className="Header__nav">
          <Link className={`Header__link`} href={'/'}>
            Home
          </Link>
          <Link className={`Header__link`} href={'/about'}>
            About
          </Link>
          <Link className={`Header__link`} href={'/nfts'}>
            Nfts
          </Link>
          <Link className={`Header__link`} href={'/artists'}>
            Artists
          </Link>
        </nav>

        <div className="Header__rightMenu">
          <Image
            priority={true}
            alt="logo"
            src="/icons/ri_search-line.png"
            width={24}
            height={24}
          />
          <Image
            onClick={() => setShowMenu(!showMenu)}
            priority={true}
            alt="logo"
            src="/icons/line-md_account.png"
            width={24}
            height={24}
          />
        </div>

        <div className="Header__rightMenu Header__rightMenu--mobile">
          <Image
            onClick={() => setShowMenu(!showMenu)}
            priority={true}
            alt="logo"
            src="/icons/menu.png"
            width={24}
            height={24}
          />
        </div>

        {showMenu && <HeaderMenu hideMenu={() => setShowMenu(false)} />}
      </section>
    </header>
  );
};

export default Header;
