import { useEffect, useState } from 'react';
import { useCartStore, CartItem } from '@/store/cartStore';
import { ItemPhysicalType, PriceOption, PurchaseType } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { useSession } from "@/lib/auth-client";
import { getUserCart, getAnonymousCart, upsertUserCart, upsertAnonymousCart, deleteUserCart, deleteAnonymousCart } from '@/lib/cart';
import { VAT_RATE } from '@/lib/constants';

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
    const firstTimeOrUserJustDeconnect = !anonymousId && !userId;
    const userJustConnect = anonymousId && userId;

    if (firstTimeOrUserJustDeconnect) {
      const newAnonymousId = uuidv4();
      setAnonymousId(newAnonymousId);
      setInitialized(true);
    }
    
    if (userJustConnect) {
      // We'll handle the anonymous cart cleanup in loadCartFromServer
      // Just set initialized to true to trigger the loadCartFromServer effect
      setInitialized(true);
    }
  }, [anonymousId, userId, setAnonymousId]);

  useEffect(() => {
    if (initialized) {
      // Pass true as isLoginEvent if user just connected (has both anonymousId and userId)
      const isLoginEvent = !!(anonymousId && userId);
      loadCartFromServer(isLoginEvent);
    }
  }, [initialized, anonymousId, userId]);


  // Load cart data from server
  const loadCartFromServer = async (isLoginEvent = false) => {
    try {
      setLoading(true);
      
      // Save current local cart items for potential merging
      const localItems = [...items];
      
      // Clear local cart state to prepare for new data
      clearCartStore();
      
      // Handle user cart (logged in user)
      if (userId) {
        // Delete anonymous cart if user just logged in
        if (isLoginEvent && anonymousId) {
          await deleteAnonymousCartAfterLogin(anonymousId);
          // Clear the anonymousId from store after successful login
          setAnonymousId(null);
        }
        
        await handleUserCart(userId, localItems, isLoginEvent);
      } 
      // Handle anonymous cart
      else if (anonymousId) {
        await handleAnonymousCart(anonymousId);
      }

      setLoading(false);
      setInitialized(false);
    } catch (error) {
      console.error('Failed to load cart data:', error);
      setLoading(false);
    }
  };

  // Helper function to handle user cart logic
  const handleUserCart = async (userId: string, localItems: CartItem[], isLoginEvent: boolean) => {
    // Get user cart from server
    const cart = await getUserCart(userId);
    const serverItems = cart?.items as CartItem[] || [];
    
    // For login/signup events, merge local and server carts
    if (isLoginEvent) {
      await mergeAndSaveCart(userId, serverItems, localItems);
    } 
    // For normal sync, just load server items
    else {
      loadItemsToLocalCart(serverItems);
    }
  };

  // Helper function to handle anonymous cart logic
  const handleAnonymousCart = async (anonymousId: string) => {
    const cart = await getAnonymousCart(anonymousId);
    const serverItems = cart?.items as CartItem[] || [];
    
    // Load server items to local cart
    loadItemsToLocalCart(serverItems);
  };

  // Helper function to merge and save carts
  const mergeAndSaveCart = async (userId: string, serverItems: CartItem[], localItems: CartItem[]) => {
    // Create a merged items array starting with server items
    const mergedItems: CartItem[] = [...serverItems];
    
    // Add local items that don't exist on server
    for (const localItem of localItems) {
      const existsOnServer = serverItems.some(
        serverItem => 
          serverItem.nft.id === localItem.nft.id && 
          serverItem.purchaseType === localItem.purchaseType
      );
      
      if (!existsOnServer) {
        mergedItems.push(localItem);
      }
    }
    
    // Load merged items to local cart
    loadItemsToLocalCart(mergedItems);
    
    // Save merged cart to server if there are items to save
    if (mergedItems.length > 0) {
      const totalPrice = calculateTotalWithTax(mergedItems);
      await upsertUserCart(userId, mergedItems, totalPrice);
    }
  };

  // Helper function to load items to local cart
  const loadItemsToLocalCart = (items: CartItem[]) => {
    items.forEach(item => addItem(item));
  };

  /**
   * Calcule le prix total du panier avec TVA
   */
  const calculateTotalWithTax = (items: CartItem[]) => {
    const subtotal = items.reduce((total, item) => {
      let price = 0;

      // Get price based on purchase type
      switch (item.purchaseType) {
        case PriceOption.PHYSICAL:
          price = item.nft.price || 0;
          break;
        case PriceOption.NFT:
          price = item.nft.price || 0;
          break;
        case PriceOption.NFT_PLUS_PHYSICAL:
          price = item.nft.price || 0;
          break;
      }

      return total + price;
    }, 0);

    // Calcul du prix avec TVA (arrondi à 2 décimales)
    return Math.round(subtotal * (1 + VAT_RATE) * 100) / 100;
  };

  /**
   * Synchronize cart with server
   */
  const synchronizeCart = async () => {
    try {
      setLoading(true);

      // Get the latest items from the store
      const currentItems = [...items];

      // Calculer le prix total avec TVA
      const totalPrice = calculateTotalWithTax(currentItems);

      if (userId) {
        // Update user cart using direct Prisma call with current items
        console.log('Syncing user cart to DB:', currentItems.length, 'items, total:', totalPrice);
        await upsertUserCart(userId, currentItems, totalPrice);
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
  const addToCart = async (nft: ItemPhysicalType, purchaseType: PurchaseType) => {
    // First check if this item already exists in the cart
    const existingItem = items.find(
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

    // Add to local state first
    addItem(cartItem);

    try {
      setLoading(true);

      // Ensure we use the updated items array that includes the new item
      const updatedItems = [...items, cartItem];

      // Calcul du prix total avec TVA
      const totalPrice = calculateTotalWithTax(updatedItems);

      // Save to database
      if (userId) {
        console.log('Adding to user cart and syncing:', updatedItems.length, 'items, total:', totalPrice);
        await upsertUserCart(userId, updatedItems, totalPrice);
      } else if (anonymousId) {
        console.log('Adding to anonymous cart and syncing:', updatedItems.length, 'items');
        await upsertAnonymousCart(anonymousId, updatedItems);
      }

      setLoading(false);
      return { success: true };
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      setLoading(false);
      return { success: false, error: 'Failed to add item to cart' };
    }
  };

  /**
   * Remove item from cart
   */
  const removeFromCart = async (nftId: number, purchaseType: PurchaseType) => {
    // Check if cart has only one item before removal
    const isLastItem = items.length === 1;
    const isTargetItemInCart = items.some(
      item => item.nft.id === nftId && item.purchaseType === purchaseType
    );
    const willBeEmptyAfterRemoval = isLastItem && isTargetItemInCart;

    // First get the item name before removing it
    const itemToRemove = items.find(
      item => item.nft.id === nftId && item.purchaseType === purchaseType
    );
    const itemName = itemToRemove?.nft.Item.name || 'Item';

    // Remove item from local state
    removeItem(nftId, purchaseType);

    try {
      setLoading(true);

      // If this was the last item, delete the entire cart record
      if (willBeEmptyAfterRemoval) {
        console.log('Removing last item, deleting cart record');

        if (userId) {
          await deleteUserCart(userId);
        } else if (anonymousId) {
          await deleteAnonymousCart(anonymousId);
        }
      } else {
        // Otherwise, update the cart with the remaining items
        const updatedItems = items.filter(
          item => !(item.nft.id === nftId && item.purchaseType === purchaseType)
        );

        // Calcul du prix total avec TVA
        const totalPrice = calculateTotalWithTax(updatedItems);

        if (userId) {
          await upsertUserCart(userId, updatedItems, totalPrice);
        } else if (anonymousId) {
          await upsertAnonymousCart(anonymousId, updatedItems);
        }
      }

      setLoading(false);
      return { success: true, message: `${itemName} supprimé du panier`, itemName };
    } catch (error) {
      console.error('Échec de la mise à jour du panier après suppression:', error);
      setLoading(false);
      return { success: false, error: 'Impossible de supprimer l\'article du panier' };
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

    try {
      setLoading(true);

      // Delete the entire cart record instead of updating with empty items
      if (userId) {
        console.log('Clearing cart by deleting record');
        await deleteUserCart(userId);
      } else if (anonymousId) {
        console.log('Clearing anonymous cart by deleting record');
        await deleteAnonymousCart(anonymousId);
      }

      setLoading(false);
      return { success: true, message: 'Panier vidé avec succès' };
    } catch (error) {
      console.error('Échec de la suppression du panier:', error);
      setLoading(false);
      return { success: false, error: 'Impossible de vider le panier' };
    }
  };

  /**
   * Get cart total with VAT
   */
  const getCartTotalWithVAT = () => {
    const subtotal = getCartTotal();
    return Math.round(subtotal * (1 + VAT_RATE) * 100) / 100;
  };

  // Helper function to delete anonymous cart after login
  const deleteAnonymousCartAfterLogin = async (anonymousId: string) => {
    try {
      console.log('Deleting anonymous cart after login:', anonymousId);
      await deleteAnonymousCart(anonymousId);
    } catch (error) {
      console.error('Failed to delete anonymous cart after login:', error);
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
    getCartTotalWithVAT,
    synchronizeCart,
    loadCartFromServer,
  };
} 