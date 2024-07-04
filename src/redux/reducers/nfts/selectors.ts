import { ArtistId, CollectionId, NftId } from "@/types"
import { RootState } from "../../store"
import { getCollectionsByArtist } from "../collections/selectors"

export const getNfts = (state: RootState) => state.nfts.list
export const getCommunautaryNfts = (state: RootState) => state.nfts.list
export const getNftById = (state: RootState, nftId: NftId) => state.nfts.list.find(nft => nft.id === nftId)
export const getNftsByCollection = (state: RootState, collectionId: CollectionId) => state.nfts.list.filter(nft => nft.collectionId === collectionId)
export const getNftsByArtist = (state: RootState, artistId: ArtistId) => {
  const collections = getCollectionsByArtist(state, artistId)
  const collectionsIdsByArtist = collections.map(collection => collection.id)
  return state.nfts.list.filter(nft => collectionsIdsByArtist.includes(nft.collectionId))
}
export const getNftsTags = (state: RootState) => {
  const tags = state.nfts.list.map(nft => nft.tags !== undefined ? nft.tags : []).flat(1)
  return tags.filter((item, index) => tags.indexOf(item) === index);
}


