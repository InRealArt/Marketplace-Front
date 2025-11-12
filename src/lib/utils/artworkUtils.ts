import { ItemPhysicalType } from '@/types'
import { paginateItems } from './artistUtils'

export interface ArtworkSearchParams {
  page: number
  priceRange: string
  size: string
  material: string
  type: string
}

export function parseArtworkSearchParams(
  params: Record<string, string | string[] | undefined>
): ArtworkSearchParams {
  const getString = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] ?? '' : value ?? ''

  const page = Number(getString(params.page)) || 1
  const priceRange = getString(params.priceRange)
  const size = getString(params.size)
  const material = getString(params.material)
  const type = getString(params.type)

  return { page, priceRange, size, material, type }
}

const parseDimensions = (dimensions: string | undefined) => {
  if (!dimensions) return { width: 0, height: 0 }
  const matches = dimensions.match(/([0-9]+(?:\.[0-9]+)?)\s*[x×]\s*([0-9]+(?:\.[0-9]+)?)/i)
  if (!matches) return { width: 0, height: 0 }
  const width = parseFloat(matches[1])
  const height = parseFloat(matches[2])
  return { width, height }
}

const getSizeCategory = (dimensions: string | undefined) => {
  const { width, height } = parseDimensions(dimensions)
  const maxDimension = Math.max(width, height)
  if (maxDimension <= 50) return 'small'
  if (maxDimension <= 100) return 'medium'
  return 'large'
}

const matchesPriceRange = (price: number | undefined, priceRange: string) => {
  if (!priceRange || !price) return true
  if (priceRange.includes('+')) {
    const min = parseInt(priceRange.replace('+', ''), 10)
    return price >= min
  }

  const [minStr, maxStr] = priceRange.split('-')
  const min = parseInt(minStr, 10)
  const max = parseInt(maxStr, 10)
  if (Number.isNaN(min) || Number.isNaN(max)) return true

  return price >= min && price <= max
}

export function filterArtworks(
  artworks: ItemPhysicalType[],
  filters: Omit<ArtworkSearchParams, 'page'>
): ItemPhysicalType[] {
  const { priceRange, size, material, type } = filters

  return artworks.filter(artwork => {
    const meta = artwork.item ? (artwork.item as any) : {}
    const matchesPrice = matchesPriceRange(artwork.price, priceRange)

    if (!matchesPrice) return false

    if (size) {
      const artworkSize = getSizeCategory(meta.dimensions)
      if (artworkSize !== size) return false
    }

    if (material) {
      const artworkMaterial = (meta.material || '').toLowerCase()
      if (artworkMaterial !== material.toLowerCase()) return false
    }

    if (type) {
      const artworkType = (meta.category || '').toLowerCase()
      if (artworkType !== type.toLowerCase()) return false
    }

    return true
  })
}

export function paginateArtworks(
  artworks: ItemPhysicalType[],
  page: number,
  pageSize: number
) {
  return paginateItems(artworks, page, pageSize)
}

