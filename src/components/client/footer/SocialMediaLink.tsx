'use client'

import React from 'react'

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
      <div className="text-[#4231ff] text-left font-['Montserrat-Medium',_sans-serif] text-base font-medium relative flex items-center justify-start">
        {name}
      </div>
      <img
        className="shrink-0 w-6 h-6 relative overflow-visible"
        src={iconSrc}
        alt={`${name} icon`}
      />
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