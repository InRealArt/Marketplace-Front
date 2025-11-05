import "server-only";

/**
 * Récupère les NFT items d'un artiste qui sont listés
 * @param artistId - ID de l'artiste
 * @returns Tableau des NFT items de l'artiste avec statut "listed"
 * @note NftItem model doesn't exist in the schema, returning empty array
 */
export async function getNftItemsByArtist(artistId: number) {
    // TODO: Implement when NftItem model is added to the schema
    console.warn('getNftItemsByArtist called but NftItem model does not exist in schema')
    return []
}

/**
 * Type de retour pour les NFT items d'un artiste
 */
export type NftItemByArtist = any // Stub type since NftItem doesn't exist
