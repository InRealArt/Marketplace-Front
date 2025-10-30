import { ArtistWithRelations } from '@/types'

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
        (artist.Country?.name || '').toLowerCase() === nationality.toLowerCase()
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
        .filter(a => a.countryCode || a.Country?.name)
        .map(a => {
          const code = (a.countryCode || a.Country?.name || '').toUpperCase()
          const label = a.Country?.name || a.countryCode || ''
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
