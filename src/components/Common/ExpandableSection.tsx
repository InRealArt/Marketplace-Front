'use client'
import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface ExpandableSectionProps {
  title: string
  children: React.ReactNode
  defaultExpanded?: boolean
  className?: string
  titleClassName?: string
  contentClassName?: string
}

const ExpandableSection = ({
  title,
  children,
  defaultExpanded = false,
  className = '',
  titleClassName = '',
  contentClassName = ''
}: ExpandableSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <div className={`border-b border-white/10 ${className}`}>
      {/* Header - clickable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          w-full flex items-center justify-between py-6 
          text-left hover:text-white/80 transition-colors
          ${titleClassName}
        `}
      >
        <h3 className="text-2xl md:text-3xl font-bold text-white">
          {title}
        </h3>
        <div className="flex-shrink-0 ml-4">
          {isExpanded ? (
            <ChevronUp size={24} className="text-white" />
          ) : (
            <ChevronDown size={24} className="text-white" />
          )}
        </div>
      </button>

      {/* Content - expandable */}
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isExpanded ? 'max-h-[2000px] opacity-100 pb-6' : 'max-h-0 opacity-0'}
        `}
      >
        <div className={contentClassName}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ExpandableSection

