import { ArtistId, CollectionId } from "@/types"
import { RootState } from "../../store"

export const getCollections = (state: RootState) => state.collections.list
export const getCollectionsByArtist = (state: RootState, artistId: ArtistId) => state.collections.list.filter(collection => collection.artistId === artistId)
export const getCollectionById = (state: RootState, collectionId: CollectionId) => state.collections.list.find(collection => collection.id === collectionId)
