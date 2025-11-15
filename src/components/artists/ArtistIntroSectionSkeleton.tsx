'use client'
import React from 'react'
import Container from '@/components/Common/Container'

export default function ArtistIntroSectionSkeleton() {
  return (
    <section className="relative w-full h-intro-mobile desktop:h-intro overflow-hidden">
      {/* Background skeleton */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute right-0 top-0 w-full md:w-2/3 h-full bg-white/5 animate-pulse" />
      </div>

      {/* Content */}
      <Container>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-[90%] desktop:max-w-[1414px] mx-auto w-full py-8 md:py-12">
            <div className="flex flex-col md:flex-row gap-6 md:gap-28">
              {/* Left side - Artist card skeleton */}
              <div className="relative w-full max-w-md aspect-[8/10] rounded-2xl overflow-hidden bg-white/10 animate-pulse">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                  {/* Top - Category tag skeleton */}
                  <div className="w-fit px-4 py-2 bg-white/10 rounded-full">
                    <div className="h-4 w-20 bg-white/20 rounded animate-pulse" />
                  </div>

                  {/* Bottom - Info and name skeleton */}
                  <div className="space-y-3">
                    {/* Birth info skeleton */}
                    <div className="h-4 w-40 bg-white/20 rounded animate-pulse" />

                    {/* Artist name skeleton */}
                    <div className="space-y-2">
                      <div className="h-12 md:h-14 lg:h-16 w-3/4 bg-white/30 rounded animate-pulse" />
                      <div className="h-12 md:h-14 lg:h-16 w-2/3 bg-white/30 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Citation skeleton */}
              <div className="m-auto w-full md:w-auto space-y-3">
                <div className="h-8 md:h-12 w-full md:w-96 bg-white/10 rounded animate-pulse" />
                <div className="h-8 md:h-12 w-full md:w-80 bg-white/10 rounded animate-pulse ml-auto" />
                <div className="h-8 md:h-12 w-full md:w-72 bg-white/10 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

