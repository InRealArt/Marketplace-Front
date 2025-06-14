'use client'

import Image from 'next/image'
import Link from 'next/link'
import NavbarItem from './NavbarItem'
import ButtonAction from '../buttons/ButtonAction'
import { useCart } from '@/hooks/useCart'
import { useModalStore } from '@/store/modalStore'


function Navbar () {
  const { toggleMenu, toggleUserMenu, toggleCart } = useModalStore();
  const { getItemCount } = useCart();
  
  // Get cart items count from the Zustand store
  const cartItemsCount = getItemCount();

  const navigationItems = [
    { text: 'New artworks', href: '/newArtworks' },
    { text: 'Paintings', href: '/paintings' },
    { text: 'Sculptures', href: '/sculptures' },
    { text: 'Drawings', href: '/drawings' },
    { text: 'Artists', href: '/artists' }
  ]

  return (
    <div className="bg-black/90 border-b border-[#131313] px-24 py-4 flex items-center justify-between h-20 relative backdrop-blur-[0.125rem] fixed top-0 left-0 right-0 z-50">
      {/* Section gauche avec logo et menu */}
      <div className="flex items-center gap-16">
        {/* Logo simplifié */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              className="h-8 w-auto cursor-pointer"
              src="/images/InRealArt.svg"
              alt="IRA"
              width={100}
              height={32}
            />
          </Link>
        </div>

        {/* Menu de navigation */}
        <nav className="flex items-center gap-8">
          {navigationItems.map((item, index) => (
            <NavbarItem key={index} text={item.text} href={item.href} />
          ))}
        </nav>
      </div>

      {/* Section droite avec bouton et icônes */}
      <div className="flex items-center gap-6">
        {/* Bouton Signup */}
        <ButtonAction onClick={() => {}} text="Signup" />

        {/* Icônes */}
        <div className="flex items-center gap-4">
          <button className="p-1 hover:opacity-80 transition-opacity">
            <svg className="w-5 h-5 text-[#f6f8ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="p-1 hover:opacity-80 transition-opacity">
            <svg className="w-5 h-5 text-[#f6f8ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button
            className="relative mr-3 md:mr-4 bg-transparent border-0 p-0 cursor-pointer flex items-center justify-center transition-transform duration-200 hover:scale-110"
            onClick={toggleCart}
            aria-label="Ouvrir le panier"
          >
            <Image
              priority={true}
              alt="Panier"
              src="/icons/cart.svg"
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
        </div>
      </div>
    </div>
  )
}

export default Navbar
