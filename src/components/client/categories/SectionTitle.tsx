import React from 'react'
import { ArrowButton } from '@/components/ui/ArrowButton'

interface SectionTitleProps {
  title: string
  subtitle?: string
  showButton?: boolean
  buttonText?: string
  buttonHref?: string
  onButtonClick?: () => void
}

export function SectionTitle({
  title,
  subtitle,
  showButton = false,
  buttonText = "Voir plus",
  buttonHref,
  onButtonClick
}: SectionTitleProps) {
  return (
    <div className="flex flex-col space-y-6 mb-8 lg:flex-row lg:justify-between lg:items-center lg:space-y-0 lg:mb-12">
      <div className="flex-1">
        <h1 className="text-white font-bricolage font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-3 lg:mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/80 text-sm sm:text-base  max-w-full lg:max-w-2xl font-montserrat leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {showButton && (
        <div className="flex items-center lg:flex-shrink-0 lg:ml-8">
          <ArrowButton 
            href={buttonHref}
            onClick={onButtonClick}
            size="sm"
            className="sm:text-base lg:text-lg"
          >
            {buttonText}
          </ArrowButton>
        </div>
      )}
    </div>
  )
} 