'use client'
import React from 'react'

export interface TabItem {
  id: string
  label: string
  icon?: React.ReactNode
}

interface TabsProps {
  items: TabItem[]
  activeId: string
  onChange: (tabId: string) => void
  className?: string
  tabClassName?: string
  activeTabClassName?: string
  inactiveTabClassName?: string
  indicatorClassName?: string
}

const Tabs = ({
  items,
  activeId,
  onChange,
  className = '',
  tabClassName = 'py-4 px-2 text-base font-medium',
  activeTabClassName = 'text-white',
  inactiveTabClassName = 'text-white/50 hover:text-white/80',
  indicatorClassName = 'bg-[#b39e73]'
}: TabsProps) => {
  return (
    <div className={`flex gap-8 ${className}`}>
      {items.map(tab => {
        const isActive = tab.id === activeId
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              relative flex items-center gap-2 transition-colors duration-200
              ${tabClassName}
              ${isActive ? activeTabClassName : inactiveTabClassName}
            `}
          >
            {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {isActive && (
              <span className={`absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full ${indicatorClassName}`} />
            )}
          </button>
        )
      })}
    </div>
  )
}

export default Tabs

