import "server-only";
import prisma from '@/lib/prisma'
import { NftItemStatus } from '@prisma/client'

/**
 * Récupère les NFT items d'un artiste qui sont listés
 * @param artistId - ID de l'artiste
 * @returns Tableau des NFT items de l'artiste avec statut "listed"
 */
export async function getNftItemsByArtist(artistId: number) {
    try {
        const nftItems = await prisma.nftItem.findMany({
            where: {
                status: NftItemStatus.listed,
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
                },
                nftResource: {
                    select: {
                        id: true,
                        tokenId: true,
                        tokenUri: true,
                        status: true,
                        type: true,
                        name: true,
                        imageUri: true,
                        description: true,
                        owner: true,
                        transactionHash: true
                    }
                }
            },
            orderBy: {
                item: {
                    name: 'asc'
                }
            }
        })

        return nftItems
    } catch (error) {
        console.error('Erreur lors de la récupération des NFT items de l\'artiste:', error)
        throw new Error('Impossible de récupérer les NFT items de l\'artiste')
    }
}

/**
 * Type de retour pour les NFT items d'un artiste
 */
export type NftItemByArtist = NonNullable<
    Awaited<ReturnType<typeof getNftItemsByArtist>>[0]
>
