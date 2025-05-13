'use server'
import prisma from "./prisma"
import { CartItem } from "@/store/cartStore"

/**
 * Get a user's cart by userId
 */
export async function getUserCart(userId: string) {
  try {
    const cart = await prisma.$queryRaw`
      SELECT * FROM "marketplace"."Cart" WHERE "userId" = ${userId}
    `;

    // If we get results as an array with at least one item
    if (Array.isArray(cart) && cart.length > 0) {
      return cart[0];
    }

    return null;
  } catch (error) {
    console.error("Error fetching user cart:", error);
    return null;
  }
}

/**
 * Get an anonymous cart by cartId
 */
export async function getAnonymousCart(cartId: string) {
  try {
    const cart = await prisma.$queryRaw`
      SELECT * FROM "marketplace"."AnonymousCart" WHERE "cartId" = ${cartId}
    `;

    // If we get results as an array with at least one item
    if (Array.isArray(cart) && cart.length > 0) {
      const anonymousCart = cart[0];

      // Check if cart has expired
      if (anonymousCart && new Date(anonymousCart.expiresAt) < new Date()) {
        await prisma.$executeRaw`
          DELETE FROM "marketplace"."AnonymousCart" WHERE "cartId" = ${cartId}
        `;
        return null;
      }

      return anonymousCart;
    }

    return null;
  } catch (error) {
    console.error("Error fetching anonymous cart:", error);
    return null;
  }
}

/**
 * Create or update a user's cart
 */
export async function upsertUserCart(userId: string, items: CartItem[], totalPrice: number) {
  try {
    console.log(`Updating user cart (userId: ${userId}) with ${items.length} items, totalPrice: ${totalPrice}`);

    // Check if cart exists
    const existingCart = await getUserCart(userId);

    if (existingCart) {
      console.log(`Updating existing cart for user ${userId}`);
      // Update existing cart with items and totalPrice
      await prisma.$executeRaw`
        UPDATE "marketplace"."Cart"
        SET "items" = ${JSON.stringify(items)}::jsonb, 
            "totalPrice" = ${totalPrice}, 
            "updatedAt" = NOW() 
        WHERE "userId" = ${userId}
      `;
    } else {
      console.log(`Creating new cart for user ${userId}`);
      // Create new cart with items and totalPrice
      await prisma.$executeRaw`
        INSERT INTO "marketplace"."Cart" ("userId", "items", "totalPrice", "createdAt", "updatedAt")
        VALUES (${userId}, ${JSON.stringify(items)}::jsonb, ${totalPrice}, NOW(), NOW())
      `;
    }

    console.log(`Cart operation completed for user ${userId}`);
    return { userId, items, totalPrice };
  } catch (error) {
    console.error("Error upserting user cart:", error);
    return null;
  }
}

/**
 * Create or update an anonymous cart
 */
export async function upsertAnonymousCart(cartId: string, items: CartItem[]) {
  try {
    console.log(`Updating anonymous cart (cartId: ${cartId}) with ${items.length} items`);

    // Calculate expiration date (30 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    // Check if cart exists
    const existingCart = await getAnonymousCart(cartId);

    if (existingCart) {
      console.log(`Updating existing anonymous cart ${cartId}`);
      // Update existing cart
      await prisma.$executeRaw`
        UPDATE "marketplace"."AnonymousCart"
        SET "items" = ${JSON.stringify(items)}::jsonb, "updatedAt" = NOW(), "expiresAt" = ${expiresAt}
        WHERE "cartId" = ${cartId}
      `;
    } else {
      console.log(`Creating new anonymous cart ${cartId}`);
      // Create new cart
      await prisma.$executeRaw`
        INSERT INTO "marketplace"."AnonymousCart" ("cartId", "items", "createdAt", "updatedAt", "expiresAt")
        VALUES (${cartId}, ${JSON.stringify(items)}::jsonb, NOW(), NOW(), ${expiresAt})
      `;
    }

    console.log(`Anonymous cart operation completed for ${cartId}`);
    return { cartId, items };
  } catch (error) {
    console.error("Error upserting anonymous cart:", error);
    return null;
  }
}

/**
 * Delete a user's cart completely
 */
export async function deleteUserCart(userId: string) {
  try {
    console.log(`Deleting cart for user ${userId}`);
    await prisma.$executeRaw`
      DELETE FROM "marketplace"."Cart" WHERE "userId" = ${userId}
    `;
    return true;
  } catch (error) {
    console.error("Error deleting user cart:", error);
    return false;
  }
}

/**
 * Delete an anonymous cart
 */
export async function deleteAnonymousCart(cartId: string) {
  try {
    await prisma.$executeRaw`
      DELETE FROM "marketplace"."AnonymousCart" WHERE "cartId" = ${cartId}
    `;
    return true;
  } catch (error) {
    console.error("Error deleting anonymous cart:", error);
    return false;
  }
} 