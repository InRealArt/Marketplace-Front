export interface NavigationItem {
  text: string;
  href: string;
}

export const navigationItems: NavigationItem[] = [
  { text: 'New artworks', href: '/category/newArtworks' },
  { text: 'Paintings', href: '/category/paintings' },
  { text: 'Sculptures', href: '/category/sculptures' },
  { text: 'Drawings', href: '/category/drawings' },
  { text: 'Artists', href: '/artists' }
]; 