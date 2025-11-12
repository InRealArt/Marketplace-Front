'use client'
import React from 'react'
import Tabs, { TabItem } from './Tabs'

interface ScrollNavigationProps {
  tabs: TabItem[]
  activeTab: string
  onTabClick: (tabId: string) => void
  className?: string
  sticky?: boolean
  stickyTop?: string
}

const ScrollNavigation = ({
  tabs,
  activeTab,
  onTabClick,
  className = '',
  sticky = false,
  stickyTop = '80px'
}: ScrollNavigationProps) => {
  return (
    <nav
      className={`
        border-b border-white/10 bg-[rgb(19,19,19)] my-10
        ${sticky ? `sticky z-20 top-[70px] md:top-[80px]` : ''}
        ${className}
      `}
    >
      <Tabs
        items={tabs}
        activeId={activeTab}
        onChange={onTabClick}
      />
    </nav>
  )
}

export default ScrollNavigation
