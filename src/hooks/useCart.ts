import { useEffect, useState } from 'react';
import { useCartStore, CartItem } from '@/store/cartStore';
import { NftType } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { useSession } from "@/lib/auth-client";
import { getUserCart, getAnonymousCart, upsertUserCart, upsertAnonymousCart } from '@/lib/cart';

/**
 * Hook to handle cart functionality
 */
export function useCart() {
  const {
    items,
    isLoading,
    anonymousId,
    addItem,
    removeItem,
    clearCart: clearCartStore,
    setAnonymousId,
    setLoading,
    getCartTotal,
  } = useCartStore();

  const { data } = useSession();
  const userId = data?.user?.id;
  const [initialized, setInitialized] = useState(false);
  // Initialize anonymous cart ID if not exists
  useEffect(() => {
    const firstTimeOrUserJustDeconnect = !anonymousId && !userId
    const userJustConnect = anonymousId && userId

    if (firstTimeOrUserJustDeconnect) {
      const newAnonymousId = uuidv4();
      setAnonymousId(newAnonymousId);
      setInitialized(true);
    }
    if (userJustConnect) {
      console.log("user just connect");
      setAnonymousId(null)
      setInitialized(true);
    }
  }, [anonymousId, userId, setAnonymousId]);

  useEffect(() => {
    if (initialized) {
      loadCartFromServer();
    }
  }, [initialized]);


  // Load cart data from server
  const loadCartFromServer = async (isLoginEvent = false) => {
    try {
      setLoading(true);
      let serverItems: CartItem[] = [];
      if (userId) {

        // Get user cart from server using direct Prisma call
        const cart = await getUserCart(userId);

        if (cart?.items) {
          serverItems = cart.items as CartItem[];
          clearCartStore();

          // On login, replace the local cart with the server cart
          if (isLoginEvent && serverItems.length > 0) {
            // Clear local cart first

            // Then add all server items
            serverItems.forEach(item => addItem(item));
          } else {
            // Normal sync: Add server items that don't exist locally
            serverItems.forEach(serverItem => {
              const exists = items.some(
                localItem =>
                  localItem.nft.id === serverItem.nft.id &&
                  localItem.purchaseType === serverItem.purchaseType
              );

              if (!exists) {
                addItem(serverItem);
              }
            });
          }
        }
      } else if (anonymousId) {

        // Clear local cart first
        clearCartStore();

        // Get anonymous cart from server using direct Prisma call
        const cart = await getAnonymousCart(anonymousId);
        if (cart?.items) {
          serverItems = cart.items as CartItem[];

          // Merge server items with local items
          serverItems.forEach(serverItem => {
            const exists = items.some(
              localItem =>
                localItem.nft.id === serverItem.nft.id &&
                localItem.purchaseType === serverItem.purchaseType
            );

            if (!exists) {
              addItem(serverItem);
            }
          });
        }
      }

      setLoading(false);
      setInitialized(false);
    } catch (error) {
      console.error('Failed to load cart data:', error);
      setLoading(false);
    }
  };

  /**
   * Synchronize cart with server
   */
  const synchronizeCart = async () => {
    try {
      setLoading(true);

      // Get the latest items from the store
      const currentItems = [...items];

      if (userId) {
        // Update user cart using direct Prisma call with current items
        console.log('Syncing user cart to DB:', currentItems.length, 'items');
        await upsertUserCart(userId, currentItems);
      } else if (anonymousId) {
        // Update anonymous cart using direct Prisma call with current items
        console.log('Syncing anonymous cart to DB:', currentItems.length, 'items');
        await upsertAnonymousCart(anonymousId, currentItems);
      }

      setLoading(false);
    } catch (error) {
      console.error('Failed to synchronize cart with server:', error);
      setLoading(false);
    }
  };

  /**
   * Add NFT to cart
   */
  const addToCart = async (nft: NftType, purchaseType: 'physical' | 'nft' | 'nftPlusPhysical') => {
    // First check if this item already exists in the cart
    const currentItems = items;
    const existingItem = currentItems.find(
      item => item.nft.id === nft.id && item.purchaseType === purchaseType
    );

    if (existingItem) {
      // Item already exists in cart, return error
      return { success: false, error: 'This artwork is already in your cart' };
    }

    const cartItem: CartItem = {
      nft,
      purchaseType
    };

    // Add to local state
    addItem(cartItem);

    // Then ensure database is updated with the new state
    try {
      setLoading(true);

      // Wait for the state update to complete
      await new Promise(resolve => setTimeout(resolve, 0));

      // Use the updated items from the store after addition
      const currentItems = [...items];

      console.log('Adding to cart and syncing with DB:', currentItems.length, 'items');
      if (userId) {
        await upsertUserCart(userId, currentItems);
      } else if (anonymousId) {
        await upsertAnonymousCart(anonymousId, currentItems);
      }

      setLoading(false);
      return { success: true };
    } catch (error) {
      console.error('Failed to update cart after addition:', error);
      setLoading(false);
      return { success: false, error: 'Failed to add item to cart' };
    }
  };

  /**
   * Remove item from cart
   */
  const removeFromCart = async (nftId: number, purchaseType: string) => {
    // First get the item name before removing it
    const currentItems = items;
    const itemToRemove = currentItems.find(
      item => item.nft.id === nftId && item.purchaseType === purchaseType
    );

    const itemName = itemToRemove?.nft.name || 'Item';

    // Then remove from local state
    removeItem(nftId, purchaseType);

    // Then ensure database is updated with the new state
    try {
      setLoading(true);

      // Wait for the state update to complete
      await new Promise(resolve => setTimeout(resolve, 0));

      // Use the updated items from the store after removal
      const currentItems = [...items];

      if (userId) {
        // Update user cart with the current items (after removal)
        await upsertUserCart(userId, currentItems);
      } else if (anonymousId) {
        // Update anonymous cart with the current items (after removal)
        await upsertAnonymousCart(anonymousId, currentItems);
      }

      setLoading(false);
      return { success: true, message: `${itemName} removed from cart`, itemName };
    } catch (error) {
      console.error('Failed to update cart after removal:', error);
      setLoading(false);
      return { success: false, error: 'Failed to remove item from cart' };
    }
  };

  /**
   * Get the total number of items in the cart
   */
  const getItemCount = () => {
    return items.length;
  };

  /**
   * Clear the cart
   */
  const clearCart = async () => {
    // Clear local state
    clearCartStore();

    // Then ensure database is updated with the new state
    try {
      setLoading(true);

      // Wait for the state update to complete
      await new Promise(resolve => setTimeout(resolve, 0));

      // Empty array for cleared cart
      const emptyItems: CartItem[] = [];

      console.log('Clearing cart and syncing with DB');
      if (userId) {
        await upsertUserCart(userId, emptyItems);
      } else if (anonymousId) {
        await upsertAnonymousCart(anonymousId, emptyItems);
      }

      setLoading(false);
      return { success: true, message: 'Cart cleared successfully' };
    } catch (error) {
      console.error('Failed to update cart after clearing:', error);
      setLoading(false);
      return { success: false, error: 'Failed to clear cart' };
    }
  };

  return {
    items,
    isLoading,
    userId,
    anonymousId,
    addToCart,
    removeFromCart,
    clearCart,
    getItemCount,
    getCartTotal,
    synchronizeCart,
  };
} 