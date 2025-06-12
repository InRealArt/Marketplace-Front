import Link from "next/link";

interface NavbarItemProps {
    text: string
    href: string
  }
  
function NavbarItem ({ text, href }: NavbarItemProps) {
    return (
      <Link href={href}>
        <div className="text-[#f6f8ff] text-sm font-medium cursor-pointer hover:text-white transition-colors">
          {text}
        </div>
      </Link>
    )
  }

export default NavbarItem