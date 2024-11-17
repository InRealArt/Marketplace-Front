'use client';
import React from 'react';
import Link from 'next/link';
import { LogOutIcon, X } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setLoginModalDisplay } from '@/redux/reducers/modals/reducer';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { getUserInfos } from '@/redux/reducers/user/selectors';
import { setUserInfos } from '@/redux/reducers/user/reducer';
import { toast } from 'sonner';
import { DashboardTabs } from '@/utils/constants';
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
  const user = useAppSelector((state) => getUserInfos(state))
  const supabase = createClientComponentClient();


  const displayLoginModal = () => {
    hideMenu()
    dispatch(setLoginModalDisplay(true))
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("You are disconnected")
    dispatch(setUserInfos(null))
  };

  const renderAccountLink = () => {
    if (!user.infos) {
      return <span onClick={displayLoginModal} className={`HeaderMenu__link`} >
        Sign up / Sign in
      </span>
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
      {user.infos.name} <LogOutIcon onClick={handleSignOut} />
    </Link>
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
        {/* <WalletLink hideMenu={hideMenu} /> */}
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
