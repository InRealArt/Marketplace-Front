import "server-only";

import prisma from '@/lib/prisma'

export async function getAllArtworkMediums() {
    const artworkMediums = await prisma.artworkMedium.findMany({
        orderBy: {
            name: 'asc'
        }
    })

    return artworkMediums
}