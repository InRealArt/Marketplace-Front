import { useEffect } from 'react'
import { useArtistsStore } from '@/store/artistsStore'
import { ArtistId, ArtistType } from '@/types'

/**
 * Hook personnalisé pour accéder et gérer les données des artistes avec Zustand
 */
export function useArtistsData(artistId?: ArtistId) {
    const {
        artists,
        galleries,
        isLoading,
        error,
        fetchArtists
    } = useArtistsStore()

    const getArtistById = (id: ArtistId): ArtistType | undefined => {
        return artists.concat(galleries).find(artist => artist.id === id)
    }

    useEffect(() => {
        fetchArtists()
    }, [fetchArtists])

    return {
        artists,
        galleries,
        isLoading,
        error,
        getArtistById: artistId ? getArtistById(artistId) : undefined
    }
} 