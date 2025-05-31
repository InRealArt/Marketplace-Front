'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import { DashboardTabs } from '@/utils/constants';
import { useModalStore } from '@/store/modalStore';

const HeaderMenu = () => {
  const { showMenu, setShowMenu } = useModalStore();
  const menuRef = useRef<HTMLElement>(null);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && showMenu) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowMenu, showMenu]);

  const hideMenu = () => setShowMenu(false);

  return (
    <section 
      ref={menuRef}
      className={`max-w-[330px] w-full sm:w-[90%] h-[550px] sm:h-[600px] rounded-[20px] border border-[#a6a6a6] bg-[#313130] p-[30px] absolute right-0 top-[80px] z-[100] ${!showMenu ? 'hidden' : ''}`}
    >
      <div className="flex justify-between items-center mb-10">
        <h1 className="font-montserrat text-3xl tracking-[0] font-semibold relative after:content-[''] after:absolute after:left-0 after:bottom-[-10px] after:h-[2px] after:w-[30px] after:bg-[#b39e73]">Menu</h1>
        <X
          className="cursor-pointer"
          onClick={hideMenu}
          width={28}
          height={28}
        />
      </div>
      <nav className="flex flex-col space-y-2">
        <div className="relative">
          <Link 
            onClick={hideMenu} 
            className="flex justify-between text-white font-poppins text-lg py-2.5 mb-2 cursor-pointer" 
            href={'/artworks'}
          >
            All Artworks
          </Link>
        </div>
        
        <div className="relative">
          <Link
            onClick={hideMenu}
            className="flex justify-between text-white font-poppins text-lg py-2.5 mb-2 cursor-pointer"
            href={'/artists'}
          >
            All Artists
          </Link>
        </div>
        
        <div className="relative">
          <Link
            onClick={hideMenu}
            className="flex justify-between text-white font-poppins text-lg py-2.5 mb-2 cursor-pointer"
            href={'/galleries'}
          >
            All Galleries
          </Link>
        </div>
      </nav>
      <div className="absolute bottom-[30px] left-[30px]">
        <div className="relative">
          <Link
            className="flex justify-between text-white font-poppins text-sm py-2.5 mb-1 cursor-pointer"
            href={'/'}
          >
            Info
          </Link>
        </div>
        
        <Link
          className="flex justify-between text-white font-poppins text-sm py-2.5 cursor-pointer"
          href={'/'}
        >
          Terms of use
        </Link>
      </div>
    </section>
  );
};

export default HeaderMenu;
