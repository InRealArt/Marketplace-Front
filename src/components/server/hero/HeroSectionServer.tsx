import { HeroSection } from '../../client/hero/HeroSection'
import { getArtistsForHero } from '@/data/artist/getArtistsForHero'

interface Artist {
  imageUrl: string | null
  featuredArtwork: string | null
}

interface ArtistData {
  id: string
  artistImageUrl: string
  artworkImageUrl: string
}

// Fonction pour transformer les données database vers le format attendu
function transformArtistData(artists: Artist[]): ArtistData[] {
  return artists
    .filter(artist => artist.imageUrl && artist.featuredArtwork)
    .map((artist, index) => ({
      id: `artist-${index}`,
      artistImageUrl: artist.imageUrl!,
      artworkImageUrl: artist.featuredArtwork!,
    }))
}

export async function HeroSectionServer() {
  const artists = await getArtistsForHero(6)
  const transformedArtists = transformArtistData(artists)

  return (
    <HeroSection 
      backgroundImageUrl="/images/bg_hero.svg"
      artists={transformedArtists}
    />
  )
} 