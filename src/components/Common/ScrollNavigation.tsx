'use client'
import React from 'react'

export interface NavigationTab {
  id: string
  label: string
  icon?: React.ReactNode
}

interface ScrollNavigationProps {
  tabs: NavigationTab[]
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
      <div className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabClick(tab.id)}
            className={`
              relative flex items-center gap-2 py-4 px-2 text-base font-medium
              transition-colors duration-200
              ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/80'
              }
            `}
          >
            {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            
            {/* Active indicator */}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#b39e73] rounded-t-full" />
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default ScrollNavigation
