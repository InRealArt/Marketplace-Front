import { OrderStatus, ResourceNftStatuses, ResourceTypes } from "@prisma/client"
import { Address } from "viem"

export type UserId = string
export type ArtistId = number
export type OrderId = number
export interface ArtistType {
  id: ArtistId
  name: string
  surname: string
  pseudo: string
  description: string
  imageUrl: string
  publicKey: string
  isGallery?: boolean | null
  backgroundImage?: string | null
}

export type CollectionId = number

export interface CollectionType {
  id: CollectionId
  artistId: ArtistId
  symbol: string
  addressAdmin: string
  contractAddress: string
}

export type NftId = number

export interface NftType {
  id?: NftId
  tokenId?: number | null
  tokenUri?: string | null
  itemId?: number | null
  certificateUri?: string | null
  status: ResourceNftStatuses
  type: ResourceTypes
  minter?: string | Address
  imageUri: string | null,
  name: string
  description: string
  collectionId: number
  price?: number
  tags?: string[]
  owner?: string | null
  previousOwner?: string | null
  transactionHash?: string | null
  mockups?: string[]
  purchasedOnce?: boolean | null
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
