import "server-only";
import prisma from '@/lib/prisma'

export async function getTotalItems() {
    const totalItems = await prisma.item.count({
        where: {
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