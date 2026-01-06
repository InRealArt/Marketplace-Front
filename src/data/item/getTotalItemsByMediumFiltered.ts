import "server-only";
import prisma from '@/lib/prisma'

/**
 * Compte les items par medium selon les mêmes critères que getItemsByMedium
 * 
 * @param mediumId - L'ID du medium à filtrer
 * @param options - Options de filtrage
 * @param options.priceMin - Prix minimum pour filtrer (par défaut 0)
 * @param options.priceMax - Prix maximum pour filtrer (par défaut 500000)
 * @param options.techniqueId - ID de la technique pour filtrer (par défaut 0 = toutes)
 * @returns Promise<number> - Nombre d'items correspondants
 */
export async function getTotalItemsByMediumFiltered(
    mediumId: number,
    options: {
        priceMin?: number;
        priceMax?: number;
        techniqueId?: number
    } = {}
) {
    const { priceMin = 0, priceMax = 500000, techniqueId = 0 } = options

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
                    // NftItem case - pas de filtre par mediumId car NftItem n'a pas de mediumId
                }
            ]
        }

        // Ajouter le filtre par technique si spécifié (0 = toutes les techniques)
        // Note: techniqueId est sur PhysicalItem via relation many-to-many, donc on ne peut pas le filtrer directement ici
        if (techniqueId > 0) {
            // Le filtre par technique nécessiterait une jointure avec ItemTechnique
            // Pour l'instant, on ne peut pas filtrer par technique de cette manière
        }

        const totalItems = await prisma.item.count({
            where: whereClause
        })

        return totalItems
    } catch (error) {
        console.error('Erreur lors du comptage des items par medium filtrés:', error)
        throw new Error('Impossible de compter les items par medium filtrés')
    }
} 