import "server-only";
import prisma from '@/lib/prisma'

/**
 * Compte le nombre total d'items "nouveautés" selon les critères suivants :
 * - L'item doit avoir soit :
 *   - Une correspondance dans PhysicalItem avec stockQty > 0 et status 'listed'
 *   - OU une correspondance dans NftItem avec status 'listed'
 * 
 * @returns Promise<number> - Nombre total d'items nouveautés
 */
export async function getTotalNewItems(): Promise<number> {
    try {
        const count = await prisma.item.count({
            where: {
                OR: [
                    // Items avec PhysicalItem en stock et listés
                    {
                        physicalItem: {
                            stockQty: {
                                gt: 0
                            },
                            status: 'listed'
                        }
                    },
                    // Items avec NftItem listés
                    {
                        nftItem: {
                            status: 'listed'
                        }
                    }
                ]
            }
        })

        return count
    } catch (error) {
        console.error('Erreur lors du comptage des nouveaux items:', error)
        throw new Error('Impossible de compter les nouveaux items')
    }
} 