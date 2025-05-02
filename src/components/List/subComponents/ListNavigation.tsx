import Button from "@/components/Button/Button";
import { ListNavigationType } from "@/types";

interface ListNavigationProps {
  nav: ListNavigationType[];
  navActive: ListNavigationType;
  setNavActive: React.Dispatch<React.SetStateAction<ListNavigationType>>;
  viewAllLink?: string
}

const ListNavigation = ({
  nav,
  navActive,
  setNavActive,
  viewAllLink
}: ListNavigationProps) => {
  return (
    <nav className="flex items-center w-full lg:w-auto">
      {nav.map((navItem) => (
        <h1
          key={navItem.tab}
          onClick={() => setNavActive(navItem)}
          className={`relative cursor-pointer inline-block font-semibold py-[15px] pr-[25px] font-montserrat text-lg lg:text-3xl lg:py-[25px] ${
            navActive.tab === navItem.tab ? 'after:content-[""] after:absolute after:w-full after:h-[2px] after:bottom-[-2px] after:left-0 after:bg-[#b39e73]' : ''
          }`}
        >
          {navItem.tab}
        </h1>
      ))}
      {viewAllLink && (
        <Button
          link={viewAllLink}
          text="View All"
          additionalClassName="viewAll"
          className="flex ml-auto lg:hidden"
        />
      )}
    </nav>
  );
};

export default ListNavigation;
