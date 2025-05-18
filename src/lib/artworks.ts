'use server';

import prisma from './prisma';
import { revalidatePath } from 'next/cache';

// Existing functions if any...

/**
 * Increment the real view count for an artwork
 * @param itemId The ID of the item to update
 */
export async function incrementViewCount(itemId: number) {
  try {
    if (!itemId) return { success: false, error: 'No item ID provided' };

    // Find the item
    const item = await prisma.item.findUnique({
      where: { id: itemId }
    });

    if (!item) {
      return { success: false, error: 'Item not found' };
    }

    // Increment the real view count
    const updatedItem = await prisma.item.update({
      where: { id: itemId },
      data: {
        realViewCount: {
          increment: 1
        }
      }
    });

    // Revalidate the path to reflect the updated view count
    revalidatePath(`/artworks/${item.slug}`);

    return { success: true, realViewCount: updatedItem.realViewCount };
  } catch (error) {
    console.error('Failed to update view count:', error);
    return { success: false, error: 'Failed to update view count' };
  }
} 