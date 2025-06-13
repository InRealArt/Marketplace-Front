'use client'

import React from 'react'
import FooterSection from './FooterSection'
import SocialMediaLink from './SocialMediaLink'

function Footer() {
  // Configuration des sections du footer  
  const footerSections = [
    {
      title: 'References',
      links: [
        { text: 'Link 01', href: '#' },
        { text: 'Link 02', href: '#' },
        { text: 'Link 03', href: '#' },
        { text: 'Link 04', href: '#' },
        { text: 'Link 05', href: '#' }
      ]
    },
    {
      title: 'About',
      links: [
        { text: 'Link 01', href: '#' },
        { text: 'Link 02', href: '#' },
        { text: 'Link 03', href: '#' },
        { text: 'Link 04', href: '#' },
        { text: 'Link 05', href: '#' }
      ]
    },
    {
      title: 'Customer Service',
      links: [
        { text: 'Link 01', href: '#' },
        { text: 'Link 02', href: '#' },
        { text: 'Link 03', href: '#' },
        { text: 'Link 04', href: '#' },
        { text: 'Link 05', href: '#' }
      ]
    }
  ]

  // Configuration des sections spéciales (Artistes et Galeries)
  const artistsAndGalleriesSection = {
    title: 'Artists',
    links: [
      { text: 'Link 01', href: '#' },
      { text: 'Link 02', href: '#' }
    ],
    galleriesSection: {
      title: 'Galleries',
      links: [
        { text: 'Link 01', href: '#' },
        { text: 'Link 02', href: '#' }
      ]
    }
  }

  // Configuration des réseaux sociaux
  const socialMediaLinks = [
    { name: 'Facebook', iconSrc: '/icons/facebook.svg', href: '#' },
    { name: 'Instagram', iconSrc: '/icons/instagram.svg', href: '#' },
    { name: 'Twitter', iconSrc: '/icons/twitter.svg', href: '#' }
  ]

  // Configuration des liens de footer
  const footerLinks = [
    { text: 'Privacy Center', href: '#' },
    { text: 'Legal Notice', href: '#' },
    { text: 'Terms of Use', href: '#' }
  ]

  return (
    <div className="pt-20 pb-20 flex flex-col gap-2.5 items-start justify-start self-stretch shrink-0 relative">
      <div className="bg-[#ddd2fc] rounded pt-[60px] pr-8 pb-[60px] pl-8 flex flex-col gap-6 items-start justify-start self-stretch shrink-0 relative">
        
        {/* Sections principales */}
        <div className="flex flex-row gap-6 items-start justify-start self-stretch shrink-0 relative">
          
          {/* Section Références */}
          <FooterSection
            title={footerSections[0].title}
            links={footerSections[0].links}
          />

          {/* Section Artistes et Galeries */}
          <div className="flex flex-col gap-8 items-start justify-start shrink-0 w-[282px] relative">
            <FooterSection
              title={artistsAndGalleriesSection.title}
              links={artistsAndGalleriesSection.links}
              width="self-stretch"
            />
            <FooterSection
              title={artistsAndGalleriesSection.galleriesSection.title}
              links={artistsAndGalleriesSection.galleriesSection.links}
              width="self-stretch"
            />
          </div>

          {/* Section À propos */}
          <FooterSection
            title={footerSections[1].title}
            links={footerSections[1].links}
          />

          {/* Section Service clients */}
          <FooterSection
            title={footerSections[2].title}
            links={footerSections[2].links}
          />

        </div>

        {/* Ligne de séparation */}
        <div className="bg-[#4231ff] self-stretch shrink-0 h-px relative"></div>

        {/* Section langue/devise et réseaux sociaux */}
        <div className="flex flex-row items-start justify-between self-stretch shrink-0 relative">
          <div className="flex flex-row gap-2.5 items-center justify-center shrink-0 relative">
            <div className="text-[#4231ff] text-left font-['Montserrat-Medium',_sans-serif] text-base font-medium relative flex items-center justify-start">
              Languages and currency:
            </div>
            <div className="text-[#4231ff] text-left font-['Montserrat-Medium',_sans-serif] text-base font-medium relative flex items-center justify-start">
              English | USD
            </div>
          </div>

          <div className="flex flex-row gap-6 items-start justify-start shrink-0 relative">
            {socialMediaLinks.map((social, index) => (
              <SocialMediaLink
                key={index}
                name={social.name}
                iconSrc={social.iconSrc}
                href={social.href}
              />
            ))}
          </div>
        </div>

        {/* Section copyright et liens légaux */}
        <div className="flex flex-row items-start justify-between self-stretch shrink-0 relative">
          <div className="flex flex-row gap-2.5 items-center justify-center shrink-0 relative">
            <div className="text-[#4231ff] text-left font-['Montserrat-Medium',_sans-serif] text-base font-medium relative flex items-center justify-start">
              © 2025 Inrealart
            </div>
          </div>

          <div className="flex flex-row gap-4 items-center justify-start shrink-0 relative">
            {footerLinks.map((link, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-row gap-1 items-center justify-center shrink-0 relative">
                  <a
                    href={link.href}
                    className="text-[#4231ff] text-left font-['Montserrat-Medium',_sans-serif] text-base font-medium relative flex items-center justify-start"
                  >
                    {link.text}
                  </a>
                </div>
                {index < footerLinks.length - 1 && (
                  <div className="bg-[#4231ff] rounded-[100px] shrink-0 w-2 h-2 relative"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Footer 