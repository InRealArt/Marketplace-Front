'use server'
import prisma from "./prisma"

async function fetchCollections() {
    const collections = await prisma.collection.findMany()
    return collections
}

async function fetchCollectionById(id: number) {
    const collection = await prisma.collection.findUnique({
        where: {
            id
        }
    })
    return collection
}

export { fetchCollections, fetchCollectionById }
