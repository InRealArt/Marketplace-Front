'use server'
import prisma from "./prisma"
import { ResourceNftStatuses } from "@prisma/client"
import { NftId, NftType } from "@/types"

async function getNftById(id: number) {
    const nft = await prisma.resourceNft.findUnique({
        where: {
            id
        }
    })
    return nft
}

async function getNftsByStatus(status: ResourceNftStatuses[]) {
    const nfts: NftType[] = await prisma.resourceNft.findMany({
        where: {
            status: { in: status }
        },
        orderBy: [
            {
              id: 'asc'
            }
          ]
    })
    return nfts
}

async function getNftsByStatusAndPurchasedOnce(status: ResourceNftStatuses[], purchasedOnce: boolean) {
    let nfts: NftType[] = await prisma.resourceNft.findMany({
        where: {
            status: { in: status },
            purchasedOnce: purchasedOnce
        },
        orderBy: [
            {
              id: 'asc'
            }
          ]
    })
    return nfts
}

async function updateNft(data: Partial<NftType>, id: NftId) {
    const nft = await prisma.resourceNft.update({
        where: {
            id
        }, data: data
    })
    return nft
}

export { getNftsByStatus, getNftById, updateNft, getNftsByStatusAndPurchasedOnce }
