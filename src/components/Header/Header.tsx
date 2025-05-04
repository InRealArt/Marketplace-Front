'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeaderMenu from './HeaderMenu';
import Cart from './Cart';
import { useCart } from '@/hooks/useCart';
import { useSession } from '@/lib/auth-client';

const Header = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showCart, setShowCart] = useState<boolean>(false);
  const { getItemCount } = useCart();
  
  // Get cart items count from the Zustand store
  const cartItemsCount = getItemCount();
  
  return (
    <header className="fixed top-0 left-0 w-full h-[50px] md:h-[60px] lg:h-[80px] z-[99] bg-[rgba(31,31,29,0.5)] backdrop-blur-[60px]">
      <section className="relative z-10 mx-auto h-full flex justify-between items-center max-w-[90%] desktop:max-w-[1414px]">
        {/* Mobile logo */}
        <Link href={'/'} className="block md:hidden">
          <Image
            priority={true}
            alt="logo"
            src="/images/LogoMobile.png"
            width={28}
            height={28}
            className="w-7 h-7"
          />
        </Link>
        
        {/* Desktop logo */}
        <Link href={'/'} className="hidden md:block">
          <Image
            priority={true}
            alt="logo"
            src="/images/Logo.png"
            width={150}
            height={25}
            className="w-[120px] h-auto lg:w-[180px]"
          />
        </Link>

        {/* Navigation - hidden on mobile, visible on md and up */}
        <nav className="hidden md:flex font-semibold justify-between items-center text-sm lg:text-base gap-5 lg:gap-[35px]">
          <Link href={'/'}>
            Home
          </Link>
          <Link href={'#footer'}>
            About
          </Link>
          <Link href={'/artworks'}>
            Artworks
          </Link>
          <Link href={'/artists'}>
            Artists
          </Link>
          <Link href={'/galleries'}>
            Galleries
          </Link>
        </nav>

        <div className="flex justify-between items-center">
          <button 
            className="relative mr-3 md:mr-4 bg-transparent border-0 p-0 cursor-pointer flex items-center justify-center transition-transform duration-200 hover:scale-110" 
            onClick={() => setShowCart(true)}
            aria-label="Ouvrir le panier"
          >
            <Image
              priority={true}
              alt="Panier"
              src="/icons/cart.png"
              width={20}
              height={20}
              className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 brightness-0 invert"
            />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 bg-red-500 text-white rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-[10px] md:text-xs font-semibold">
                {cartItemsCount}
              </span>
            )}
          </button>
          <Image
            onClick={() => setShowMenu(!showMenu)}
            priority={true}
            alt="menu"
            src="/icons/menu.png"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </div>

        <HeaderMenu hide={!showMenu} hideMenu={() => setShowMenu(false)} />
        <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
      </section>
    </header>
  );
};

export default Header;
