'use server'
import prisma from "./prisma"

/**
 * Fetches all backoffice users
 */
async function fetchBackofficeUsers() {
    const users = await prisma.backofficeUser.findMany()
    return users
}

/**
 * Fetches a backoffice user by their artist ID
 */
async function fetchBackofficeUserByArtistId(artistId: number) {
    const user = await prisma.backofficeUser.findFirst({
        where: {
            artistId
        }
    })
    return user
}

export { fetchBackofficeUsers, fetchBackofficeUserByArtistId } 