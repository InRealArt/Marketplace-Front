'use client'

import Image from 'next/image'
import Link from 'next/link'
import NavbarItem from './NavbarItem'
import ButtonAction from '../buttons/ButtonAction'


function Navbar () {
  const navigationItems = [
    { text: 'New artworks', href: '/newArtworks' },
    { text: 'Paintings', href: '/paintings' },
    { text: 'Sculptures', href: '/sculptures' },
    { text: 'Drawings', href: '/drawings' },
    { text: 'Artists', href: '/artists' }
  ]

  return (
    <div className="bg-black/90 border-b border-[#131313] px-24 py-4 flex items-center justify-between h-20 relative backdrop-blur-[0.125rem]">
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
          <button className="p-1 hover:opacity-80 transition-opacity">
            <svg className="w-5 h-5 text-[#f6f8ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
