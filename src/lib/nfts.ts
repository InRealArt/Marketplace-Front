'use server'
import prisma from "./prisma"
import { ResourceNftStatuses } from "@prisma/client"
import { NftType } from "@/types"

async function getNftById(id: number) {
    const nft = await prisma.resourceNft.findUnique({
        where: {
            id
        }
    })
    return nft
}

type AttributesTypes = Array<{ trait_type: String; value: string }>

async function request<TResponse>(
    url: string,
): Promise<TResponse> {
    const response = await fetch(url);
    return response.json();
}

async function getNftsByStatus(status: ResourceNftStatuses[]) {
    // const collection
    const nfts: NftType[] = await prisma.resourceNft.findMany({
        where: {
            status: { in: status }
        }
    })
    const nftsWithTags = await Promise.all((nfts).map(async (nft, i) => {
        const response = await request<{ attributes: AttributesTypes }>(`${process.env.NEXT_PUBLIC_PINATA_URL}/ipfs/${nft.tokenUri}`)
        const tags = (response.attributes as AttributesTypes).filter(att => att.trait_type === "tag").map(tag => tag.value)
        nft.tags = tags
        return nft
    }))
    return nftsWithTags
}

export { getNftsByStatus, getNftById }
