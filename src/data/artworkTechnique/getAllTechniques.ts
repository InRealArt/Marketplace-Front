import "server-only";
import prisma from '@/lib/prisma'

/**
 * Récupère toutes les techniques d'artwork disponibles
 * @returns Promise<ArtworkTechnique[]> - Liste de toutes les techniques
 */
export async function getAllTechniques() {
    try {
        const techniques = await prisma.artworkTechnique.findMany({
            orderBy: {
                name: 'asc'
            }
        })

        return techniques
    } catch (error) {
        console.error('Erreur lors de la récupération des techniques:', error)
        throw new Error('Impossible de récupérer les techniques')
    }
} 