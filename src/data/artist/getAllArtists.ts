import "server-only";

import prisma from '@/lib/prisma'

export async function getAllArtists() {
    const artists = await prisma.artist.findMany({
        include: {
            Country: true
        },
        orderBy: {
            name: 'asc'
        }
    })

    return artists
}