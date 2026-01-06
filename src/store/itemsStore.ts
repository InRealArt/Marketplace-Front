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

            // Mapper les données pour correspondre au type ItemWithRelations
            const mappedData = data.map(item => ({
                ...item,
                medium: item.physicalItem?.medium || null,
                style: null, // style n'est pas inclus dans getAvailableItems
                technique: null, // technique n'est pas inclus dans getAvailableItems
                user: item.user ? {
                    id: Number(item.user.id),
                    firstName: item.user.name?.split(' ')[0] || null,
                    lastName: item.user.name?.split(' ').slice(1).join(' ') || null,
                    Artist: item.user.artist ? {
                        id: item.user.artist.id,
                        name: item.user.artist.name,
                        surname: item.user.artist.surname,
                        pseudo: item.user.artist.pseudo,
                        slug: item.user.artist.slug
                    } : null
                } : {
                    id: 0,
                    firstName: null,
                    lastName: null,
                    Artist: null
                }
            })) as unknown as ItemWithRelations[]

            set({
                availableItems: mappedData,
                filteredItems: mappedData,
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
            const price = item.physicalItem?.price || 0
            if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
                return false
            }

            // Filtre par medium
            if (filters.selectedMediums.length > 0 && item.medium?.id) {
                if (!filters.selectedMediums.includes(item.medium.id)) {
                    return false
                }
            }

            // Filtre par style
            if (filters.selectedStyles.length > 0 && item.style?.id) {
                if (!filters.selectedStyles.includes(item.style.id)) {
                    return false
                }
            }

            // Filtre par technique
            if (filters.selectedTechniques.length > 0 && item.technique?.id) {
                if (!filters.selectedTechniques.includes(item.technique.id)) {
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
        return get().nfts.find(nft => Number(nft.id) === id)
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
        const userNfts = get().nfts.filter(nft => nft.item.idUser === String(backofficeUser.id));

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