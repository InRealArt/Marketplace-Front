import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { ReadonlyURLSearchParams } from 'next/navigation'

/**
 * Update URL search parameters while preserving existing ones and scroll position
 * @param router - Next.js router instance
 * @param searchParams - Current search parameters
 * @param basePath - Base path for the route (e.g., '/artists')
 * @param newParams - New parameters to update
 * @param defaultValues - Default values to omit from URL (optional)
 */
export function updateUrlSearchParams(
  router: AppRouterInstance,
  searchParams: ReadonlyURLSearchParams,
  basePath: string,
  newParams: Record<string, string | number | undefined>,
  defaultValues: Record<string, string | number> = {}
) {
  const params = new URLSearchParams(searchParams.toString())
  
  Object.entries(newParams).forEach(([key, value]) => {
    const defaultValue = defaultValues[key]
    
    // Remove param if it's empty, undefined, or matches default value
    if (value === '' || value === undefined || value === defaultValue) {
      params.delete(key)
    } else {
      params.set(key, value.toString())
    }
  })
  
  const newUrl = params.toString() ? `${basePath}?${params.toString()}` : basePath
  
  // Use router.replace with scroll: false to prevent automatic scroll reset
  router.replace(newUrl, { scroll: false })
}

/**
 * Create a URL parameter updater function with preset configuration
 * @param router - Next.js router instance
 * @param searchParams - Current search parameters
 * @param basePath - Base path for the route
 * @param currentParams - Current parameter values
 * @param defaultValues - Default values to omit from URL
 * @returns Function to update specific parameters
 */
export function createParamUpdater(
  router: AppRouterInstance,
  searchParams: ReadonlyURLSearchParams,
  basePath: string,
  currentParams: Record<string, string | number>,
  defaultValues: Record<string, string | number> = { page: 1 }
) {
  return (newParams: Partial<typeof currentParams>) => {
    updateUrlSearchParams(
      router,
      searchParams,
      basePath,
      { ...currentParams, ...newParams },
      defaultValues
    )
  }
}

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
