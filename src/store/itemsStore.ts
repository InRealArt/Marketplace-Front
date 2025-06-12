import { create } from 'zustand'
import { getItemsByStatus, getItemsByStatusAndStock, getAvailableItems } from '@/lib/nfts'
import { ArtistId, CollectionId, NftId, NftSlug, ItemPhysicalType, ItemWithRelations } from '@/types'
import { PhysicalItemStatus } from '@prisma/client'
import { useBackofficeUserStore } from './backofficeUserStore'
import { useArtistsStore } from './artistsStore'

interface FilterState {
    priceRange: [number, number]
    selectedMediums: number[]
    selectedStyles: number[]
    selectedTechniques: number[]
}

interface NftsState {
    nfts: ItemPhysicalType[]
    availableItems: ItemWithRelations[]
    filteredItems: ItemWithRelations[]
    isLoading: boolean
    error: Error | null
    filters: FilterState
    filtersOpen: boolean

    // Actions existantes
    fetchItems: () => Promise<void>
    getItemBySlug: (slug: NftSlug) => ItemPhysicalType | undefined
    getNftById: (id: NftId) => ItemPhysicalType | undefined
    getNftsByCollection: (collectionId: CollectionId) => ItemPhysicalType[]
    getItemsByArtist: (artistId: ArtistId) => ItemPhysicalType[]
    getItemsByArtistSlug: (artistSlug: string) => ItemPhysicalType[]
    getIraNfts: () => ItemPhysicalType[]
    getCommunautaryNfts: () => ItemPhysicalType[]
    getFeaturedItems: () => ItemPhysicalType[]

    // Nouvelles actions pour les items disponibles
    fetchAvailableItems: () => Promise<void>
    setFilters: (filters: Partial<FilterState>) => void
    clearFilters: () => void
    setFiltersOpen: (open: boolean) => void
    applyFilters: () => void
}

const initialFilters: FilterState = {
    priceRange: [0, 20000],
    selectedMediums: [],
    selectedStyles: [],
    selectedTechniques: []
}

export const useItemsStore = create<NftsState>((set, get) => ({
    nfts: [],
    availableItems: [],
    filteredItems: [],
    isLoading: false,
    error: null,
    filters: initialFilters,
    filtersOpen: false,

    fetchItems: async () => {
        // Ne fetch pas si on a déjà des NFTs
        if (get().nfts.length > 0) return

        try {
            set({ isLoading: true, error: null })
            const data = await getAvailableItems()
            // Transformer les ItemWithRelations en ItemPhysicalType pour maintenir la compatibilité
            const transformedData = data.map(item => {
                if (item.physicalItem) {
                    return {
                        ...item.physicalItem,
                        item: item
                    }
                } else if (item.nftItem) {
                    // Créer un objet compatible avec ItemPhysicalType pour les NFT
                    return {
                        id: item.nftItem.id,
                        price: item.nftItem.price,
                        stockQty: 1, // Les NFT ont toujours une quantité de 1
                        status: 'listed' as any, // Convertir le statut NFT vers le format attendu
                        item: item
                    }
                }
                return null
            }).filter(Boolean) as ItemPhysicalType[]

            set({ nfts: transformedData, isLoading: false })
        } catch (error) {
            set({ isLoading: false, error: error as Error })
        }
    },

    fetchAvailableItems: async () => {
        try {
            set({ isLoading: true, error: null })
            const data = await getAvailableItems()

            set({
                availableItems: data as ItemWithRelations[],
                filteredItems: data as ItemWithRelations[],
                isLoading: false
            })
            get().applyFilters()
        } catch (error) {
            set({ isLoading: false, error: error as Error })
        }
    },

    setFilters: (newFilters: Partial<FilterState>) => {
        set({
            filters: { ...get().filters, ...newFilters }
        })
        get().applyFilters()
    },

    clearFilters: () => {
        set({ filters: initialFilters })
        get().applyFilters()
    },

    setFiltersOpen: (open: boolean) => {
        set({ filtersOpen: open })
    },

    applyFilters: () => {
        const { availableItems, filters } = get()

        let filtered = availableItems.filter(item => {
            // Filtre par prix (utilise le prix du physicalItem ou du nftItem)
            const price = item.physicalItem?.price || item.nftItem?.price || 0
            if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
                return false
            }

            // Filtre par medium
            if (filters.selectedMediums.length > 0 && item.mediumId) {
                if (!filters.selectedMediums.includes(item.mediumId)) {
                    return false
                }
            }

            // Filtre par style
            if (filters.selectedStyles.length > 0 && item.styleId) {
                if (!filters.selectedStyles.includes(item.styleId)) {
                    return false
                }
            }

            // Filtre par technique
            if (filters.selectedTechniques.length > 0 && item.techniqueId) {
                if (!filters.selectedTechniques.includes(item.techniqueId)) {
                    return false
                }
            }

            return true
        })

        set({ filteredItems: filtered })
    },

    getItemBySlug: (slug: NftSlug) => {
        return get().nfts.find(nft => nft.item.slug === slug)
    },
    getNftById: (id: NftId) => {
        return get().nfts.find(nft => nft.id === id)
    },
    getNftsByCollection: (collectionId: CollectionId) => {
        // Note: Les items physiques ne sont pas directement liés aux collections
        // Cette fonction pourrait nécessiter une refactorisation selon le modèle de données
        return []
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
        const userNfts = get().nfts.filter(nft => nft.item.idUser === backofficeUser.id);

        return userNfts;
    },
    getItemsByArtistSlug: (artistSlug: string) => {
        // Step 1: Get the artist by slug
        const artistsStore = useArtistsStore.getState();
        const artist = artistsStore.getArtistBySlug(artistSlug);

        if (!artist) {
            return [];
        }

        // Step 2: Get items by artist ID
        return get().getItemsByArtist(artist.id);
    },
    getIraNfts: () => {
        return get().nfts
    },
    getCommunautaryNfts: () => {
        return get().nfts.filter(nft => nft.status === PhysicalItemStatus.created)
    },
    getFeaturedItems: () => {
        return get().nfts.filter(nft => nft.item.featured === true)
    }
})) 