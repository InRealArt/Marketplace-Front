// Constantes pour les IDs des mediums d'artwork
export const ARTWORK_MEDIUMS = {
    PEINTURE: 1,
    SCULPTURE: 2,
    PHOTOGRAPHIE: 3,
    DESSIN: 4,
    GRAVURE: 5,
    // Ajoutez d'autres mediums selon votre base de données
} as const

export type ArtworkMediumType = keyof typeof ARTWORK_MEDIUMS 