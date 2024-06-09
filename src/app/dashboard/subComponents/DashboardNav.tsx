'use client';
import { DashboardTabs } from '@/utils/constants';
import React from 'react';

interface DashboardNavProps {
  navItems: {
    id: DashboardTabs;
    text: string;
    icon: JSX.Element;
    callBack?: () => unknown;
  }[];
  activeTab: DashboardTabs;
}

const DashboardNav = ({ navItems, activeTab }: DashboardNavProps) => {
  return (
    <section className="Dashboard__nav">
      <h2 className="Dashboard__title">Menu</h2>
      <div className="Dashboard__content">
        <div className="Dashboard__navItems">
          {navItems.map((navItem) => navItem.id === DashboardTabs.SEPARATOR ? (
            <span key={navItem.id} className="Dashboard__separator" />
          ) : <div
            key={navItem.id}
            onClick={navItem.callBack}
            className={`Dashboard__navItem ${activeTab === navItem.id ? 'Dashboard__navItem--active' : ''
              }`}
          >
            {' '}
            {navItem.icon}
            <span>{navItem.text}</span>
          </div>)}
        </div>
      </div>
    </section >
  );
};

export default DashboardNav;
