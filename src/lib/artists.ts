/**
 * @deprecated This file is kept for backward compatibility
 * 
 * For new code, use Server Functions from @/lib/server/artists
 * 
 * Next.js 15/16 best practice: Server Functions should be in /lib/server/
 * 
 * Migration guide:
 * - Old: import { fetchArtists } from '@/lib/artists'
 * - New: import { fetchArtists } from '@/lib/server/artists'
 */

// Re-export from the new location for backward compatibility
export {
    fetchArtists,
    fetchArtistById,
    fetchArtistBySlug,
    fetchLandingArtistsForArtistsPage
} from './server/artists'
