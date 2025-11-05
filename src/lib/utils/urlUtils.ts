/**
 * Parse search parameters with default values and type conversion
 * @param searchParams - URL search parameters object
 * @returns Parsed parameters with proper types
 */
export function parseArtistSearchParams(searchParams: { [key: string]: string | string[] | undefined }) {
  return {
    page: parseInt((searchParams.page as string) || '1'),
    nationality: (searchParams.nationality as string) || '',
    q: (searchParams.q as string) || ''
  }
}

/**
 * Generic function to parse search parameters with custom defaults
 * @param searchParams - URL search parameters object
 * @param defaults - Default values with their types
 * @returns Parsed parameters with proper types
 */
export function parseSearchParams<T extends Record<string, any>>(
  searchParams: { [key: string]: string | string[] | undefined },
  defaults: T
): T {
  const result = { ...defaults }
  
  Object.keys(defaults).forEach(key => {
    const value = searchParams[key] as string
    const defaultValue = defaults[key]
    
    if (value !== undefined) {
      // Type conversion based on default value type
      if (typeof defaultValue === 'number') {
        (result as any)[key] = parseInt(value) || defaultValue
      } else if (typeof defaultValue === 'boolean') {
        (result as any)[key] = value === 'true'
      } else {
        (result as any)[key] = value
      }
    }
  })
  
  return result
}
