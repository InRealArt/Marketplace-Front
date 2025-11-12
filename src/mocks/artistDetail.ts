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

// Artist biography data
export const mockArtistBiography = {
  portraitImage: '/images/mock/artist/Ekaterina.jpg',
  soloExhibitions: [
    { year: '2024', exhibition: 'Salutation au soleil', venue: 'Paris', location: 'Paris, France' },
    { year: '2023', exhibition: 'Paradiso', venue: 'Paris', location: 'Paris, France' },
    { year: '2023', exhibition: 'Daydreamer par Ekaterina Aristova', venue: 'Galerie Au Médicis', location: 'Paris, France' },
    { year: '2022', exhibition: 'Ekaterina Aristova', venue: 'Galerie Au Médicis', location: 'Paris, France' },
    { year: '2022', exhibition: 'Ekaterina Aristova', venue: 'Galerie Wanderley Cabral', location: 'Paris, France' },
    { year: '2022', exhibition: 'Les yeux grands fermés', venue: 'Galerie David Cha', location: 'Paris, France' },
    { year: '2021', exhibition: 'Solstice d\'hiver', venue: 'Aldema Design & Art', location: 'Paris, France' },
    { year: '2021', exhibition: 'Manifeste: L\'Art Inconscient', venue: 'Art bureau 29 Exelmans', location: 'Paris, France' },
    { year: '2020', exhibition: 'Terre et Mer', venue: 'Art bureau 29 Exelmans', location: 'Paris, France' },
    { year: '2020', exhibition: 'Ekaterina Aristova', venue: 'Art Yourself Gallery', location: 'New York, États-Unis' },
    { year: '2016', exhibition: 'Ekaterina Aristova', venue: 'Galerie 21 Dauphine', location: 'Paris, France' }
  ],
  groupExhibitions: [
    { year: '2021', exhibition: 'Modern Archetypes', venue: 'Galleria Azur Madrid', location: 'Madrid, Espagne' },
    { year: '2021', exhibition: 'Here we are', venue: 'Rossocinabro Gallery', location: 'Rome, Italie' }
  ],
  publicSales: [
    {
      title: 'Attrape-rêve',
      artworkYear: '2022',
      date: '10 décembre 2024',
      price: '42 500 $',
      auctionHouse: 'Christie’s Online',
      details: 'Cette œuvre a établi un nouveau record pour l’artiste, dépassant de 21 % l’estimation basse.'
    },
    {
      title: 'Svistoplyaska (Danse des sifflets) - Étude en rouge',
      artworkYear: '2023',
      date: '30 avril 2024',
      price: '35 100 $',
      auctionHouse: 'Christie’s Online',
      details: 'Cette vente a été six fois supérieure à l’estimation initiale, soulignant l’engouement croissant pour l’artiste.'
    },
    {
      title: 'Aviateur, Petit Prince',
      artworkYear: '2023',
      date: '20 février 2025',
      estimation: '5 000 – 7 000 €',
      auctionHouse: 'Sotheby’s Paris',
      details: 'Cette œuvre a été présentée lors de la vente "Contemporary Discoveries" de Sotheby’s.'
    }
  ],
  publications: [
    { year: '2025', description: 'Interview dans le cadre du projet InRealArt et présentation de sa nouvelle exposition « Odyssée », ainsi que de sa première série inaugurale de céramiques.' },
    { year: '2023', description: 'Le Quotidien de l’art – « Svistoplyaska (ou “danse des sifflets”) » d’Ekaterina Aristova.' },
    { year: '2023', description: 'Singulart Magazine – « Interview with Ekaterina Aristova ».' },
    { year: '2022', description: 'Ours Magazine – « L’âme est une énergie sans forme ni couleur ».' },
    { year: '2022', description: 'Le Parisien – Portrait d’Ekaterina Aristova.' },
    { year: '2022', description: 'Cinéart Diamond Magazine – « Ekaterina Aristova, peintre de l’âme ».' },
    { year: '2022', description: 'Muse Daily – « Ekaterina Aristova : Let the music move you ».' },
    { year: '2022', description: 'Dolce Magazine – « Aristova du figuratif à l’abstraction ».' },
    { year: '2021', description: 'Artistik Rezo – « Je travaille l’idée, le concept et l’âme ».' },
    { year: '2021', description: 'Beaux Arts Magazine – « Ekaterina Aristova, peintre de l’âme ».' }
  ]
}

// Base artwork templates with different images for testing aspect ratios
const baseArtworks = [
  {
    name: 'Abstract Composition',
    slug: 'abstract-composition',
    price: 2500,
    stockQty: 1,
    description: 'Abstract artwork with charcoal lines',
    image: '/images/Ekaterina/artist2.jpg',
    dimensions: '80 x 80 cm',
    category: 'Painting',
    tags: ['Abstract', 'Colorful', 'Energetic']
  },
  {
    name: 'Unconscious Lines',
    slug: 'unconscious-lines',
    price: 3200,
    stockQty: 1,
    description: 'Drawing with closed eyes technique',
    image: '/images/Boucheix/artist1.1.jpg',
    dimensions: '60 x 90 cm',
    category: 'Painting',
    tags: ['Conceptual', 'Fluid', 'Monochrome']
  },
  {
    name: 'Charcoal Dreams',
    slug: 'charcoal-dreams',
    price: 1800,
    stockQty: 0,
    description: 'Sold out artwork',
    image: '/images/Leloluce/artist3.1.jpg',
    dimensions: '100 x 70 cm',
    category: 'Drawing',
    tags: ['Charcoal', 'Minimal', 'Dreamy']
  },
  {
    name: 'Moscow Memories',
    slug: 'moscow-memories',
    price: 4500,
    stockQty: 1,
    description: 'Large scale abstract piece',
    image: '/images/Her/artist4.1.jpg',
    dimensions: '120 x 150 cm',
    category: 'Painting',
    tags: ['Large Scale', 'Expressive', 'Landscape']
  },
  {
    name: 'Urban Landscape',
    slug: 'urban-landscape',
    price: 2800,
    stockQty: 1,
    description: 'Contemporary urban scene',
    image: '/images/Boucheix/artist1.2.jpg',
    dimensions: '90 x 110 cm',
    category: 'Painting',
    tags: ['Urban', 'Geometric', 'Vibrant']
  },
  {
    name: 'Ethereal Forms',
    slug: 'ethereal-forms',
    price: 3500,
    stockQty: 1,
    description: 'Flowing abstract forms',
    image: '/images/Leloluce/artist3.2.jpg',
    dimensions: '75 x 120 cm',
    category: 'Painting',
    tags: ['Ethereal', 'Soft', 'Pastel']
  },
  {
    name: 'Sunset Reflections',
    slug: 'sunset-reflections',
    price: 2200,
    stockQty: 1,
    description: 'Warm tones and reflections',
    image: '/images/Her/artist4.2.jpg',
    dimensions: '70 x 90 cm',
    category: 'Painting',
    tags: ['Sunset', 'Warm', 'Reflective']
  },
  {
    name: 'Geometric Harmony',
    slug: 'geometric-harmony',
    price: 2900,
    stockQty: 1,
    description: 'Balanced geometric composition',
    image: '/images/Peltzer/artist5.1.jpg',
    dimensions: '80 x 100 cm',
    category: 'Painting',
    tags: ['Geometric', 'Balanced', 'Modern']
  },
  {
    name: 'Nature\'s Whisper',
    slug: 'natures-whisper',
    price: 3100,
    stockQty: 1,
    description: 'Organic forms and textures',
    image: '/images/Bonsard/artist6.jpg',
    dimensions: '95 x 95 cm',
    category: 'Painting',
    tags: ['Organic', 'Textured', 'Nature']
  },
  {
    name: 'Chromatic Waves',
    slug: 'chromatic-waves',
    price: 2600,
    stockQty: 1,
    description: 'Vibrant color transitions',
    image: '/images/Sigrist/artist7.1.jpg',
    dimensions: '110 x 70 cm',
    category: 'Painting',
    tags: ['Chromatic', 'Vibrant', 'Waves']
  },
  {
    name: 'Silent Contemplation',
    slug: 'silent-contemplation',
    price: 3300,
    stockQty: 1,
    description: 'Meditative abstract piece',
    image: '/images/Boucheix/artist1.3.jpg',
    dimensions: '80 x 80 cm',
    category: 'Painting',
    tags: ['Meditative', 'Calm', 'Balanced']
  },
  {
    name: 'Luminous Depths',
    slug: 'luminous-depths',
    price: 2700,
    stockQty: 1,
    description: 'Deep colors with light accents',
    image: '/images/Leloluce/artist3.3.jpg',
    dimensions: '90 x 100 cm',
    category: 'Painting',
    tags: ['Luminous', 'Deep', 'Accents']
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
      slug: base.slug,
      mainImageUrl: base.image,
      secondaryImagesUrl: [],
      description: base.description,
      tags: base.tags,
      category: base.category,
      dimensions: base.dimensions,
      idUser: 1,
      metaDescription: '',
      metaTitle: '',
      realViewCount: 0,
      fakeViewCount: 0,
      featured: false,
      artistId: 1,
      mediumId: 1,
      styleId: 1,
      techniqueId: 1,
      createdAt: new Date()
    } as any
  } as unknown as ItemPhysicalType
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
