'use server'
import prisma from "./prisma"
import { ItemStatus, ResourceNftStatuses } from "@prisma/client"
import { NftId, NftType } from "@/types"

async function getNftBySlug(id: number) {
    const nft = await prisma.item.findUnique({
        where: {
            id
        },
        include: {
            NftResource: true
        }
    })
    return nft
}

async function getNftsByStatus(status: ItemStatus[]) {
    const nfts = await prisma.item.findMany({
        where: {
            status: { in: status }
        },
        include: {
            NftResource: true
        },
        orderBy: [
            {
              id: 'asc'
            }
          ]
    })
    return nfts.map(nft => ({
        ...nft,
        owner: nft.NftResource?.owner,
        previousOwner: nft.NftResource?.previousOwner,
        itemId: nft.NftResource?.blockchainItemId
    })) as NftType[]
}

async function updateNft(data: Partial<NftType>, id: NftId) {
    const nft = await prisma.item.update({
        where: {
            id
        }, data: data
    })
    return nft
}

async function updateResourceNft(data: { status: ResourceNftStatuses }, id: number | undefined) {
    if (!id) {
        throw new Error('ID is required to update a ResourceNft')
    }
    const nft = await prisma.resourceNft.update({
        where: {
            id
        }, data: data
    })
    return nft
}

export { getNftsByStatus, getNftBySlug, updateNft, updateResourceNft }
