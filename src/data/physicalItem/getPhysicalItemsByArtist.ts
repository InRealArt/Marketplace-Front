import "server-only";
import prisma from '@/lib/prisma'
import { PhysicalItemStatus } from '@prisma/client'

/**
 * Récupère les physical items d'un artiste qui sont en stock et listés
 * @param artistId - ID de l'artiste
 * @returns Tableau des physical items de l'artiste avec quantité en stock > 0 et statut "listed"
 */
export async function getPhysicalItemsByArtist(artistId: number) {
    try {
        const physicalItems = await prisma.physicalItem.findMany({
            where: {
                status: PhysicalItemStatus.listed,
                stockQty: {
                    gt: 0
                },
                item: {
                    user: {
                        Artist: {
                            id: artistId
                        }
                    }
                }
            },
            include: {
                item: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                Artist: {
                                    select: {
                                        id: true,
                                        name: true,
                                        surname: true,
                                        pseudo: true,
                                        slug: true
                                    }
                                }
                            }
                        },
                        medium: true,
                        style: true,
                        technique: true
                    }
                }
            },
            orderBy: {
                item: {
                    name: 'asc'
                }
            }
        })

        return physicalItems
    } catch (error) {
        console.error('Erreur lors de la récupération des physical items de l\'artiste:', error)
        throw new Error('Impossible de récupérer les physical items de l\'artiste')
    }
}

/**
 * Type de retour pour les physical items d'un artiste
 */
export type PhysicalItemByArtist = NonNullable<
    Awaited<ReturnType<typeof getPhysicalItemsByArtist>>[0]
>
