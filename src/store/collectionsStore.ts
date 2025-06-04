import { create } from 'zustand'
import { fetchCollections } from '@/lib/collections'
import { CollectionType } from '@/types'
import { useArtistsStore } from './artistsStore'

interface CollectionsState {
    collections: CollectionType[]
    isLoading: boolean
    error: Error | null
    fetchCollections: () => Promise<void>
    getCollectionsByArtist: (artistId: number) => CollectionType[]
    getCollectionsByArtistSlug: (artistSlug: string) => CollectionType[]
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
    getCollectionsByArtistSlug: (artistSlug: string) => {
        // Step 1: Get the artist by slug
        const artistsStore = useArtistsStore.getState();
        const artist = artistsStore.getArtistBySlug(artistSlug);

        if (!artist) {
            return [];
        }

        // Step 2: Get collections by artist ID
        return get().collections.filter(collection => collection.artistId === artist.id);
    },
    getCollectionById: (collectionId: number) => {
        return get().collections.find(collection => collection.id === collectionId)
    }
})) 