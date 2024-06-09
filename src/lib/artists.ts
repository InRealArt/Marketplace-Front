'use server'
import prisma from "./prisma"

async function fetchArtists() {
    const artists = await prisma.artist.findMany()
    return artists
}

async function fetchArtistById(artistId: number) {
    const artists = await prisma.artist.findUnique({
        where: {
            id: artistId
        }
    })
    return artists
}

export { fetchArtists, fetchArtistById }
