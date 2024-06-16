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
        }
    })
    return nfts
}

async function updateNft(data: Pick<NftType, 'owner' | 'transactionHash'>, id: NftId) {
    const { owner, transactionHash } = data
    const nft = await prisma.resourceNft.update({
        where: {
            id
        }, data: {
            owner,
            transactionHash,
        }
    })
    return nft
}

export { getNftsByStatus, getNftById, updateNft }
