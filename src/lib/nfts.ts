'use server'
import prisma from "./prisma"
import { PhysicalItemStatus, ResourceNftStatuses } from "@prisma/client"
import { NftId, ItemPhysicalType } from "@/types"

async function getItemBySlug(id: number) {
    const nft = await prisma.physicalItem.findUnique({
        where: {
            id
        },
    })
    
    return nft
}

async function getItemsByStatus(status: PhysicalItemStatus[]) {
    const nfts = await prisma.physicalItem.findMany({
        where: {
            status: { in: status }
        },
        include: {
            Item: true
        },
        orderBy: [
            {
                id: 'asc'
            }
        ]
    })    
    return nfts
}


export { getItemsByStatus, getItemBySlug }
