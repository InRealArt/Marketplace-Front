import { useEffect } from 'react'
import { useArtistsStore } from '@/store/artistsStore'
import { useCollectionsStore } from '@/store/collectionsStore'
import { useNftsStore } from '@/store/nftsStore'
import { ArtistId } from '@/types'
import { useAccount } from 'wagmi'

/**
 * Hook personnalisé pour accéder et gérer les données avec Zustand
 * Équivalent de useFetchData qui utilise Redux
 */
const useZustandFetchData = (artistId?: ArtistId) => {
    const { address, isConnected } = useAccount()

    // Récupération des données depuis les stores Zustand
    const {
        artists,
        galleries,
        fetchArtists
    } = useArtistsStore()

    const {
        collections,
        fetchCollections
    } = useCollectionsStore()

    const {
        nfts,
        getIraNfts,
        getCommunautaryNfts,
        getNftsByArtist,
        fetchNfts
    } = useNftsStore()

    // Extraire les données calculées
    const iraNfts = getIraNfts()
    const communautaryNfts = getCommunautaryNfts()
    const nftsByArtist = artistId ? getNftsByArtist(artistId) : []

    // Fonction pour rafraîchir les données
    const refetch = () => {
        fetchCollections()
        fetchNfts()
    }

    // Charger les données au chargement du composant
    useEffect(() => {
        if (collections.length === 0) {
            fetchCollections()
        }
        if (artists.length === 0) {
            fetchArtists()
        }
        if (nfts.length === 0) {
            fetchNfts()
        }
    }, [artists.length, collections.length, nfts.length, fetchArtists, fetchCollections, fetchNfts])

    return {
        artists,
        galleries,
        nfts,
        communautaryNfts,
        iraNfts,
        collections,
        nftsByArtist,
        refetch
    }
}

export default useZustandFetchData 