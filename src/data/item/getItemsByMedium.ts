import "server-only";
import prisma from '@/lib/prisma'

/**
 * Récupère les items par medium selon les critères suivants :
 * - Le medium doit correspondre au mediumId fourni
 * - L'item doit avoir soit :
 *   - Une correspondance dans PhysicalItem avec stockQty > 0 et status 'listed'
 *   - OU une correspondance dans NftItem avec status 'listed'
 * 
 * @param mediumId - L'ID du medium à filtrer
 * @param options - Options de pagination
 * @param options.page - Numéro de page (par défaut 1)
 * @param options.limit - Nombre d'items par page (par défaut 9)
 * @returns Promise<Item[]> - Liste des items correspondants
 */
export async function getItemsByMedium(
    mediumId: number,
    options: { page?: number; limit?: number } = {}
) {
    const { page = 1, limit = 9 } = options
    const skip = (page - 1) * limit

    try {
        const items = await prisma.item.findMany({
            where: {
                mediumId: mediumId,
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
            },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                },
                medium: true,
                style: true,
                technique: true,
                physicalItem: {
                    select: {
                        id: true,
                        price: true,
                        status: true,
                        stockQty: true,
                        height: true,
                        width: true,
                        weight: true,
                        unitHeight: true,
                        unitWidth: true,
                        unitWeight: true,
                        creationYear: true
                    }
                },
                nftItem: {
                    select: {
                        id: true,
                        price: true,
                        status: true
                    }
                }
            },
            orderBy: {
                id: 'desc'
            },
            skip: skip,
            take: limit
        })

        return items
    } catch (error) {
        console.error('Erreur lors de la récupération des items par medium:', error)
        throw new Error('Impossible de récupérer les items')
    }
}
