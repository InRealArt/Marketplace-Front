import { ArtistWithRelations, ItemPhysicalType } from '@/types'

// Mock artist data - Ekaterina Aristova
export const mockArtistDetail: ArtistWithRelations = {
  id: 1,
  name: 'Ekaterina',
  surname: 'Aristova',
  pseudo: 'Kate Aristov',
  slug: 'ekaterina-aristova',
  biography: 'Avec une carrière artistique impressionnante s\'étendant sur plusieurs années, Ekaterina Aristova, connue sous le nom de Kate Aristov, est devenue une figure emblématique de l\'art moderne en Russie et en France. Née à Moscou en 1986, Aristova a déménagé à Paris en 2009 où, sous l\'influence de son mentor Sergueï Toutounov, elle a embrassé pleinement son potentiel artistique, développant l\'« Art Inconscient » et explorant l\'inconscient en dessinant les yeux fermés pour créer des œuvres abstraites qui captivent par leur ligne continue et leur fusion de lignes au fusain.',
  photo: '/images/Ekaterina.jpg',
  birthYear: 1986,
  isGallery: false,
  featuredArtwork: null,
  countryCode: 'RU',
  countryName: 'Russie',
  websiteUrl: null,
  instagramUrl: null,
  twitterUrl: null,
  facebookUrl: null,
  linkedinUrl: null,
  artworkImages: [],
  mediumTags: ['Peinture'],
  styleTags: ['Art Inconscient', 'Abstrait'],
  techniqueTags: ['Fusain'],
  userId: 'user-1',
  createdAt: new Date(),
  updatedAt: new Date()
}

// Artist intro data
export const mockArtistIntro = {
  artistPhoto: '/images/mock/artist/ekaterina.webp',
  artistBackground: '/images/mock/artist/ekaterina-background.avif',
  citation: '"Je ne suis pas limitée par le médium, la toile, par exemple. J\'aime explorer le nouveau dont je suis curieuse." Ekaterina Aristova - Interview pour InRealArt le 31/08/2025',
  shortBio: 'Avec une carrière artistique impressionnante s\'étendant sur plusieurs années, Ekaterina Aristova, connue sous le nom de Kate Aristov, est devenue une figure emblématique de l\'art moderne en Russie et en France. Née à Moscou en 1986, Aristova a déménagé à Paris en 2009 où, sous l\'influence de son mentor Sergueï Toutounov, elle a embrassé pleinement son potentiel artistique, développant l\'« Art Inconscient » et explorant l\'inconscient en dessinant les yeux fermés pour créer des œuvres abstraites qui captivent par leur ligne continue et leur fusion de lignes au fusain.'
}

// Base artwork templates
const baseArtworks = [
  {
    name: 'Abstract Composition',
    slug: 'abstract-composition',
    price: 2500,
    stockQty: 1,
    description: 'Abstract artwork with charcoal lines',
  },
  {
    name: 'Unconscious Lines',
    slug: 'unconscious-lines',
    price: 3200,
    stockQty: 1,
    description: 'Drawing with closed eyes technique',
  },
  {
    name: 'Charcoal Dreams',
    slug: 'charcoal-dreams',
    price: 1800,
    stockQty: 0,
    description: 'Sold out artwork',
  },
  {
    name: 'Moscow Memories',
    slug: 'moscow-memories',
    price: 4500,
    stockQty: 1,
    description: 'Large scale abstract piece',
  },
]

// Generate 120 artworks for testing
export const mockArtworks: ItemPhysicalType[] = Array.from({ length: 120 }, (_, index) => {
  const baseIndex = index % baseArtworks.length
  const base = baseArtworks[baseIndex]
  const uniqueId = index + 1

  return {
    id: uniqueId,
    price: base.price,
    stockQty: base.stockQty,
    status: 'listed' as any,
    item: {
      id: uniqueId,
      name: `${base.name} #${uniqueId}`,
      slug: `${base.slug}-${uniqueId}`,
      mainImageUrl: '/images/Ekaterina/artist2.jpg',
      secondaryImagesUrl: [],
      description: base.description,
      userId: 'user-1',
      mediumId: 1,
      styleId: 1,
      techniqueId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }
})

// Mock collections data - will be replaced with real data from user
export const mockCollections: any[] = []

// Mock filter options
export const mockFilterOptions = {
  priceRanges: [
    { value: '0-1000', label: 'Under 1000€' },
    { value: '1000-2500', label: '1000€ - 2500€' },
    { value: '2500-5000', label: '2500€ - 5000€' },
    { value: '5000+', label: 'Over 5000€' }
  ],
  sizes: [
    { value: 'small', label: 'Small (< 50cm)' },
    { value: 'medium', label: 'Medium (50-100cm)' },
    { value: 'large', label: 'Large (> 100cm)' }
  ],
  materials: [
    { value: 'canvas', label: 'Canvas' },
    { value: 'paper', label: 'Paper' },
    { value: 'wood', label: 'Wood' },
    { value: 'metal', label: 'Metal' }
  ],
  types: [
    { value: 'painting', label: 'Painting' },
    { value: 'sculpture', label: 'Sculpture' },
    { value: 'drawing', label: 'Drawing' },
    { value: 'mixed-media', label: 'Mixed Media' }
  ]
}

/**
 * Get artist detail by slug (mocked for now)
 * @param slug - Artist slug
 * @returns Artist data or null if not found
 */
export async function getArtistBySlug(slug: string): Promise<ArtistWithRelations | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  // For now, return mock data if slug matches
  if (slug === mockArtistDetail.slug) {
    return mockArtistDetail
  }
  
  return null
}

/**
 * Get artworks by artist slug (mocked for now)
 * @param slug - Artist slug
 * @returns Array of artworks
 */
export async function getArtworksByArtistSlug(slug: string): Promise<ItemPhysicalType[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return mockArtworks
}

/**
 * Get collections by artist slug (mocked for now)
 * @param slug - Artist slug
 * @returns Array of collections
 */
export async function getCollectionsByArtistSlug(slug: string): Promise<any[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return mockCollections
}
