'use client'
import Hero from '@/components/Common/Hero'

const ArtworksHero = () => {
  return (
    <Hero
      imageSrc="/images/mock/artist/ekaterina-background.avif"
      imageAlt="Abstract artwork background"
      title="Discover available artworks"
      description="Explore a curated selection of contemporary pieces from emerging and established artists. Filter by size, material, or type to find the artwork that resonates with you."
      height="h-[45vh] md:h-[55vh]"
      className="pt-[80px]"
      titleClassName="text-4xl md:text-6xl"
      descriptionClassName="text-base md:text-lg text-white/80"
      priority
    />
  )
}

export default ArtworksHero

