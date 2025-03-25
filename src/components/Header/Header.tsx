'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeaderMenu from './subComponents/HeaderMenu';
import { useAppDispatch } from '@/redux/hooks';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { setUserInfos } from '@/redux/reducers/user/reducer';
import { UserRoles } from '@prisma/client';
import CartSidebar from './subComponents/CartSidebar';

const Header = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showCart, setShowCart] = useState<boolean>(false);
  const supabase = createClientComponentClient();
  const dispatch = useAppDispatch()
  
  // Nombre d'articles dans le panier (à remplacer avec les données réelles)
  const cartItemsCount = 2;

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        const { address, name, surname, tel } = data.session?.user?.user_metadata || {}
        dispatch(setUserInfos({ id: data.session?.user.id, role: UserRoles.SELLER, orderIds: [], email: data.session?.user?.email, name, address, surname, tel }))
      }
    };
    fetchUserData()
  }, [])

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
          <Link className={`Header__link`} href={'#footer'}>
            About
          </Link>
          <Link className={`Header__link`} href={'/artworks'}>
            Artworks
          </Link>
          <Link className={`Header__link`} href={'/artists'}>
            Artists
          </Link>
          <Link className={`Header__link`} href={'/galleries'}>
            Galleries
          </Link>
          
        </nav>

        <div className="Header__rightMenu">
          <button 
            className="Header__cartBtn relative mr-4" 
            onClick={() => setShowCart(true)}
            aria-label="Ouvrir le panier"
          >
            <Image
              priority={true}
              alt="Panier"
              src="/icons/cart.png"
              width={24}
              height={24}
            />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemsCount}
              </span>
            )}
          </button>
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
        <CartSidebar isOpen={showCart} onClose={() => setShowCart(false)} />
      </section>
    </header>
  );
};

export default Header;
