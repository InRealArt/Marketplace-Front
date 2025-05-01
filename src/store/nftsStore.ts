import { create } from 'zustand'
import { getNftsByStatus } from '@/lib/nfts'
import { ArtistId, CollectionId, NftId, NftSlug, NftType } from '@/types'
import { ItemStatus } from '@prisma/client'
import { useCollectionsStore } from './collectionsStore'
import { useBackofficeUserStore } from './backofficeUserStore'

interface NftsState {
    nfts: NftType[]
    isLoading: boolean
    error: Error | null
    fetchNfts: () => Promise<void>
    getNftBySlug: (slug: NftSlug) => NftType | undefined
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
            const data = await getNftsByStatus([ItemStatus.listed])            
            set({ nfts: data, isLoading: false })
        } catch (error) {
            set({ isLoading: false, error: error as Error })
        }
    },
    getNftBySlug: (slug: NftSlug) => {
        return get().nfts.find(nft => nft.slug === slug)
    },
    getNftById: (id: NftId) => {
        return get().nfts.find(nft => nft.id === id)
    },
    getNftsByCollection: (collectionId: CollectionId) => {
        return get().nfts.filter(nft => nft.categoryId === collectionId)
    },
    getNftsByArtist: (artistId: ArtistId) => {
        // Step 1: Get the backoffice user associated with this artist
        const backofficeUserStore = useBackofficeUserStore.getState();
        const backofficeUser = backofficeUserStore.getUserByArtistId(artistId);
        
        if (!backofficeUser) {
            console.log('No backoffice user found for artist ID:', artistId);
            return [];
        }
        
        // Step 2: Get all NFTs owned by this user
        const userNfts = get().nfts.filter(nft => nft.idUser === backofficeUser.id);
        
        return userNfts;
    },
    getIraNfts: () => {
        return get().nfts
    },
    getCommunautaryNfts: () => {
        return get().nfts.filter(nft => nft.status === ItemStatus.minted)
    }
})) 