'use client'

import React from 'react'

interface FooterLinkProps {
  text: string
  href?: string
  onClick?: () => void
}

function FooterLink({ text, href, onClick }: FooterLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }

  const linkContent = (
    <div className="text-[#4231ff] text-left font-['Montserrat-Medium',_sans-serif] text-base font-medium relative flex items-center justify-start">
      {text}
    </div>
  )

  return (
    <div className="pt-2 pb-2 flex flex-row gap-2.5 items-center justify-start self-stretch shrink-0 relative">
      {href ? (
        <a href={href} onClick={handleClick} className="contents">
          {linkContent}
        </a>
      ) : (
        <button onClick={handleClick} className="contents">
          {linkContent}
        </button>
      )}
    </div>
  )
}

export default FooterLink 