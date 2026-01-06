import "server-only";
import prisma from '@/lib/prisma'

/**
 * Récupère les derniers physical items vendus
 * @param limit - Nombre maximum d'items à retourner (défaut: 10)
 * @param artistId - ID de l'artiste pour filtrer les résultats (optionnel)
 * @returns Tableau des derniers physical items vendus avec leurs informations
 */
export async function getLastSoldPhysicalItems(limit = 10, artistId?: number) {
    try {
        const soldPhysicalItems = await prisma.orderItem.findMany({
            where: {
                physicalItemId: {
                    not: null
                },
                ...(artistId && {
                    physicalItem: {
                        item: {
                            user: {
                                artist: {
                                    id: artistId
                                }
                            }
                        }
                    }
                })
            },
            include: {
                order: {
                    select: {
                        id: true,
                        createdAt: true,
                        orderNumber: true,
                        paidAt: true
                    }
                },
                physicalItem: {
                    include: {
                        item: {
                            include: {
                                user: {
                                    select: {
                                        id: true,
                                        name: true,
                                        email: true,
                                        artist: {
                                            select: {
                                                id: true,
                                                name: true,
                                                surname: true,
                                                pseudo: true
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        medium: true
                    }
                }
            },
            orderBy: {
                order: {
                    createdAt: 'desc'
                }
            },
            take: limit
        })

        // Extraction des physical items uniques (au cas où le même item apparaît dans plusieurs commandes)
        const uniquePhysicalItems = soldPhysicalItems
            .map((orderItem) => orderItem.physicalItem)
            .filter((item, index, self) =>
                item && self.findIndex((i) => i?.id === item.id) === index
            )

        return uniquePhysicalItems
    } catch (error) {
        console.error('Erreur lors de la récupération des derniers physical items vendus:', error)
        throw new Error('Impossible de récupérer les derniers physical items vendus')
    }
}

/**
 * Type de retour pour les physical items vendus
 */
export type SoldPhysicalItem = NonNullable<
    Awaited<ReturnType<typeof getLastSoldPhysicalItems>>[0]
>
