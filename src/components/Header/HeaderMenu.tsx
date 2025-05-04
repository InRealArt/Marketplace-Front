'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useAppDispatch } from '@/redux/hooks';
import { setLoginModalDisplay } from '@/redux/reducers/modals/reducer';
import CoinbaseWallet from '@/components/CoinbaseWallet/CoinbaseWallet';
import { useSession } from '@/lib/auth-client';
import { DashboardTabs } from '@/utils/constants';

interface HeaderMenuProps {
  hideMenu: () => void;
  hide: boolean;
}

//   const { address } = useAccount();
//   const { data } = useBalance({ address });

//   return (
//     <ConnectButton.Custom>
//       {({ account, chain, mounted }) => {
//         const ready = mounted;
//         const connected = ready && account && chain;
//         if (!connected) {
//           return (
//             <p className="flex justify-between text-white font-poppins text-lg py-2.5 mb-5 cursor-pointer" onClick={openConnectModal}>
//               Connect my wallet
//             </p>
//           );
//         }

//         return (
//           <Link
//             className="flex justify-between text-white font-poppins text-lg py-2.5 mb-5 cursor-pointer border border-[#dedcd8] rounded-[14px]"
//             onClick={hideMenu}
//             href={{
//               pathname: "/dashboard",
//               query: {
//                 tab: DashboardTabs.WALLET,
//               },
//             }}
//           >
//             <span className="truncate max-w-[70%] whitespace-nowrap overflow-hidden">My Wallet - {account.address}</span>
//             <p className="m-0">
//               {Number(data?.formatted)?.toFixed(1)} {data?.symbol}
//             </p>
//           </Link>
//         );
//       }}
//     </ConnectButton.Custom>
//   );
// };

const HeaderMenu = ({ hideMenu, hide }: HeaderMenuProps) => {
  const dispatch = useAppDispatch();
  const { data } = useSession();
  const user = data?.user;
  
  const displayLoginModal = () => {
    hideMenu();
    dispatch(setLoginModalDisplay(true));
  };

  const renderAccountLink = () => {
    if (!user) {
      return (
        <>
          <span onClick={displayLoginModal} className="flex justify-between text-white font-poppins text-lg py-2.5 mb-5 cursor-pointer">
            Sign up / Sign in
          </span>
        </>
      );
    }

    return (
      <Link
        className="flex justify-between text-white font-poppins text-lg py-2.5 mb-5 cursor-pointer"
        onClick={hideMenu}
        href={{
          pathname: "/dashboard",
          query: {
            tab: DashboardTabs.PROFILE,
          }
        }}
      >
        {user?.name || user?.email}
      </Link>
    );
  };

  const renderCoineBasWallet = () => {
    if (user?.id) {
      return (
        <span className="flex justify-between text-white font-poppins text-lg py-2.5 mb-5 cursor-pointer">
          <CoinbaseWallet />
        </span>
      );
    }
    return null;
  };

  return (
    <section className={`max-w-[330px] w-full sm:w-[90%] h-[550px] sm:h-[600px] rounded-[20px] border border-[#a6a6a6] bg-[#313130] p-[30px] absolute right-0 top-[80px] ${hide ? 'hidden' : ''}`}>
      <div className="flex justify-between items-center mb-10">
        <h1 className="font-montserrat text-3xl tracking-[0] font-semibold relative after:content-[''] after:absolute after:left-0 after:bottom-[-10px] after:h-[2px] after:w-[30px] after:bg-[#b39e73]">Menu</h1>
        <X
          className="cursor-pointer"
          onClick={hideMenu}
          width={28}
          height={28}
        />
      </div>
      <nav>
        {renderAccountLink()}
        {renderCoineBasWallet()}
        <Link onClick={hideMenu} className="flex justify-between text-white font-poppins text-lg py-2.5 mb-5 cursor-pointer" href={'/artworks'}>
          All Artworks
        </Link>
        <Link
          onClick={hideMenu}
          className="flex justify-between text-white font-poppins text-lg py-2.5 mb-5 cursor-pointer"
          href={'/artists'}
        >
          All Artists
        </Link>
        <Link
          onClick={hideMenu}
          className="flex justify-between text-white font-poppins text-lg py-2.5 mb-5 cursor-pointer"
          href={'/galleries'}
        >
          All Galleries
        </Link>
      </nav>
      <div className="absolute bottom-[30px] left-[30px]">
        <Link
          className="flex justify-between text-white font-poppins text-sm py-2.5 mb-2.5 cursor-pointer"
          href={'/'}
        >
          Info
        </Link>
        <Link
          className="flex justify-between text-white font-poppins text-sm py-2.5 mb-2.5 cursor-pointer"
          href={'/'}
        >
          Terms of use
        </Link>
      </div>
    </section>
  );
};

export default HeaderMenu;
