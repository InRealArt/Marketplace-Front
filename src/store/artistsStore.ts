import { create } from 'zustand'
import { fetchArtists } from '@/lib/artists'
import { ArtistType } from '@/types'

interface ArtistsState {
    artists: ArtistType[]
    galleries: ArtistType[]
    isLoading: boolean
    error: Error | null
    fetchArtists: () => Promise<void>
    getArtistById: (id: number) => ArtistType | undefined
    getArtistBySlug: (slug: string) => ArtistType | undefined
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

            // Sépare les artistes des galeries et transforme les données
            const artists = data.filter(artist => !artist.isGallery).map(artist => ({
                ...artist,
                featuredArtwork: artist.featuredArtwork || ''
            }))
            const galleries = data.filter(artist => artist.isGallery).map(artist => ({
                ...artist,
                featuredArtwork: artist.featuredArtwork || ''
            }))

            set({ artists, galleries, isLoading: false })
        } catch (error) {
            set({ isLoading: false, error: error as Error })
        }
    },
    getArtistById: (id: number) => {
        const { artists, galleries } = get()
        return [...artists].concat([...galleries]).find(artist => artist.id === id)
    },
    getArtistBySlug: (slug: string) => {
        const { artists, galleries } = get()
        return [...artists].concat([...galleries]).find(artist => artist.slug === slug)
    }
})) 