'use client';

import { useState, useEffect, useRef } from 'react';
import { incrementViewCount } from '@/lib/artworks';

// Global set to track which item IDs have already been viewed in this session
// This persists across component mounts/unmounts
const viewedItems = new Set<number>();

/**
 * Custom hook to track and increment view counts for artworks
 * 
 * @param itemId The ID of the artwork item
 * @param initialRealViewCount Initial real view count
 * @param initialFakeViewCount Initial fake view count
 * @returns Object containing display view count and popularity status
 */
export function useViewCounter(
  itemId: number | undefined,
  initialRealViewCount: number = 0,
  initialFakeViewCount: number = 0
) {
  const [realViewCount, setRealViewCount] = useState<number>(initialRealViewCount);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Ref to store a unique identifier for this component instance
  const instanceId = useRef<string>(Math.random().toString(36).substring(2, 9));
  
  // Calculate the display view count (use the higher of real or fake)
  const displayViewCount = initialFakeViewCount > realViewCount 
    ? initialFakeViewCount 
    : realViewCount;

  // Determine if the artwork is popular
  const isPopular = displayViewCount > 100;

  // Track view count when component mounts
  useEffect(() => {
    // Guard clauses
    if (!itemId) {
      return;
    }
    
    // Check if this item has already been viewed in this session
    if (viewedItems.has(itemId)) {
      return;
    }
    
    // Immediately mark this item as viewed to prevent duplicates
    viewedItems.add(itemId);
    
    // Async function to increment view count
    const incrementView = async () => {
      setIsLoading(true);
      
      try {
        const result = await incrementViewCount(itemId);
        
        if (result.success && result.realViewCount !== undefined) {
          setRealViewCount(result.realViewCount);
        } else if (result.error) {
          setError(result.error);
          // Removes the item from viewed items if there was an error, allowing a retry
          viewedItems.delete(itemId);
        }
      } catch (error) {
        setError('Failed to update view count');
        // Removes the item from viewed items if there was an error, allowing a retry
        viewedItems.delete(itemId);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Run the view increment
    incrementView();
    
  }, [itemId]); // Only dependency is itemId

  return {
    displayViewCount,
    isPopular,
    isLoading,
    error
  };
} 