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

    if (!nft) return null

    // Convertir les objets Decimal en nombres
    return {
        ...nft,
        price: Number(nft.price),
        height: nft.height ? Number(nft.height) : null,
        width: nft.width ? Number(nft.width) : null,
        weight: nft.weight ? Number(nft.weight) : null,
        unitHeight: nft.unitHeight ? Number(nft.unitHeight) : null,
        unitWidth: nft.unitWidth ? Number(nft.unitWidth) : null,
        unitWeight: nft.unitWeight ? Number(nft.unitWeight) : null
    }
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

    // Convertir les objets Decimal en nombres
    return nfts.map(nft => ({
        ...nft,
        price: Number(nft.price),
        height: nft.height ? Number(nft.height) : null,
        width: nft.width ? Number(nft.width) : null,
        weight: nft.weight ? Number(nft.weight) : null,
        unitHeight: nft.unitHeight ? Number(nft.unitHeight) : null,
        unitWidth: nft.unitWidth ? Number(nft.unitWidth) : null,
        unitWeight: nft.unitWeight ? Number(nft.unitWeight) : null
    }))
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

    // Convertir les objets Decimal en nombres
    return nfts.map(nft => ({
        ...nft,
        price: Number(nft.price),
        height: nft.height ? Number(nft.height) : null,
        width: nft.width ? Number(nft.width) : null,
        weight: nft.weight ? Number(nft.weight) : null,
        unitHeight: nft.unitHeight ? Number(nft.unitHeight) : null,
        unitWidth: nft.unitWidth ? Number(nft.unitWidth) : null,
        unitWeight: nft.unitWeight ? Number(nft.unitWeight) : null
    }))
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

    // Convertir les objets Decimal en nombres pour éviter les erreurs de sérialisation
    return items.map(item => ({
        ...item,
        physicalItem: item.physicalItem ? {
            ...item.physicalItem,
            price: Number(item.physicalItem.price),
            height: item.physicalItem.height ? Number(item.physicalItem.height) : null,
            width: item.physicalItem.width ? Number(item.physicalItem.width) : null,
            weight: item.physicalItem.weight ? Number(item.physicalItem.weight) : null,
            unitHeight: item.physicalItem.unitHeight ? Number(item.physicalItem.unitHeight) : null,
            unitWidth: item.physicalItem.unitWidth ? Number(item.physicalItem.unitWidth) : null,
            unitWeight: item.physicalItem.unitWeight ? Number(item.physicalItem.unitWeight) : null
        } : null,
        nftItem: item.nftItem ? {
            ...item.nftItem,
            price: Number(item.nftItem.price)
        } : null
    }))
}

export { getItemsByStatus, getItemsByStatusAndStock, getItemBySlug, getAvailableItems }
