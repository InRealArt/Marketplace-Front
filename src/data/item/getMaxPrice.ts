import "server-only";
import prisma from '@/lib/prisma'

/**
 * Récupère le prix maximum des items disponibles
 * @returns Promise<number> - Le prix maximum trouvé dans la base de données
 */
export async function getMaxPrice(): Promise<number> {
    try {
        // Récupérer le prix max des PhysicalItems listés
        const maxPhysicalPrice = await prisma.physicalItem.findFirst({
            where: {
                status: 'listed',
                stockQty: {
                    gt: 0
                }
            },
            orderBy: {
                price: 'desc'
            },
            select: {
                price: true
            }
        })

        // Récupérer le prix max des NftItems listés
        const maxNftPrice = await prisma.nftItem.findFirst({
            where: {
                status: 'listed'
            },
            orderBy: {
                price: 'desc'
            },
            select: {
                price: true
            }
        })

        // Comparer les deux prix et retourner le maximum
        const physicalPrice = maxPhysicalPrice ? Number(maxPhysicalPrice.price) : 0
        const nftPrice = maxNftPrice ? Number(maxNftPrice.price) : 0

        const maxPrice = Math.max(physicalPrice, nftPrice)

        // Retourner au minimum 10000 pour éviter des problèmes si la DB est vide
        return maxPrice > 0 ? maxPrice : 10000
    } catch (error) {
        console.error('Erreur lors de la récupération du prix maximum:', error)
        // Retourner une valeur par défaut en cas d'erreur
        return 10000
    }
} 