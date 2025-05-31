'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { UserCircle } from 'lucide-react';
import { DashboardTabs } from '@/utils/constants';

import DashboardNav from './subComponents/DashboardNav';

// BLOCKCHAIN
import ProfileComponent from './subComponents/Profile/ProfileComponent';
import OrdersComponent from './subComponents/Orders/OrdersComponent';
import { useAppDispatch } from '@/redux/hooks';
import { setLoginModalDisplay } from '@/redux/reducers/modals/reducer';
import { useSearchParams } from 'next/navigation';
import { useSession } from '@/lib/auth-client';

const Wallet = () => {
  const searchParams = useSearchParams();
  const currentTab = searchParams?.get("tab");
  const { data } = useSession();
  const sessionData = data?.session
  const isAuthenticated = !!sessionData;
  
  // Track authentication state changes
  const [authState, setAuthState] = useState(isAuthenticated);
  
  useEffect(() => {
    if (authState !== isAuthenticated) {
      setAuthState(isAuthenticated);
    }
  }, [isAuthenticated, authState]);

  const [activeTab, setActiveTab] = useState(currentTab as DashboardTabs || DashboardTabs.WALLET);
  const dispatch = useAppDispatch();

  const navItems: {
    id: DashboardTabs;
    text: string;
    icon: JSX.Element;
    callBack?: () => unknown;
  }[] = [
      {
        id: DashboardTabs.PROFILE,
        text: 'My Profile',
        icon: (
          <UserCircle width={28} height={28} />
        ),
        callBack: isAuthenticated ? () => setActiveTab(DashboardTabs.PROFILE) : () => dispatch(setLoginModalDisplay(true))
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
        callBack: isAuthenticated ? () => setActiveTab(DashboardTabs.ORDERS) : () => dispatch(setLoginModalDisplay(true)),
      }
    ];

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case DashboardTabs.PROFILE:
        return isAuthenticated ? <ProfileComponent setActiveTab={setActiveTab} /> : null
      case DashboardTabs.ORDERS:
        return isAuthenticated ? <OrdersComponent /> : null
      default:
        return
    }
  }
  return (
    <main className={`Dashboard Dashboard--is${activeTab} ${!isAuthenticated ? 'Dashboard--isDisconnected' : ''}`}>
      <DashboardNav navItems={navItems} activeTab={activeTab} />
      {renderActiveTabContent()}
    </main>
  );
};

export default Wallet;
