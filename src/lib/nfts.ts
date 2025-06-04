'use server'
import prisma from "./prisma"
import { PhysicalItemStatus, ResourceNftStatuses, NftItemStatus } from "@prisma/client"
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
            item: true
        },
        orderBy: [
            {
                id: 'asc'
            }
        ]
    })
    return nfts
}

async function getItemsByStatusAndStock(status: PhysicalItemStatus[], minStock: number = 0) {
    const nfts = await prisma.physicalItem.findMany({
        where: {
            status: { in: status },
            stockQty: { gte: minStock }
        },
        include: {
            item: true
        },
        orderBy: [
            {
                id: 'asc'
            }
        ]
    })
    return nfts
}

async function getAvailableItems() {
    const items = await prisma.item.findMany({
        where: {
            OR: [
                {
                    physicalItem: {
                        status: PhysicalItemStatus.listed,
                        stockQty: { gt: 0 }
                    }
                },
                {
                    nftItem: {
                        status: NftItemStatus.listed
                    }
                }
            ]
        },
        include: {
            physicalItem: true,
            nftItem: true,
            medium: true,
            style: true,
            technique: true,
            user: {
                include: {
                    Artist: true
                }
            }
        },
        orderBy: [
            {
                id: 'asc'
            }
        ]
    })
    return items
}

export { getItemsByStatus, getItemsByStatusAndStock, getItemBySlug, getAvailableItems }
