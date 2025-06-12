import "server-only";
import prisma from '@/lib/prisma'

export async function getTotalItemsByMedium(mediumId: number) {
    const totalItems = await prisma.item.count({
        where: {
            mediumId: mediumId,
            OR: [
                {
                    physicalItem: {
                        stockQty: {
                            gt: 0
                        },
                        status: 'listed'
                    }
                },
                {
                    nftItem: {
                        status: 'listed'
                    }
                }
            ]
        }
    })

    return totalItems
} 