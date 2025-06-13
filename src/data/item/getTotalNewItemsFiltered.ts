import "server-only";
import prisma from '@/lib/prisma'

/**
 * Compte les nouveaux items selon les mêmes critères que getNewItems
 * 
 * @param options - Options de filtrage
 * @param options.priceMin - Prix minimum pour filtrer (par défaut 0)
 * @param options.priceMax - Prix maximum pour filtrer (par défaut 500000)
 * @param options.techniqueId - ID de la technique pour filtrer (par défaut 0 = toutes)
 * @returns Promise<number> - Nombre de nouveaux items correspondants
 */
export async function getTotalNewItemsFiltered(
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
                // Items avec PhysicalItem en stock et listés avec filtre de prix
                {
                    physicalItem: {
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
        if (techniqueId > 0) {
            whereClause.techniqueId = techniqueId
        }

        const totalItems = await prisma.item.count({
            where: whereClause
        })

        return totalItems
    } catch (error) {
        console.error('Erreur lors du comptage des nouveaux items filtrés:', error)
        throw new Error('Impossible de compter les nouveaux items filtrés')
    }
} 