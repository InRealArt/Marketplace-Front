'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { LogOutIcon, X } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setLoginModalDisplay } from '@/redux/reducers/modals/reducer';
import { getUserInfos } from '@/redux/reducers/user/selectors';
import { setUserInfos } from '@/redux/reducers/user/reducer';
import { toast } from 'sonner';
import { DashboardTabs } from '@/utils/constants';
import CoinbaseWallet from '@/components/CoinbaseWallet/CoinbaseWallet';
import { UserRoles } from '@prisma/client';

interface HeaderMenuProps {
  hideMenu: () => void;
}

const WalletLink = ({ hideMenu }: HeaderMenuProps) => {
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();
  const { data } = useBalance({ address });

  return (
    <ConnectButton.Custom>
      {({ account, chain, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;
        if (!connected) {
          return (
            <p className="HeaderMenu__link" onClick={openConnectModal}>
              Connect my wallet
            </p>
          );
        }

        return (
          <Link
            className="HeaderMenu__link HeaderMenu__link--wallet"
            onClick={hideMenu}
            href={{
              pathname: "/dashboard",
              query: {
                tab: DashboardTabs.WALLET,
              },
            }}
          >
            <span className="HeaderMenu__adress">My Wallet - {account.address}</span>
            <p className="HeaderMenu__balance">
              {Number(data?.formatted)?.toFixed(1)} {data?.symbol}
            </p>
          </Link>
        );
      }}
    </ConnectButton.Custom>
  );
};

const HeaderMenu = ({ hideMenu }: HeaderMenuProps) => {
  const dispatch = useAppDispatch()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch('/api/auth/session')
        const data = await response.json()
        
        if (data.session?.user) {
          const { user } = data.session
          const { address, name, surname, tel } = user?.user_metadata || {}
          dispatch(setUserInfos({ 
            id: user.id, 
            role: UserRoles.SELLER, 
            orderIds: [], 
            email: user?.email, 
            name, 
            address, 
            surname, 
            tel 
          }))
          setUser(user)
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de la session:', error)
      }
    }

    fetchSession()
  }, [dispatch])

  const displayLoginModal = () => {
    hideMenu()
    dispatch(setLoginModalDisplay(true))
  }

  const renderAccountLink = () => {
    if (!user) {
      return (
        <>
          <span onClick={displayLoginModal} className={`HeaderMenu__link`} >
            Sign up / Sign in
          </span>
        </>
      )
    }

    return <Link
      className={`HeaderMenu__link`}
      onClick={hideMenu}
      href={{
        pathname: "/dashboard",
        query: {
          tab: DashboardTabs.PROFILE,
        }
      }}
    >
      {user.user_metadata?.name || user.email}
    </Link>
  }

  const renderCoineBasWallet = () => {
    if (user?.id) {
      return (
        <span className={`HeaderMenu__link`} >
          <CoinbaseWallet />
        </span>
      )
    }
    return null
  }

  return (
    <section className="HeaderMenu">
      <div className="HeaderMenu__topContent">
        <h1 className="HeaderMenu__title">Menu</h1>
        <X
          className="HeaderMenu__close"
          onClick={hideMenu}
          width={28}
          height={28}
        />
      </div>
      <nav className="HeaderMenu__nav">
        {renderAccountLink()}
        {renderCoineBasWallet()}
        <Link onClick={hideMenu} className={`HeaderMenu__link`} href={'/artworks'}>
          All Artworks
        </Link>
        <Link
          onClick={hideMenu}
          className={`HeaderMenu__link`}
          href={'/artists'}
        >
          All Artists
        </Link>
        <Link
          onClick={hideMenu}
          className={`HeaderMenu__link`}
          href={'/galleries'}
        >
          All Galleries
        </Link>
      </nav>
      <div className="HeaderMenu__bottomContent">
        <Link
          className={`HeaderMenu__link HeaderMenu__link--bottom`}
          href={'/'}
        >
          Info
        </Link>
        <Link
          className={`HeaderMenu__link HeaderMenu__link--bottom`}
          href={'/'}
        >
          Terms of use
        </Link>
      </div>
    </section>
  );
};

export default HeaderMenu;
