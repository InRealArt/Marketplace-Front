import { create } from 'zustand'
import { fetchArtists } from '@/lib/artists'
import { ArtistType } from '@/types'

interface ArtistsState {
    artists: ArtistType[]
    galleries: ArtistType[]
    isLoading: boolean
    error: Error | null
    fetchArtists: () => Promise<void>
}

export const useArtistsStore = create<ArtistsState>((set, get) => ({
    artists: [],
    galleries: [],
    isLoading: false,
    error: null,
    fetchArtists: async () => {
        // Ne fetch pas si on a déjà des données et qu'on ne force pas le refresh
        if (get().artists.length > 0) return

        try {
            set({ isLoading: true, error: null })
            const data = await fetchArtists()

            // Sépare les artistes des galeries
            const artists = data.filter(artist => !artist.isGallery)
            const galleries = data.filter(artist => artist.isGallery)

            set({ artists, galleries, isLoading: false })
        } catch (error) {
            set({ isLoading: false, error: error as Error })
        }
    }
})) 