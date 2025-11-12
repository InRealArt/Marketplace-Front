import { ItemPhysicalType, ArtistWithRelations } from '@/types'
import { mockArtworks, mockArtistDetail } from './artistDetail'
import prisma from "../lib/prisma"
import { mapArtistFromPrisma } from "../lib/utils/artistUtils"

const fallbackArtist: ArtistWithRelations = {
  ...mockArtistDetail,
  id: 2,
  name: 'Monique',
  surname: 'Laville',
  pseudo: 'Monique Laville',
  slug: 'monique-laville',
  biography:
    'Monique Laville est une artiste française dont les œuvres ont été exposées internationalement. Son travail impressionniste capture la lumière méditerranéenne et l’énergie des paysages urbains.',
  photo: '/images/mock/artist/Ekaterina.jpg'
}

const relatedArtists: ArtistWithRelations[] = [mockArtistDetail, fallbackArtist]

const mockArtworkDetail: ItemPhysicalType = {
  ...mockArtworks[0],
  item: {
    ...mockArtworks[0].item,
    tags: mockArtworks[0].item.tags || ['Abstract', 'Modern', 'Charcoal'],
    description:
      mockArtworks[0].item.description ||
      'An expressive charcoal composition exploring unconscious line work and rhythm.',
    secondaryImagesUrl:
      mockArtworks[0].item.secondaryImagesUrl?.length
        ? mockArtworks[0].item.secondaryImagesUrl
        : [
          '/images/Ekaterina/artist2.jpg',
          '/images/Boucheix/artist1.1.jpg',
          '/images/Leloluce/artist3.2.jpg'
        ]
  },
  price: mockArtworks[0].price ?? 3200,
  stockQty: mockArtworks[0].stockQty ?? 1
}

export const mockArtworkMap: Record<string, ItemPhysicalType> = {
  [mockArtworkDetail.item.slug || 'abstract-composition-1']: mockArtworkDetail
}

export async function getArtworkBySlug(slug: string): Promise<ItemPhysicalType | null> {
  await new Promise(resolve => setTimeout(resolve, 250))
  console.log(mockArtworkMap);

  return mockArtworkMap[slug] ?? null
}

export async function getArtworkArtist(slug: string): Promise<ArtistWithRelations | null> {
  await new Promise(resolve => setTimeout(resolve, 150))
  return mockArtistDetail
}

export async function getArtworkRelatedArtists(slug: string): Promise<ArtistWithRelations[]> {
  const artists = await prisma.artist.findMany({
    include: {
      Country: true
    }
  })
  return artists.map(mapArtistFromPrisma)
}

