'use client'
import Image from 'next/image'
import { ArtistWithRelations } from '@/types'
import Container from '@/components/Common/Container';

interface ArtistIntroSectionProps {
  artist: ArtistWithRelations;
  artistPhoto: string;
  artistBackground: string;
  citation: string;
  shortBio: string;
}

export default function ArtistIntroSection({
  artist,
  artistPhoto,
  artistBackground,
  citation,
  shortBio
}: ArtistIntroSectionProps) {
  const birthInfo = `Né(e) en ${artist.birthYear || ''}${artist.countryName ? ` - ${artist.countryName}` : ''}`

  return (
    <section className="relative w-full h-intro-mobile desktop:h-intro overflow-hidden">
      {/* Background artwork (right side) */}
      {artistBackground && (
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute right-0 top-0 w-full md:w-2/3 h-full">
            <Image
              src={artistBackground}
              alt={`Artwork by ${artist.name} ${artist.surname}`}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient overlay to blend with background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[rgb(19,19,19)] via-[rgb(19,19,19,0.8)] to-transparent" />
          </div>
        </div>
      )}

      {/* Content */}
      <Container>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-[90%] desktop:max-w-[1414px] mx-auto w-full py-8 md:py-12">
            <div className="flex flex-col md:flex-row gap-6 md:gap-28">
              {/* Left side - Artist card with photo background */}
              {/* Artist card with photo background */}
              {artistPhoto && (
                <div className="relative w-full max-w-md aspect-[8/10] rounded-2xl overflow-hidden">
                  {/* Background photo */}
                  <Image
                    src={artistPhoto}
                    alt={`Photo of ${artist.name} ${artist.surname}`}
                    fill
                    className="object-cover"
                  />

                  {/* Dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                    {/* Top - Category tag */}
                    <span className="w-fit px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                      Peinture
                    </span>

                    {/* Bottom - Birth info and name */}
                    <div>
                      {/* Birth info */}
                      <p className="text-white/90 text-sm mb-3">
                        {birthInfo}
                      </p>

                      {/* Artist name */}
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-none tracking-tight">
                        {artist.name}
                        <br />
                        {artist.surname}
                      </h1>
                    </div>
                  </div>
                </div>
              )}

              {/* Citation */}
              {citation && (
                  <blockquote className="m-auto text-white/80 text-2xl md:text-4xl italic leading-relaxed">
                    {citation}
                  </blockquote>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

