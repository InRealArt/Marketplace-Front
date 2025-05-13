import { ItemStatus, OrderStatus, ResourceNftStatuses, ResourceTypes } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime/library"
import { Address } from "viem"

export type UserId = string
export type ArtistId = number
export type CollectionId = number
export type OrderId = number

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
  artworkStyle?: string | null
  slug?: string | null
}

export interface CollectionType {
  id: CollectionId
  artistId: ArtistId
  symbol: string
  addressAdmin: string
  contractAddress: string
}

export type NftId = number
export type NftSlug = string | null

export interface NftType {
  id: number
  status: ItemStatus
  idUser: number
  idNftResource?: number | null
  height: Decimal | null
  width: Decimal | null
  intellectualProperty: boolean | null
  intellectualPropertyEndDate: Date | null
  tags: string[]
  priceNftBeforeTax: number
  artworkSupport: string | null
  realViewCount: number
  fakeViewCount: number
  categoryId: number | null
  pricePhysicalBeforeTax: number | null
  priceNftPlusPhysicalBeforeTax: number | null
  creationYear: number | null
  weight: Decimal | null
  name: string | null
  slug: NftSlug
  metaTitle: string | null
  metaDescription: string | null
  description: string | null
  mainImageUrl: string | null
  secondaryImagesUrl: string[]
  qtyPhysicalArt: number | null
  owner?: string | null
  previousOwner?: string | null
  itemId?: number | null
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

export type ListType = NftType[] | CollectionType[] | ArtistType[]

export interface ListNavigationType { tab: string; list: ListType; context: 'artist' | 'collection' | 'nft' }


export enum PriceOption {
  NFT = 'nft',
  PHYSICAL = 'physical',
  NFT_PLUS_PHYSICAL = 'nftPlusPhysical'
}

export type PurchaseType = PriceOption.PHYSICAL | PriceOption.NFT | PriceOption.NFT_PLUS_PHYSICAL
