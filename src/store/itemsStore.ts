import { create } from 'zustand'
import { getItemsByStatus, getItemsByStatusAndStock } from '@/lib/nfts'
import { ArtistId, CollectionId, NftId, NftSlug, ItemPhysicalType } from '@/types'
import { PhysicalItemStatus } from '@prisma/client'
import { useBackofficeUserStore } from './backofficeUserStore'

interface NftsState {
    nfts: ItemPhysicalType[]
    isLoading: boolean
    error: Error | null
    fetchItems: () => Promise<void>
    getItemBySlug: (slug: NftSlug) => ItemPhysicalType | undefined
    getNftById: (id: NftId) => ItemPhysicalType | undefined
    getNftsByCollection: (collectionId: CollectionId) => ItemPhysicalType[]
    getItemsByArtist: (artistId: ArtistId) => ItemPhysicalType[]
    getIraNfts: () => ItemPhysicalType[]
    getCommunautaryNfts: () => ItemPhysicalType[]
}

export const useItemsStore = create<NftsState>((set, get) => ({
    nfts: [],
    isLoading: false,
    error: null,
    fetchItems: async () => {        
        // Ne fetch pas si on a déjà des NFTs
        if (get().nfts.length > 0) return

        try {
            set({ isLoading: true, error: null })
            const data =  await await getItemsByStatusAndStock([PhysicalItemStatus.listed], 1)
            set({ nfts: data, isLoading: false })
        } catch (error) {
            set({ isLoading: false, error: error as Error })
        }
    },
    getItemBySlug: (slug: NftSlug) => {
        return get().nfts.find(nft => nft.Item.slug === slug)
    },
    getNftById: (id: NftId) => {
        return get().nfts.find(nft => nft.id === id)
    },
    getNftsByCollection: (collectionId: CollectionId) => {
        return get().nfts.filter(nft => nft.categoryId === collectionId)
    },
    getItemsByArtist: (artistId: ArtistId) => {
        // Step 1: Get the backoffice user associated with this artist
        const backofficeUserStore = useBackofficeUserStore.getState();
        const backofficeUser = backofficeUserStore.getUserByArtistId(artistId);

        if (!backofficeUser) {
            // console.log('No backoffice user found for artist ID:', artistId);
            return [];
        }
        console.log('backofficeUser *******', backofficeUser);
        console.log('nfts *******', get().nfts);
        // Step 2: Get all NFTs owned by this user
        const userNfts = get().nfts.filter(nft => nft.Item.idUser === backofficeUser.id);

        return userNfts;
    },
    getIraNfts: () => {
        return get().nfts
    },
    getCommunautaryNfts: () => {
        return get().nfts.filter(nft => nft.status === PhysicalItemStatus.created)
    }
})) 