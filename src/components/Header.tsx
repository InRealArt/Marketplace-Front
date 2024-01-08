import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="Header">
      <section className="Header__container">
        <Image
          priority={true}
          className="Header__logo"
          alt="logo"
          src="/images/Logo.png"
          width={180}
          height={30}
        />
        <Image
          priority={true}
          className="Header__logo Header__logo--mobile"
          alt="logo"
          src="/images/LogoMobile.png"
          width={34}
          height={34}
        />

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
          <Link className={`Header__link`} href={'/artist'}>
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
            priority={true}
            alt="logo"
            src="/icons/line-md_account.png"
            width={24}
            height={24}
          />
        </div>

        <div className="Header__rightMenu Header__rightMenu--mobile">
          <Image
            priority={true}
            alt="logo"
            src="/icons/menu.png"
            width={24}
            height={24}
          />
        </div>
      </section>
    </header>
  );
};

export default Header;
