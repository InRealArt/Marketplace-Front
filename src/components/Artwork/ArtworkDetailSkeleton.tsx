import React from 'react'
import Container from '@/components/Common/Container'

const ArtworkDetailSkeleton = () => {
  const renderThumbnailSkeletons = Array.from({ length: 5 }, (_, index) => (
    <div
      key={`thumb-skeleton-${index}`}
      className="h-[80px] w-[80px] rounded-[10px] bg-white/10"
    />
  ))

  return (
    <Container className="mt-8 space-y-12 animate-pulse text-white/40">
      <section className="flex flex-col gap-6 lg:flex-row">
        {/* Gallery skeleton */}
        <div className="flex w-full flex-col gap-3 lg:w-[60%] lg:flex-row">
          <div className="flex flex-row gap-3 overflow-hidden lg:flex-col">
            {renderThumbnailSkeletons}
          </div>

          <div className="relative flex-1 rounded-[16px] bg-white/10">
            <div className="h-[420px] w-full rounded-[16px] bg-white/10 lg:h-[560px]" />
          </div>
        </div>

        {/* Infos skeleton */}
        <div className="w-full rounded-[16px] border border-white/10 bg-white/5 p-6 lg:sticky lg:top-[100px] lg:w-[30%]">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="h-5 w-32 rounded-full bg-white/10" />
              <div className="h-4 w-48 rounded-full bg-white/10" />
            </div>
            <div className="h-10 w-10 rounded-full bg-white/10" />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="h-6 w-24 rounded-full bg-white/10" />
            <span className="h-6 w-28 rounded-full bg-white/10" />
          </div>

          <div className="mt-6 space-y-3">
            <div className="h-3 w-full rounded-full bg-white/10" />
            <div className="h-3 w-[90%] rounded-full bg-white/10" />
            <div className="h-3 w-[85%] rounded-full bg-white/10" />
            <div className="h-3 w-[70%] rounded-full bg-white/10" />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <span
                key={`tag-skeleton-${index}`}
                className="h-6 w-16 rounded-full bg-white/10"
              />
            ))}
          </div>

          <hr className="my-6 border-none bg-white/10" />

          <div className="space-y-4">
            <div className="h-4 w-32 rounded-full bg-white/10" />
            <div className="flex gap-4">
              <div className="h-10 flex-1 rounded-full bg-white/10" />
              <div className="h-10 flex-1 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}

export default ArtworkDetailSkeleton

