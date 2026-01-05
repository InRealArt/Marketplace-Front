'use server'
import prisma from "../prisma"
import { ArtistWithRelations } from "@/types"
import { mapArtistFromPrisma, mapLandingArtistToArtistWithRelations } from "../utils/artistUtils"

/**
 * Server Functions for fetching artist data
 * 
 * These functions are called from Server Components only (Next.js 15/16 best practice)
 * They should NOT be called from Client Components
 * 
 * Location: /lib/server/ - Recommended structure for Server Functions (data fetching)
 */

/**
 * Fetch all artists from the database
 * @returns Array of all artists with their country information
 */
export async function fetchArtists(): Promise<ArtistWithRelations[]> {
    const artists = await prisma.artist.findMany({
        include: {
            Country: true
        }
    })
    return artists.map(mapArtistFromPrisma)
}

/**
 * Fetch a single artist by ID
 * @param artistId - The ID of the artist to fetch
 * @returns The artist with country information, or null if not found
 */
export async function fetchArtistById(artistId: number): Promise<ArtistWithRelations | null> {
    const artist = await prisma.artist.findUnique({
        where: {
            id: artistId
        },
        include: {
            Country: true,
        }
    })
    if (!artist) return null
    return mapArtistFromPrisma(artist)
}

/**
 * Fetch a single artist by slug
 * @param slug - The slug of the artist to fetch
 * @returns The artist with country information, or null if not found
 */
export async function fetchArtistBySlug(slug: string): Promise<ArtistWithRelations | null> {
    const artist = await prisma.artist.findUnique({
        where: {
            slug: slug
        },
        include: {
            Country: true
        }
    })
    if (!artist) return null
    return mapArtistFromPrisma(artist)
}

/**
 * Fetch LandingArtist records where artistsPage is false
 * 
 * This function is specifically used for the /artists page
 * It fetches LandingArtist data with their related Artist and Country information
 * 
 * Next.js 15/16 best practice: Server-side data fetching in Server Components
 * 
 * @returns Array of LandingArtist records mapped to ArtistWithRelations format
 */
export async function fetchLandingArtistsForArtistsPage(): Promise<ArtistWithRelations[]> {
    const landingArtists = await prisma.landingArtist.findMany({
        where: {
            artistsPage: false
        },
        include: {
            artist: {
                include: {
                    Country: true
                }
            }
        },
        orderBy: {
            slug: 'asc'
        }
    })

    return landingArtists.map(mapLandingArtistToArtistWithRelations)
}

