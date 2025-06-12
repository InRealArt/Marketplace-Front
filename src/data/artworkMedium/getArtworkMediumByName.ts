import "server-only";

import prisma from '@/lib/prisma'

export async function getArtworkMediumByName(name: string) {    
    const artworkMedium = await prisma.artworkMedium.findFirst({
        where: {
            name: name
        }
    })

    return artworkMedium
}