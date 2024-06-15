import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="Footer" id="footer">
      <section className="Footer__container">
        <Link href={'/'}>
          <Image
            priority={true}
            className="Footer__logo"
            alt="logo"
            src="/images/Logo.png"
            width={180}
            height={30}
          />
        </Link>

        <nav className="Footer__links">
          <div>
            <h2 className="Footer__title">About</h2>
            <Link className="Footer__link" href={'https://drive.google.com/file/d/1yBhAJDqSocNhLanwJoyiX1Y-Do9yJ3kL/view?pli=1'}>
              White Paper
            </Link>
            <Link className="Footer__link" href={'https://www.inrealart.com/faq'}>
              FAQ
            </Link>
          </div>
          <div>
            <h2 className="Footer__title">Company</h2>
            <Link className="Footer__link" href={'https://www.inrealart.com/home#team'}>
              Our Team
            </Link>
            <Link className="Footer__link" href={'https://www.inrealart.com/home#partners'}>
              Partners
            </Link>
            <Link className="Footer__link" href={'https://www.inrealart.com/tos'}>
              Terms of service
            </Link>
          </div>
          <div>
            <h2 className="Footer__title">Contact</h2>
            <a className="Footer__link" href="">
              Paris  
            </a>
            <a className="Footer__link" href="mailto:teaminrealart@gmail.com">
              teaminrealart@gmail.com
            </a>
          </div>
        </nav>
      </section>
    </footer>
  );
};

export default Footer;
