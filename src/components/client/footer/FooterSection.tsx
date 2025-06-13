import React from 'react'
import FooterLink from './FooterLink'

interface FooterLinkData {
  text: string
  href?: string
  onClick?: () => void
}

interface FooterSectionProps {
  title: string
  links: FooterLinkData[]
  width?: string
}

function FooterSection({ title, links, width = 'w-[282px]' }: FooterSectionProps) {
  return (
    <div className={`flex flex-col gap-2 items-start justify-start shrink-0 ${width} relative`}>
      <div className="text-[#4231ff] text-left font-['BricolageGrotesque-Medium',_sans-serif] text-2xl font-medium relative self-stretch">
        {title}
      </div>
      <div className="bg-[#4231ff] self-stretch shrink-0 h-px relative"></div>
      <div className="flex flex-col gap-0 items-start justify-center self-stretch shrink-0 relative">
        {links.map((link, index) => (
          <FooterLink
            key={index}
            text={link.text}
            href={link.href}
            onClick={link.onClick}
          />
        ))}
      </div>
    </div>
  )
}

export default FooterSection 