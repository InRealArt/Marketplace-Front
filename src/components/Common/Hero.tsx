'use client'

import Image from 'next/image'

interface HeroProps {
  imageSrc: string
  imageAlt: string
  title: string
  description?: string
  height?: string
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  priority?: boolean
  quality?: number
}

const Hero = ({
  imageSrc,
  imageAlt,
  title,
  description,
  height = 'h-[40vh] md:h-[50vh]',
  className = '',
  titleClassName = '',
  descriptionClassName = '',
  priority = false,
  quality = 90
}: HeroProps) => {
  return (
    <section className={`relative w-full ${height} overflow-hidden ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority={priority}
          quality={quality}
        />

        {/* Gradient from bottom to background RGB(19, 19, 19) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(19,19,19)] via-[rgb(19,19,19,0.8)] to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-end h-full">
        <div className="max-w-screen desktop:max-w-[1414px] mx-auto w-full pb-12 md:pb-16">
          <div className="max-w-4xl">
            <h1 className={`text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6 ${titleClassName}`}>
              {title}
            </h1>
            {description && (
              <p className={`text-base md:text-lg text-white/90 max-w-2xl leading-relaxed ${descriptionClassName}`}>
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
