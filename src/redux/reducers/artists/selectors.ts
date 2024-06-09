import { ArtistId, CollectionId } from "@/types"
import { RootState } from "../../store"
import { getCollectionById } from "../collections/selectors"

export const getArtists = (state: RootState) => state.artists.list.filter(artist => !artist.isGallery)
export const getGalleries = (state: RootState) => state.artists.list.filter(artist => artist.isGallery)
export const getArtistById = (state: RootState, artistId: ArtistId) => state.artists.list.find(artist => artist.id === artistId)
export const getArtistByNft = (state: RootState, collectionId: CollectionId) => {
  let collection = getCollectionById(state, collectionId)
  if (collection) {
    return getArtistById(state, collection?.artistId)
  }
  return null
}
