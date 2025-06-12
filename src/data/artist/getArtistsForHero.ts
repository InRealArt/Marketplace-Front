import "server-only"

import prisma from '@/lib/prisma'

export async function getArtistsForHero(count: number) {
    const artists = await prisma.artist.findMany({
        where: {
            featuredArtwork: {
                not: null
            }
        },
        select: {
            imageUrl: true,
            featuredArtwork: true
        },
        orderBy: {
            id: 'asc'
        }
    })

    // Mélanger aléatoirement les artistes et retourner les N premiers
    const shuffledArtists = artists.sort(() => Math.random() - 0.5)
    return shuffledArtists.slice(0, count)
}
