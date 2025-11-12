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
    <footer className="pt-8 pb-8 mt-[2rem] w-full max-w-[90%] mx-auto">
      <div className="bg-[#ddd2fc] rounded-lg p-6 sm:p-8 lg:p-12 xl:p-16">
        
        {/* Main navigation sections */}
        <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-6 mb-8">
          
          {/* References Section */}
          <section>
            <FooterSection
              title={footerSections[0].title}
              links={footerSections[0].links}
            />
          </section>

          {/* Artists and Galleries Section */}
          <section className="sm:col-span-1 lg:col-span-1 xl:col-span-2 space-y-8">
            <FooterSection
              title={artistsAndGalleriesSection.title}
              links={artistsAndGalleriesSection.links}
            />
            <FooterSection
              title={artistsAndGalleriesSection.galleriesSection.title}
              links={artistsAndGalleriesSection.galleriesSection.links}
            />
          </section>

          {/* About Section */}
          <section>
            <FooterSection
              title={footerSections[1].title}
              links={footerSections[1].links}
            />
          </section>

          {/* Customer Service Section */}
          <section>
            <FooterSection
              title={footerSections[2].title}
              links={footerSections[2].links}
            />
          </section>

        </nav>

        {/* Separator */}
        <hr className="bg-[#4231ff] border-0 h-px mb-6" />

        {/* Language/Currency and Social Media */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 items-start sm:items-center">
            <span className="text-[#4231ff] font-montserrat text-sm sm:text-base font-medium">
              Languages and currency:
            </span>
            <span className="text-[#4231ff] font-montserrat text-sm sm:text-base font-medium">
              English | USD
            </span>
          </div>

          <nav aria-label="Social media links">
            <ul className="flex gap-4 sm:gap-6">
              {socialMediaLinks.map((social, index) => (
                <li key={index}>
                  <SocialMediaLink
                    name={social.name}
                    iconSrc={social.iconSrc}
                    href={social.href}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Copyright and Legal Links */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          <p className="text-[#4231ff] font-montserrat text-sm sm:text-base font-medium">
            © 2025 Inrealart
          </p>

          <nav aria-label="Legal links">
            <ul className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
              {footerLinks.map((link, index) => (
                <li key={index} className="flex items-center gap-4">
                  <a
                    href={link.href}
                    className="text-[#4231ff] font-montserrat text-sm sm:text-base font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-[#4231ff] focus:ring-offset-2 rounded"
                  >
                    {link.text}
                  </a>
                  {index < footerLinks.length - 1 && (
                    <span 
                      className="hidden sm:block bg-[#4231ff] rounded-full w-2 h-2" 
                      aria-hidden="true"
                    />
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

      </div>
    </footer>
  )
}

export default Footer 