import { create } from 'zustand'
import { getNftsByStatus } from '@/lib/nfts'
import { ArtistId, CollectionId, NftId, NftType } from '@/types'
import { ResourceNftStatuses } from '@prisma/client'
import { useCollectionsStore } from './collectionsStore'

interface NftsState {
    nfts: NftType[]
    isLoading: boolean
    error: Error | null
    fetchNfts: () => Promise<void>
    getNftById: (id: NftId) => NftType | undefined
    getNftsByCollection: (collectionId: CollectionId) => NftType[]
    getNftsByArtist: (artistId: ArtistId) => NftType[]
    getIraNfts: () => NftType[]
    getCommunautaryNfts: () => NftType[]
}

export const useNftsStore = create<NftsState>((set, get) => ({
    nfts: [],
    isLoading: false,
    error: null,
    fetchNfts: async () => {
        // Ne fetch pas si on a déjà des NFTs
        if (get().nfts.length > 0) return

        try {
            set({ isLoading: true, error: null })
            const data = await getNftsByStatus([ResourceNftStatuses.LISTED, ResourceNftStatuses.SOLD])
            set({ nfts: data, isLoading: false })
        } catch (error) {
            set({ isLoading: false, error: error as Error })
        }
    },
    getNftById: (id: NftId) => {
        return get().nfts.find(nft => nft.id === id)
    },
    getNftsByCollection: (collectionId: CollectionId) => {
        return get().nfts.filter(nft => nft.collectionId === collectionId)
    },
    getNftsByArtist: (artistId: ArtistId) => {
        // On utilise useCollectionsStore pour obtenir les collections de l'artiste
        const collections = useCollectionsStore.getState().getCollectionsByArtist(artistId)
        const collectionsIdsByArtist = collections.map(collection => collection.id)

        return get().nfts.filter(nft =>
            collectionsIdsByArtist.includes(nft.collectionId)
        )
    },
    getIraNfts: () => {
        return get().nfts.filter(nft => !nft.purchasedOnce)
    },
    getCommunautaryNfts: () => {
        return get().nfts.filter(nft => nft.purchasedOnce)
    }
})) 