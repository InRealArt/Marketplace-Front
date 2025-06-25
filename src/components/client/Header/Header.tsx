'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { useModalStore } from '@/store/modalStore';
import { navigationItems } from '@/lib/constants/navigation';
import ButtonAction from '../buttons/ButtonAction';
import SearchButton from '../buttons/SearchButton';

const Header = () => {
  const { toggleMenu, toggleUserMenu, toggleCart } = useModalStore();
  const { getItemCount } = useCart();

  // Get cart items count from the Zustand store
  const cartItemsCount = getItemCount();

  return (
    <header className="fixed top-0 left-0 w-full h-[70px] lg:h-[80px] z-[99] backdrop-blur-[60px]">
      <section className="relative z-10 w-full h-full flex justify-between items-center px-3 md:px-4 lg:px-6">
        {/* Logo section - aligné à gauche */}
        <div className="flex items-center">
          {/* Mobile logo */}
          <Link href={'/'}>
            <Image
              className="h-8 w-auto cursor-pointer"
              src="/images/InRealArt.svg"
              alt="IRA"
              width={100}
              height={32}
            />
          </Link>
        </div>

        {/* Navigation - hidden on mobile, visible on md and up */}
        <nav className="hidden md:flex font-semibold justify-center items-center text-sm lg:text-base gap-5">
          {navigationItems.map((item, index) => (
            <Link key={index} href={item.href} className="hover:opacity-80 transition-opacity">
              {item.text}
            </Link>
          ))}
        </nav>

        {/* Icons section - aligné à droite */}
        <div className="flex justify-end items-center gap-6">
          <ButtonAction  onClick={() => { }} text="Signup" />

          {/* Search Button */}
          <SearchButton />
          <button className="p-1 hover:opacity-80 transition-opacity">
            <svg className="w-7 h-7 text-[#f6f8ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button
            className="relative cursor-pointer hover:opacity-80 transition-opacity"
            onClick={toggleCart}
            aria-label="Ouvrir le panier"
          >
            <Image
              priority={true}
              alt="Panier"
              src="/icons/cart.svg"
              width={20}
              height={20}
              className="w-7 h-7 brightness-0 invert"
            />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 bg-red-500 text-white rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-[10px] md:text-xs font-semibold">
                {cartItemsCount}
              </span>
            )}
          </button>

          <Image
            onClick={toggleMenu}
            priority={true}
            alt="menu"
            src="/icons/menu.png"
            width={24}
            height={24}
            className="cursor-pointer block md:hidden"
          />
        </div>
      </section>
    </header>
  );
};

export default Header;
