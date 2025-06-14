import HeroSection from '../../client/hero/HeroSection'
import { getArtistsForHero } from '@/data/artist/getArtistsForHero'

export function HeroSectionServer() {
  // Don't await the data fetching function
  const artistsPromise = getArtistsForHero(6)

  return (
    <HeroSection 
      backgroundImageUrl="/images/bg_hero.svg"
      artists={artistsPromise}
    />
  )
} 