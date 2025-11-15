'use client'

import React from 'react'
import Image from 'next/image'

interface SocialMediaLinkProps {
  name: string
  iconSrc: string
  href?: string
  onClick?: () => void
}

function SocialMediaLink({ name, iconSrc, href, onClick }: SocialMediaLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }

  const linkContent = (
    <div className="flex flex-row gap-1 items-center justify-center shrink-0 relative">
      <div className="text-left font-['Montserrat-Medium',_sans-serif] text-base font-medium relative flex items-center justify-start">
        {name}
      </div>
      {/* <Image
        className="shrink-0 w-6 h-6 relative overflow-visible text-white"
        src={iconSrc}
        alt={`${name} icon`}
        width={24}
        height={24}
      /> */}
    </div>
  )

  return href ? (
    <a href={href} onClick={handleClick}>
      {linkContent}
    </a>
  ) : (
    <button onClick={handleClick}>
      {linkContent}
    </button>
  )
}

export default SocialMediaLink 