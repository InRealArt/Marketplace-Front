'use server'
import prisma from "./prisma"
import { ArtistWithRelations, ArtistData } from "@/types"

async function fetchArtists() {
    const artists = await prisma.artist.findMany({
        include: {
            Country: true,
            artworkImages: true
        }
    })
    return artists
}

async function fetchArtistById(artistId: number) {
    const artist = await prisma.artist.findUnique({
        where: {
            id: artistId
        },
        include: {
            Country: true,
            artworkImages: true
        }
    })
    return artist
}

async function fetchArtistBySlug(slug: string) {
    const artist = await prisma.artist.findUnique({
        where: {
            slug: slug
        },
        include: {
            Country: true,
            artworkImages: true
        }
    })
    return artist
}

// Helper function to transform Prisma Artist to ArtistData interface
function transformToArtistData(artist: ArtistWithRelations): ArtistData {
    return {
        id: artist.id,
        name: artist.name,
        role: artist.role || '',
        photo: artist.photo || artist.imageUrl,
        intro: artist.intro || '',
        description: artist.description,
        slug: artist.slug || '',
        artistId: artist.id,
        countryCode: artist.countryCode,
        countryName: artist.countryName || artist.Country?.name,
        mediumTags: artist.mediumTags || [],
        birthYear: artist.birthYear,
        quoteHeader: artist.quoteHeader,
        quoteText: artist.quoteText,
        biographyHeader1: artist.biographyHeader1,
        biographyText1: artist.biographyText1,
        biographyHeader2: artist.biographyHeader2,
        biographyText2: artist.biographyText2,
        biographyHeader3: artist.biographyHeader3,
        biographyText3: artist.biographyText3,
        artworkImages: (artist.artworkImages || []).map(img => ({
            image: img.image,
            name: img.name,
            price: img.price || undefined,
            url: img.url
        }))
    }
}

export { fetchArtists, fetchArtistById, fetchArtistBySlug, transformToArtistData }
