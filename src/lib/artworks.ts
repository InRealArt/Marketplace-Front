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

    // Find the item with its physicalItem
    const item = await prisma.item.findUnique({
      where: { id: itemId },
      include: {
        physicalItem: true
      }
    });

    if (!item) {
      return { success: false, error: 'Item not found' };
    }

    if (!item.physicalItem) {
      return { success: false, error: 'Physical item not found for this item' };
    }

    // Increment the real view count on PhysicalItem
    const updatedPhysicalItem = await prisma.physicalItem.update({
      where: { id: item.physicalItem.id },
      data: {
        realViewCount: {
          increment: 1
        }
      }
    });

    // Revalidate the path to reflect the updated view count
    revalidatePath(`/artworks/${item.slug}`);

    return { success: true, realViewCount: updatedPhysicalItem.realViewCount };
  } catch (error) {
    console.error('Failed to update view count:', error);
    return { success: false, error: 'Failed to update view count' };
  }
} 