'use client'

import type { MouseEvent } from 'react'
import Link from 'next/link'

interface FooterLinkProps {
  text: string
  href?: string
  onClick?: () => void
}

function FooterLink({ text, href, onClick }: FooterLinkProps) {
  const linkClasses =
    'font-montserrat text-sm font-normal text-white/70 hover:text-[#c6b695] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b39e73] focus-visible:ring-offset-2 focus-visible:ring-offset-[#212224] rounded-sm'

  if (href) {
    const isExternal = href.startsWith('http://') || href.startsWith('https://')

    if (isExternal) {
      // For external links with an onClick handler, prevent navigation and
      // run the callback instead. Without a handler, follow the href normally.
      const handleExternalClick = onClick
        ? (e: MouseEvent) => {
            e.preventDefault()
            onClick()
          }
        : undefined

      return (
        <a
          href={href}
          onClick={handleExternalClick}
          className={linkClasses}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      )
    }

    // Next.js Link handles client-side navigation; pass onClick directly so
    // navigation is not suppressed.
    return (
      <Link href={href} onClick={onClick} className={linkClasses}>
        {text}
      </Link>
    )
  }

  return (
    <button
      onClick={onClick}
      className={`${linkClasses} cursor-pointer bg-transparent border-0 p-0 text-left`}
    >
      {text}
    </button>
  )
}

export default FooterLink
