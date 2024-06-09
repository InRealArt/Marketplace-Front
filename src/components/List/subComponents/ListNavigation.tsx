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
    <nav className="ListHeader__nav">
      {nav.map((navItem) => (
        <h1
          key={navItem.tab}
          onClick={() => setNavActive(navItem)}
          className={`ListHeader__title ${
            navActive.tab === navItem.tab ? 'ListHeader__title--active' : ''
          }`}
        >
          {navItem.tab}
        </h1>
      ))}
      {viewAllLink && (
        <Button
          link={viewAllLink}
          text="View All"
          additionalClassName="viewAll Button--viewAll--mobile"
        />
      )}
    </nav>
  );
};

export default ListNavigation;
