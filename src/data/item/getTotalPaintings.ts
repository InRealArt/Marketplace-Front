import "server-only";
import prisma from '@/lib/prisma'
import { ARTWORK_MEDIUMS } from "@/lib/constants/mediums";


export async function getTotalPaintings() {
    const totalPaintings = await prisma.item.count({
        where: {
          mediumId: ARTWORK_MEDIUMS.PEINTURE,
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

    return totalPaintings
}