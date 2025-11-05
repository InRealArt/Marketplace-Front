import "server-only";

import prisma from '@/lib/prisma'
import { mapArtistFromPrisma } from '@/lib/utils/artistUtils'

export async function getAllArtists() {
    const artists = await prisma.artist.findMany({
        include: {
            Country: true
        },
        orderBy: {
            name: 'asc'
        }
    })
    console.log('hey', artists[0]);
    
    return artists.map(mapArtistFromPrisma)
}