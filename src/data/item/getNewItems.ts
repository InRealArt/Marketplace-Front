import "server-only";
import prisma from '@/lib/prisma'

/**
 * Récupère les derniers items créés selon les critères suivants :
 * - L'item doit avoir soit :
 *   - Une correspondance dans PhysicalItem avec stockQty > 0 et status 'listed'
 *   - OU une correspondance dans NftItem avec status 'listed'
 * - Classés par createdAt décroissant (plus récents en premier)
 * 
 * @param options - Options de pagination
 * @param options.page - Numéro de page (par défaut 1)
 * @param options.limit - Nombre d'items par page (par défaut 6)
 * @returns Promise<Item[]> - Liste des nouveaux items correspondants
 */
export async function getNewItems(
    options: { page?: number; limit?: number } = {}
) {
    const { page = 1, limit = 6 } = options
    const skip = (page - 1) * limit

    try {
        const items = await prisma.item.findMany({
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
                createdAt: 'desc' // Trier par date de création décroissante
            },
            skip: skip,
            take: limit
        })

        return items
    } catch (error) {
        console.error('Erreur lors de la récupération des nouveaux items:', error)
        throw new Error('Impossible de récupérer les nouveaux items')
    }
} 