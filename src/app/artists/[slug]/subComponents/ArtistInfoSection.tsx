'use client'

import Image from "next/image"

interface ArtistInfoSectionProps {
  artist: {
    name: string
    role?: string | null
    intro?: string | null
    description: string
    photo?: string | null
    mediumTags?: string[]
    birthYear?: number | null
    countryCode?: string | null
    countryName?: string | null
    quoteHeader?: string | null
    quoteText?: string | null

  }
}

export default function ArtistInfoSection({ artist }: ArtistInfoSectionProps) {

  return (
    <section className="pt-32 pb-16" style={{ backgroundColor: 'rgb(19, 19, 19)' }}>
      <div className="max-w-screen xl:max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Colonne gauche - Informations de l'artiste */}
          <div className="space-y-6">
            {/* Année de naissance et pays */}
            {(artist.birthYear || artist.countryName) && (
              <p className="text-gray-400 text-sm  font-serif">
                {artist.birthYear && `Née le ${artist.birthYear}`}
                {artist.birthYear && artist.countryName && ' - '}
                {artist.countryName}
              </p>
            )}

            {/* Nom de l'artiste */}
            <h2 className="text-3xl lg:text-4xl font-bold text-white  font-serif">
              {artist.name}
            </h2>


            {/* Description de l'artiste */}
            <p className="text-white text-sm leading-relaxed  font-serif">
              Artist Certified
            </p>

            {/* Tags de médium */}
            {artist.mediumTags && artist.mediumTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {artist.mediumTags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-600 text-white rounded-full text-sm inter font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Colonne centrale - Citation */}
          <div className="space-y-6">
            {/* Citation principale */}
            {artist.quoteHeader && (
              <blockquote className="text-2xl lg:text-3xl text-white font-medium leading-relaxed  font-serif">
                « {artist.quoteHeader} »
              </blockquote>
            )}

            {/* Texte descriptif */}
            {artist.quoteText && (
              <p className="text-white text-sm leading-relaxed  font-serif">
                {artist.quoteText}
              </p>
            )}
          </div>

          {/* Colonne droite - Photo de l'artiste */}
          {artist.photo && (
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm h-96 lg:h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src={artist.photo}
                  alt={`Photo de ${artist.name}`}
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
