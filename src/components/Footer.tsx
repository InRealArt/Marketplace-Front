import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="absolute left-0 w-full border-t-[5px] border-[#b39e73] mt-20 py-[50px] md:py-[35px]" id="footer">
      <section className="max-w-[1414px] flex flex-col items-center mx-auto">
        <Link href={'/'}>
          <Image
            priority={true}
            className="mb-[55px]"
            alt="logo"
            src="/images/Logo.png"
            width={180}
            height={30}
          />
        </Link>

        <nav className="flex items-start justify-between w-[70%] md:w-[90%]">
          <div>
            <h2 className="font-poppins text-2xl md:text-4xl tracking-[-1.5px] font-medium mb-5 text-white">About</h2>
            <Link className="font-poppins text-xs md:text-lg tracking-[-0.5px] font-medium text-[#d9d9d9] mb-[15px] block" href={'https://drive.google.com/file/d/1yBhAJDqSocNhLanwJoyiX1Y-Do9yJ3kL/view?pli=1'}>
              White Paper
            </Link>
            <Link className="font-poppins text-xs md:text-lg tracking-[-0.5px] font-medium text-[#d9d9d9] mb-[15px] block" href={'https://www.inrealart.com/faq'}>
              FAQ
            </Link>
          </div>
          <div>
            <h2 className="font-poppins text-2xl md:text-4xl tracking-[-1.5px] font-medium mb-5 text-white">Company</h2>
            <Link className="font-poppins text-xs md:text-lg tracking-[-0.5px] font-medium text-[#d9d9d9] mb-[15px] block" href={'https://www.inrealart.com/team'}>
              Our Team
            </Link>
            {/* <Link className="font-poppins text-xs md:text-lg tracking-[-0.5px] font-medium text-[#d9d9d9] mb-[15px] block" href={'https://www.inrealart.com/home#partners'}>
              Partners
            </Link> */}
            <Link className="font-poppins text-xs md:text-lg tracking-[-0.5px] font-medium text-[#d9d9d9] mb-[15px] block" href={'https://www.inrealart.com/tos'}>
              Terms of service
            </Link>
          </div>
          <div>
            <h2 className="font-poppins text-2xl md:text-4xl tracking-[-1.5px] font-medium mb-5 text-white">Contact</h2>
            <a className="font-poppins text-xs md:text-lg tracking-[-0.5px] font-medium text-[#d9d9d9] mb-[15px] block" href="">
              Paris  
            </a>
            <a className="font-poppins text-xs md:text-lg tracking-[-0.5px] font-medium text-[#d9d9d9] mb-[15px] block" href="mailto:teaminrealart@gmail.com">
              teaminrealart@gmail.com
            </a>
          </div>
        </nav>
      </section>
    </footer>
  );
};

export default Footer;
