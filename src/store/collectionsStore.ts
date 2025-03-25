import { create } from 'zustand'
import { fetchCollections } from '@/lib/collections'
import { CollectionType } from '@/types'

interface CollectionsState {
    collections: CollectionType[]
    isLoading: boolean
    error: Error | null
    fetchCollections: () => Promise<void>
    getCollectionsByArtist: (artistId: number) => CollectionType[]
    getCollectionById: (collectionId: number) => CollectionType | undefined
}

export const useCollectionsStore = create<CollectionsState>((set, get) => ({
    collections: [],
    isLoading: false,
    error: null,
    fetchCollections: async () => {
        // Ne fetch pas si on a déjà des collections
        if (get().collections.length > 0) return

        try {
            set({ isLoading: true, error: null })
            const data = await fetchCollections()
            set({ collections: data, isLoading: false })
        } catch (error) {
            set({ isLoading: false, error: error as Error })
        }
    },
    getCollectionsByArtist: (artistId: number) => {
        return get().collections.filter(collection => collection.artistId === artistId)
    },
    getCollectionById: (collectionId: number) => {
        return get().collections.find(collection => collection.id === collectionId)
    }
})) 