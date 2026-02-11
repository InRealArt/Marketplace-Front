import type { Item, PhysicalItem, ArtworkMedium, ArtworkStyle, ArtworkTechnique, Artist, Country, Prisma } from '../prisma/generated/prisma/client'
type Decimal = Prisma.Decimal

export type Address = `0x${string}`

export enum OrderStatus {
  WAITING_FOR_CONFIRMATION = 'WAITING_FOR_CONFIRMATION',
  CONFIRMED = 'CONFIRMED',
  PROCESS_OF_DELIVERY = 'PROCESS_OF_DELIVERY',
  DELIVER = 'DELIVER'
}

export type UserId = string
export type ArtistId = number
export type CollectionId = number
export type OrderId = number

// Extended Artist type that includes all the new fields that exist in the database
export type ArtistWithRelations = Artist & {
  country?: Country | null
  artworkImages?: ArtistArtworkImageType[]
  // These fields exist in the database but TypeScript might not recognize them yet
  countryName?: string | null
  mediumTags?: string[]
  styleTags?: string[]
  techniqueTags?: string[]
  role?: string | null
  photo?: string | null
  biography?: string | null
  intro?: string | null
  quoteHeader?: string | null
  quoteText?: string | null
  biographyHeader1?: string | null
  biographyText1?: string | null
  biographyHeader2?: string | null
  biographyText2?: string | null
  biographyHeader3?: string | null
  biographyText3?: string | null
}

export interface ArtistType {
  id: ArtistId
  name: string
  surname: string
  pseudo: string
  description: string
  publicKey: string
  imageUrl: string
  isGallery: boolean
  backgroundImage?: string | null
  featuredArtwork?: string | null
  artworkStyle?: string | null
  slug?: string | null
  // Extended profile fields
  role?: string | null
  photo?: string | null
  biography?: string | null
  intro?: string | null
  countryCode?: string | null
  countryName?: string | null
  mediumTags?: string[]
  styleTags?: string[]
  techniqueTags?: string[]
  birthYear?: number | null
  userId?: string | null
  quoteHeader?: string | null
  quoteText?: string | null
  biographyHeader1?: string | null
  biographyText1?: string | null
  biographyHeader2?: string | null
  biographyText2?: string | null
  biographyHeader3?: string | null
  biographyText3?: string | null
  // Social media fields (existing)
  websiteUrl?: string | null
  facebookUrl?: string | null
  instagramUrl?: string | null
  twitterUrl?: string | null
  linkedinUrl?: string | null
  // Legacy fields
  quote?: string | null
  testimonial?: string | null
}

export interface ArtistArtworkImageType {
  image: string
  name: string
  price?: number
  url: string
}

export interface ArtistData {
  id: number
  name: string
  role: string
  photo: string
  biography?: string | null
  intro: string
  description: string
  slug: string
  artistId?: number // ID de l'artiste dans la table Artist (clé étrangère)
  countryCode?: string | null
  countryName?: string | null
  mediumTags?: string[]
  styleTags?: string[]
  techniqueTags?: string[]
  userId?: string | null
  birthYear?: number | null
  quoteHeader?: string | null
  quoteText?: string | null
  biographyHeader1?: string | null
  biographyText1?: string | null
  biographyHeader2?: string | null
  biographyText2?: string | null
  biographyHeader3?: string | null
  biographyText3?: string | null
  artworkImages: ArtistArtworkImageType[]
}

export interface CollectionType {
  id: CollectionId
  artistId: ArtistId
  symbol: string
  addressAdmin: string
  contractAddress: string | null
}

export type NftId = number
export type NftSlug = string | null

export type ItemPhysicalType = PhysicalItem & {
  item: Item
}

export type ItemWithRelations = Item & {
  physicalItem: PhysicalItem | null
  medium: ArtworkMedium | null
  style: ArtworkStyle | null
  technique: ArtworkTechnique | null
  user: {
    id: number
    firstName: string | null
    lastName: string | null
    Artist: {
      id: number
      name: string
      surname: string
      pseudo: string
      slug: string | null
    } | null
  }
}

export interface OrderType {
  id: OrderId
  created_at?: string;
  userId: UserId
  nftId: number
  orderStatus: OrderStatus
}

export enum ModalType {
  BUY,
  SELL
}

export type ListType = ItemPhysicalType[] | CollectionType[] | ArtistWithRelations[]

export interface ListNavigationType { tab: string; list: ListType; context: 'artist' | 'collection' | 'artwork' }


export enum PriceOption {
  NFT = 'nft',
  PHYSICAL = 'physical',
  NFT_PLUS_PHYSICAL = 'nftPlusPhysical'
}

export type PurchaseType = PriceOption.PHYSICAL | PriceOption.NFT | PriceOption.NFT_PLUS_PHYSICAL
