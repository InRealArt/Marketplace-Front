'use client'

import { useState } from 'react'
import Link from 'next/link'
import FooterSection from './FooterSection'
import SocialMediaLink from './SocialMediaLink'

// ─── Data ──────────────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  {
    title: 'Discover Art',
    links: [
      { text: 'Browse All Artworks', href: '/artworks' },
      { text: 'Paintings', href: '/artworks?category=painting' },
      { text: 'Sculptures', href: '/artworks?category=sculpture' },
      { text: 'Photography', href: '/artworks?category=photography' },
      { text: 'Digital Art & NFTs', href: '/artworks?category=digital' },
      { text: 'Limited Editions', href: '/artworks?tag=limited-edition' },
      { text: 'New Arrivals', href: '/artworks?sort=newest' },
    ],
  },
  {
    title: 'Artists',
    links: [
      { text: 'Discover Artists', href: '/artists' },
      { text: 'Emerging Artists', href: '/artists?type=emerging' },
      { text: 'Featured Artists', href: '/artists?type=featured' },
      { text: 'Become an Artist', href: '/artists/join' },
      { text: 'Artist Program', href: '/artists/program' },
    ],
  },
  {
    title: 'Collections',
    links: [
      { text: 'Curated Collections', href: '/collections' },
      { text: 'Abstract Art', href: '/collections?style=abstract' },
      { text: 'Contemporary Art', href: '/collections?style=contemporary' },
      { text: 'Modern Masters', href: '/collections?style=modern' },
      { text: 'Street Art', href: '/collections?style=street' },
    ],
  },
  {
    title: 'About InRealArt',
    links: [
      { text: 'Our Story', href: '/about' },
      { text: 'How It Works', href: '/how-it-works' },
      { text: 'Press & Media', href: '/press' },
      { text: 'Blog', href: '/blog' },
      { text: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'Help & Support',
    links: [
      { text: 'FAQ', href: '/faq' },
      { text: 'Shipping & Delivery', href: '/shipping' },
      { text: 'Returns & Exchanges', href: '/returns' },
      { text: 'Contact Us', href: '/contact' },
      { text: 'Secure Payment', href: '/payment-security' },
    ],
  },
]

const SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://www.instagram.com/inrealart' },
  { name: 'Twitter', href: 'https://twitter.com/inrealart' },
  { name: 'Facebook', href: 'https://www.facebook.com/inrealart' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/inrealart' },
]

const LEGAL_LINKS = [
  { text: 'Privacy Policy', href: '/privacy' },
  { text: 'Legal Notice', href: '/legal' },
  { text: 'Terms of Use', href: '/terms' },
  { text: 'Cookie Policy', href: '/cookies' },
]

// ─── Trust badges ──────────────────────────────────────────────────────────────

// Each badge uses an inline SVG to avoid external image requests and keep
// rendering fully self-contained. Icons are aria-hidden; the text label
// carries the accessible meaning.
const TRUST_BADGES = [
  {
    label: 'Secure Payment',
    icon: (
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    label: 'Authentic Original Works',
    icon: (
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    label: 'Blockchain Certificate',
    icon: (
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    label: 'Worldwide Shipping',
    icon: (
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    label: 'Easy Returns',
    icon: (
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 .49-4.61" />
      </svg>
    ),
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email.trim()) {
      // TODO: wire to Brevo or other email service via server action
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    // role="contentinfo" is the implicit ARIA role of <footer> when it's a
    // landmark at the page level, but we make it explicit for clarity.
    <footer
      role="contentinfo"
      className="bg-[#212224] mt-24 w-full text-white"
    >
      {/* ── TOP SECTION: Brand + Newsletter ──────────────────────────────── */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-[1414px] px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

            {/* Brand block */}
            <div className="flex flex-col gap-3 max-w-md">
              <Link
                href="/"
                aria-label="InRealArt — homepage"
                className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b39e73] focus-visible:ring-offset-2 focus-visible:ring-offset-[#212224] rounded-sm"
              >
                {/* Logotype: "InReal" in light weight, "Art" in bold, gold accent on "Art" */}
                <span className="font-montserrat text-3xl sm:text-4xl tracking-tight leading-none">
                  <span className="font-light text-white">InReal</span>
                  <span className="font-bold text-[#b39e73]">Art</span>
                </span>
              </Link>
              <p className="font-montserrat text-sm text-white/60 leading-relaxed max-w-xs">
                The World&apos;s Leading Online Marketplace for Original Art &amp; NFTs
              </p>
            </div>

            {/* Newsletter signup */}
            <div className="flex flex-col gap-3 w-full lg:max-w-sm xl:max-w-md">
              <p
                id="newsletter-heading"
                className="font-montserrat font-semibold text-sm uppercase tracking-widest text-white"
              >
                Stay Inspired
              </p>
              <p className="font-montserrat text-xs text-white/50 -mt-1">
                New artists, exclusive drops & art market insights — straight to your inbox.
              </p>

              {subscribed ? (
                <p className="font-montserrat text-sm text-[#b39e73] py-3">
                  Thank you for subscribing! We&apos;ll be in touch soon.
                </p>
              ) : (
                <form
                  onSubmit={handleNewsletterSubmit}
                  aria-labelledby="newsletter-heading"
                  className="flex flex-col sm:flex-row gap-2"
                >
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    autoComplete="email"
                    className="flex-1 bg-white/5 border border-white/20 rounded-md px-4 py-2.5 font-montserrat text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#b39e73] focus:ring-1 focus:ring-[#b39e73] transition-colors duration-200"
                  />
                  <button
                    type="submit"
                    className="shrink-0 bg-[#786df2] hover:bg-[#6358e8] text-white font-montserrat font-semibold text-sm px-5 py-2.5 rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#786df2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#212224] whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ── MAIN NAV SECTION: 5 columns ───────────────────────────────────── */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-[1414px] px-6 sm:px-8 lg:px-12 py-12">
          {/* nav landmark with descriptive label for screen readers */}
          <nav aria-label="Footer site navigation">
            <ul
              role="list"
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6"
            >
              {NAV_SECTIONS.map((section) => (
                <li key={section.title}>
                  <FooterSection title={section.title} links={section.links} />
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* ── TRUST BADGES SECTION ─────────────────────────────────────────── */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-[1414px] px-6 sm:px-8 lg:px-12 py-8">
          {/* Announced as a list of trust features for screen readers */}
          <ul
            role="list"
            aria-label="Our guarantees"
            className="flex flex-wrap justify-center lg:justify-between gap-4"
          >
            {TRUST_BADGES.map((badge) => (
              <li
                key={badge.label}
                className="flex items-center gap-3 bg-white/5 rounded-lg px-5 py-3 flex-1 min-w-[160px] max-w-[220px] border border-white/5"
              >
                {/* Icon colored with gold accent */}
                <span className="text-[#b39e73] shrink-0" aria-hidden="true">
                  {badge.icon}
                </span>
                <span className="font-montserrat text-xs font-medium text-white/70 leading-snug">
                  {badge.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── BOTTOM BAR ────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1414px] px-6 sm:px-8 lg:px-12 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">

          {/* Copyright */}
          <p className="font-montserrat text-xs text-white/40 order-3 md:order-1">
            &copy; 2026 InRealArt &mdash; All rights reserved
          </p>

          {/* Social media icons — centered on all viewports */}
          <nav
            aria-label="Social media links"
            className="order-1 md:order-2"
          >
            <ul role="list" className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.name}>
                  <SocialMediaLink name={social.name} href={social.href} />
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal links */}
          <nav
            aria-label="Legal links"
            className="order-2 md:order-3"
          >
            <ul
              role="list"
              className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
            >
              {LEGAL_LINKS.map((link, index) => (
                <li key={link.href} className="flex items-center gap-4">
                  <Link
                    href={link.href}
                    className="font-montserrat text-xs text-white/40 hover:text-[#c6b695] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b39e73] focus-visible:ring-offset-2 focus-visible:ring-offset-[#212224] rounded-sm"
                  >
                    {link.text}
                  </Link>
                  {/* Pipe separator between items — hidden from screen readers */}
                  {index < LEGAL_LINKS.length - 1 && (
                    <span
                      className="text-white/20 text-xs select-none"
                      aria-hidden="true"
                    >
                      |
                    </span>
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
