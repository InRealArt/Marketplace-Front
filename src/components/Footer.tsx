import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="Footer" id="footer">
      <section className="Footer__container">
        <Image
          priority={true}
          className="Footer__logo"
          alt="logo"
          src="/images/Logo.png"
          width={180}
          height={30}
        />

        <nav className="Footer__links">
          <div>
            <h2 className="Footer__title">About</h2>
            <Link className="Footer__link" href={'/'}>
              Product
            </Link>
            <Link className="Footer__link" href={'/'}>
              Ressource
            </Link>
            <Link className="Footer__link" href={'/'}>
              Term & Condition
            </Link>
            <Link className="Footer__link" href={'/'}>
              FAQ
            </Link>
          </div>
          <div>
            <h2 className="Footer__title">Company</h2>
            <Link className="Footer__link" href={'/'}>
              Our Team
            </Link>
            <Link className="Footer__link" href={'/'}>
              Partener
            </Link>
            <Link className="Footer__link" href={'/'}>
              Privacy & Policy
            </Link>
            <Link className="Footer__link" href={'/'}>
              Features
            </Link>
          </div>
          <div>
            <h2 className="Footer__title">Contact</h2>
            <a className="Footer__link" href="tel:+3310000000">
              01 00 00 00 00
            </a>
            <a className="Footer__link" href="mailto:inrealart@gmail.com">
              Inrealart@gmail.com
            </a>
          </div>
        </nav>
      </section>
    </footer>
  );
};

export default Footer;
