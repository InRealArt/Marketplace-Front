import { ArtistWithRelations } from '@/types'

/**
 * Centralized mapping function to transform Country (capital C from Prisma) to country (lowercase)
 * This should be used everywhere artist data is fetched from Prisma
 */
export function mapArtistFromPrisma(artist: any): ArtistWithRelations {
  const { Country, ...rest } = artist
  return {
    ...rest,
    country: Country
  } as ArtistWithRelations
}

/**
 * Map LandingArtist with its related Artist to ArtistWithRelations
 * Combines LandingArtist fields (intro, description, mediumTags, etc.) with Artist base data
 */
export function mapLandingArtistToArtistWithRelations(landingArtist: any): ArtistWithRelations {
  const { artist, ...landingData } = landingArtist
  const { Country, ...artistData } = artist

  // Parse artworkImages if it's a JSON string
  let artworkImages = []
  if (landingData.artworkImages) {
    try {
      artworkImages = typeof landingData.artworkImages === 'string'
        ? JSON.parse(landingData.artworkImages)
        : landingData.artworkImages
    } catch (e) {
      artworkImages = []
    }
  }

  return {
    ...artistData,
    country: Country,
    // Override with LandingArtist specific fields
    intro: landingData.intro || artistData.intro,
    description: landingData.description || artistData.description,
    mediumTags: landingData.mediumTags || [],
    artworkStyle: landingData.artworkStyle || artistData.artworkStyle,
    artworkImages: artworkImages,
    // Use LandingArtist slug if available, otherwise use Artist slug
    slug: landingData.slug || artistData.slug,
    // Use LandingArtist imageUrl if available, otherwise use Artist imageUrl
    imageUrl: landingData.imageUrl || artistData.imageUrl,
    // Biography fields from LandingArtist
    biographyHeader1: landingData.biographyHeader1,
    biographyText1: landingData.biographyText1,
    biographyHeader2: landingData.biographyHeader2,
    biographyText2: landingData.biographyText2,
    biographyHeader3: landingData.biographyHeader3,
    biographyText3: landingData.biographyText3,
    quoteText: landingData.quoteFromInRealArt,
  } as ArtistWithRelations
}

/**
 * Filter artists based on nationality and search query
 * @param artists - Array of artists to filter
 * @param nationality - Country code or name to filter by
 * @param query - Search query to match against artist names
 * @returns Filtered array of artists
 */
export function filterArtists(
  artists: ArtistWithRelations[],
  nationality: string,
  query: string
): ArtistWithRelations[] {
  return artists.filter(artist => {
    // Nationality filter
    if (nationality) {
      const code = nationality.toUpperCase()
      const matchesCountry = (artist.countryCode || '').toUpperCase() === code ||
        (artist.countryName || '').toLowerCase() === nationality.toLowerCase()
      if (!matchesCountry) return false
    }

    // Search filter
    if (query) {
      const searchQuery = query.trim().toLowerCase()
      const name = `${artist.name} ${artist.surname}`.toLowerCase()
      if (!name.toLowerCase().includes(searchQuery)) return false
    }

    return true
  })
}

/**
 * Extract unique nationalities from artists for filter dropdown
 * @param artists - Array of artists
 * @returns Array of nationality options with code and label
 */
export function extractNationalities(artists: ArtistWithRelations[]): { code: string; label: string }[] {
  return Array.from(
    new Map(
      artists
        .filter(a => a.country?.code || a.country?.name)
        .map(a => {
          const code = (a.country?.code || '').toUpperCase()
          const label = a.country?.name || ''
          return [code, label]
        })
    ),
    ([code, label]) => ({ code, label })
  )
}

/**
 * Paginate an array of items
 * @param items - Array to paginate
 * @param page - Current page number (1-based)
 * @param pageSize - Number of items per page
 * @returns Object with paginated items and pagination info
 */
export function paginateItems<T>(
  items: T[],
  page: number,
  pageSize: number
): {
  items: T[]
  totalPages: number
  currentPage: number
  start: number
  end: number
} {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * pageSize
  const end = start + pageSize
  const paginatedItems = items.slice(start, end)

  return {
    items: paginatedItems,
    totalPages,
    currentPage,
    start,
    end
  }
}
