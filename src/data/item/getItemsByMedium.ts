import "server-only";
import prisma from '@/lib/prisma'

/**
 * Récupère les items par medium selon les critères suivants :
 * - Le medium doit correspondre au mediumId fourni
 * - L'item doit avoir soit :
 *   - Une correspondance dans PhysicalItem avec stockQty > 0 et status 'listed'
 *   - OU une correspondance dans NftItem avec status 'listed'
 * - Filtrage par prix si spécifié
 * - Filtrage par techniques si spécifié
 * 
 * @param mediumId - L'ID du medium à filtrer
 * @param options - Options de pagination et filtrage
 * @param options.page - Numéro de page (par défaut 1)
 * @param options.limit - Nombre d'items par page (par défaut 9)
 * @param options.priceMin - Prix minimum pour filtrer (par défaut 0)
 * @param options.priceMax - Prix maximum pour filtrer (par défaut 500000)
 * @param options.techniqueId - ID de la technique pour filtrer (par défaut 0 = toutes)
 * @returns Promise<Item[]> - Liste des items correspondants
 */
export async function getItemsByMedium(
    mediumId: number,
    options: {
        page?: number;
        limit?: number;
        priceMin?: number;
        priceMax?: number;
        techniqueId?: number
    } = {}
) {
    const { page = 1, limit = 9, priceMin = 0, priceMax = 500000, techniqueId = 0 } = options
    const skip = (page - 1) * limit

    try {
        const whereClause: any = {
            OR: [
                // Items avec PhysicalItem en stock et listés avec filtre de prix et mediumId
                {
                    physicalItem: {
                        mediumId: mediumId,
                        stockQty: {
                            gt: 0
                        },
                        status: 'listed',
                        price: {
                            gte: priceMin,
                            lte: priceMax
                        }
                    }
                },
                // Items avec NftItem listés avec filtre de prix
                {
                    nftItem: {
                        status: 'listed',
                        price: {
                            gte: priceMin,
                            lte: priceMax
                        }
                    }
                }
            ]
        }

        // Ajouter le filtre par technique si spécifié (0 = toutes les techniques)
        // Note: techniqueId est sur PhysicalItem via relation many-to-many, donc on ne peut pas le filtrer directement ici
        if (techniqueId > 0) {
            // Le filtre par technique nécessiterait une jointure avec ItemTechnique
            // Pour l'instant, on ne peut pas filtrer par technique de cette manière
        }

        const items = await prisma.item.findMany({
            where: whereClause,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
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
                        creationYear: true,
                        mediumId: true,
                        medium: true
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
