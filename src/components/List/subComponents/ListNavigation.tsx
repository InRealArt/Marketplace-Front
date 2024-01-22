interface ListNavigationProps {
  nav: string[];
  navActive: string;
  setNavActive: React.Dispatch<React.SetStateAction<string>>;
}

const ListNavigation = ({
  nav,
  navActive,
  setNavActive,
}: ListNavigationProps) => {
  return (
    <nav className="ListHeader__nav">
      {nav.map((title) => (
        <h1
          key={title}
          onClick={() => setNavActive(title)}
          className={`ListHeader__title ${
            navActive === title ? 'ListHeader__title--active' : ''
          }`}
        >
          {title}
        </h1>
      ))}
    </nav>
  );
};

export default ListNavigation;
