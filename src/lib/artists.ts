'use server'
import prisma from "./prisma"

async function fetchArtists() {
    const artists = await prisma.artist.findMany()
    return artists
}

async function fetchArtistById(artistId: number) {
    const artist = await prisma.artist.findUnique({
        where: {
            id: artistId
        }
    })
    return artist
}

async function fetchArtistBySlug(slug: string) {
    const artist = await prisma.artist.findUnique({
        where: {
            slug: slug
        }
    })
    return artist
}

export { fetchArtists, fetchArtistById, fetchArtistBySlug }
