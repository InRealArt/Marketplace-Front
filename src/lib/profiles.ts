'use server'
import { UserRoles } from "@prisma/client"
import prisma from "./prisma"

interface ArtistData {
    userId: string
    userRole: UserRoles
}

async function createProfile(data: ArtistData) {
    const { userId, userRole } = data
    const profile = await prisma.profile.create({
        data: {
            userId,
            userRole
        }
    })
    return profile
}

async function fetchProfileByUserId(userId: string) {
    const artists = await prisma.profile.findUnique({
        where: {
            userId
        }
    })
    return artists
}

export { fetchProfileByUserId, createProfile }
