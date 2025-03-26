'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import { UserCircle, WalletIcon } from 'lucide-react';
import { DashboardTabs } from '@/utils/constants';

import DashboardNav from './subComponents/DashboardNav';

import WalletEmptyState from './subComponents/WalletEmptyState';

// BLOCKCHAIN
import WalletPage from './subComponents/Wallet/WalletComponent';
import ProfileComponent from './subComponents/Profile/ProfileComponent';
import OrdersComponent from './subComponents/Orders/OrdersComponent';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getUserInfos } from '@/redux/reducers/user/selectors';
import { setLoginModalDisplay } from '@/redux/reducers/modals/reducer';
import { useSearchParams } from 'next/navigation';

const Wallet = () => {
  const { isConnected } = useAccount();
  const searchParams = useSearchParams();
  const currentTab = searchParams?.get("tab");

  const [activeTab, setActiveTab] = useState(currentTab as DashboardTabs || DashboardTabs.WALLET);
  const user = useAppSelector((state) => getUserInfos(state))
  const dispatch = useAppDispatch()

  const navItems: {
    id: DashboardTabs;
    text: string;
    icon: JSX.Element;
    callBack?: () => unknown;
  }[] = [
      {
        id: DashboardTabs.WALLET,
        text: 'Wallet',
        icon: <WalletIcon width={28} height={28} />,
        callBack: () => setActiveTab(DashboardTabs.WALLET),
      },
      {
        id: DashboardTabs.SEPARATOR,
        text: "",
        icon: <span></span>,
        callBack: () => { }
      },
      {
        id: DashboardTabs.PROFILE,
        text: 'My Profile',
        icon: (
          <UserCircle width={28} height={28} />
        ),
        callBack: user.infos ? () => setActiveTab(DashboardTabs.PROFILE) : () => dispatch(setLoginModalDisplay(true))
      },
      {
        id: DashboardTabs.ORDERS,
        text: 'Orders',
        icon: (
          <Image
            priority={true}
            alt="My NFT"
            src="/icons/NftIcon.svg"
            width={28}
            height={28}
          />
        ),
        callBack: user.infos ? () => setActiveTab(DashboardTabs.ORDERS) : () => dispatch(setLoginModalDisplay(true)),
      }
    ];

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case DashboardTabs.WALLET:
        return isConnected ? <WalletPage /> : <WalletEmptyState />
      case DashboardTabs.PROFILE:
        return user.infos ? <ProfileComponent setActiveTab={setActiveTab} /> : null
      case DashboardTabs.ORDERS:
        return user.infos ? <OrdersComponent /> : null
      default:
        return
    }
  }
  return (
    <main className={`Dashboard Dashboard--is${activeTab} ${!isConnected ? 'Dashboard--isDisconnected' : ''}`}>
      <DashboardNav navItems={navItems} activeTab={activeTab} />
      {renderActiveTabContent()}
    </main>
  );
};

export default Wallet;
