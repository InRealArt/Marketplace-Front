import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { NftType } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Define cart item type
export interface CartItem {
  nft: NftType;
  purchaseType: 'physical' | 'nft' | 'nftPlusPhysical';
}

// Define cart store state and actions
interface CartState {
  items: CartItem[];
  isLoading: boolean;
  anonymousId: string | null; // For non-authenticated users
  
  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (nftId: number, purchaseType: string) => void;
  clearCart: () => void;
  setAnonymousId: (anonymousId: string) => void;
  setLoading: (isLoading: boolean) => void;
  getCartTotal: () => number;
  resetCart: () => void;
}

// Create store with persistence
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      anonymousId: null,

      // Add an item to the cart
      addItem: (item) => {
        const currentItems = get().items;
        
        // Check if item already exists in cart
        const existingItemIndex = currentItems.findIndex(
          cartItem => cartItem.nft.id === item.nft.id && cartItem.purchaseType === item.purchaseType
        );
        
        if (existingItemIndex >= 0) {
          // Item already exists, no need to add (NFTs are unique)
          return;
        }
        
        // Add new item
        set({ items: [...currentItems, item] });
      },
      
      // Remove an item from the cart
      removeItem: (nftId, purchaseType) => {
        const currentItems = get().items;
        const updatedItems = currentItems.filter(
          item => !(item.nft.id === nftId && item.purchaseType === purchaseType)
        );
        
        set({ items: updatedItems });
      },
      
      // Clear all items from the cart
      clearCart: () => {
        set({ items: [] });
      },
      
      // Set anonymous ID (for non-authenticated users)
      setAnonymousId: (anonymousId) => {
        set({ anonymousId });
      },
      
      // Set loading state
      setLoading: (isLoading) => {
        set({ isLoading });
      },
      
      // Reset the cart completely on logout
      resetCart: () => {        
        set({ 
          items: [],
          isLoading: false
        });
      },
      
      // Calculate cart total
      getCartTotal: () => {
        return get().items.reduce((total, item) => {
          let price = 0;
          
          // Get price based on purchase type
          switch (item.purchaseType) {
            case 'physical':
              price = item.nft.pricePhysicalBeforeTax || 0;
              break;
            case 'nft':
              price = item.nft.priceNftBeforeTax || 0;
              break;
            case 'nftPlusPhysical':
              price = item.nft.priceNftPlusPhysicalBeforeTax || 0;
              break;
          }
          
          return total + price;
        }, 0);
      },
    }),
    {
      name: 'ira-cart-storage', // Name for localStorage/sessionStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
); 