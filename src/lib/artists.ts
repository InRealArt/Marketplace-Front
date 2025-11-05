'use server'
import prisma from "./prisma"
import { ArtistWithRelations, ArtistData } from "@/types"
import { mapArtistFromPrisma } from "./utils/artistUtils"

async function fetchArtists() {
    const artists = await prisma.artist.findMany({
        include: {
            Country: true
        }
    })
    return artists.map(mapArtistFromPrisma)
}

async function fetchArtistById(artistId: number) {
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

async function fetchArtistBySlug(slug: string) {
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

export { fetchArtists, fetchArtistById, fetchArtistBySlug }
