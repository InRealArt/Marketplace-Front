import { PhysicalItemStatus, OrderStatus, ResourceNftStatuses, ResourceTypes, Item, PhysicalItem } from "@prisma/client"
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

export type ItemPhysicalType = PhysicalItem & {
  Item: Item
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

export type ListType = ItemPhysicalType[] | CollectionType[] | ArtistType[]

export interface ListNavigationType { tab: string; list: ListType; context: 'artist' | 'collection' | 'nft' }


export enum PriceOption {
  NFT = 'nft',
  PHYSICAL = 'physical',
  NFT_PLUS_PHYSICAL = 'nftPlusPhysical'
}

export type PurchaseType = PriceOption.PHYSICAL | PriceOption.NFT | PriceOption.NFT_PLUS_PHYSICAL
