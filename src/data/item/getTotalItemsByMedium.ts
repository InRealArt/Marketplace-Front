import "server-only";
import prisma from '@/lib/prisma'

export async function getTotalItemsByMedium(mediumId: number) {
    const totalItems = await prisma.item.count({
        where: {
            OR: [
                {
                    physicalItem: {
                        mediumId: mediumId,
                        stockQty: {
                            gt: 0
                        },
                        status: 'listed'
                    }
                },
                {
                    // NftItem case - pas de filtre par mediumId car NftItem n'a pas de mediumId
                }
            ]
        }
    })

    return totalItems
} 