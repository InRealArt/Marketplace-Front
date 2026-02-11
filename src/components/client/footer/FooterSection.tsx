import FooterLink from './FooterLink'

interface FooterLinkData {
  text: string
  href?: string
  onClick?: () => void
}

interface FooterSectionProps {
  title: string
  links: FooterLinkData[]
}

function FooterSection({ title, links }: FooterSectionProps) {
  return (
    <div className="flex flex-col gap-3 items-start justify-start">
      {/* Section heading — uppercase, tight tracking, Montserrat semibold */}
      <h3 className="font-montserrat font-semibold text-sm uppercase tracking-widest text-white">
        {title}
      </h3>

      {/* Gold separator line — signals brand color instead of generic white */}
      <div
        className="bg-[#b39e73] h-px w-8 shrink-0"
        aria-hidden="true"
      />

      {/* Link list — semantic ul/li for SEO and screen readers */}
      <ul className="flex flex-col gap-1.5 mt-1">
        {links.map((link) => (
          <li key={link.text}>
            <FooterLink
              text={link.text}
              href={link.href}
              onClick={link.onClick}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FooterSection
