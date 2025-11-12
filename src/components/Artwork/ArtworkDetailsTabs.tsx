'use client'
import React, { useState } from 'react'
import Tabs, { TabItem } from '@/components/Common/Tabs'
import { ItemPhysicalType } from '@/types'

interface ArtworkDetailsTabsProps {
  artwork: ItemPhysicalType
}

const ArtworkDetailsTabs = ({ artwork }: ArtworkDetailsTabsProps) => {
  const [activeTab, setActiveTab] = useState('information')

  const tabs: TabItem[] = [
    { id: 'information', label: 'Information' },
    { id: 'gallery', label: 'Gallery perspective' }
  ]

  const item = artwork.item || {}

  const medium = (item as any)?.medium?.name || 'Acrylic on Canvas'
  const support = 'Artwork on supported wooden frame. Framing on request.'
  const dimensions = `${(item as any)?.width ?? 80}x${(item as any)?.height ?? 80}cm`

  const detailItems = [
    `Medium : ${medium}`,
    `Other details : ${support}`,
    `Dimensions : ${dimensions}`
  ]

  const description =
    item.description ||
    'This artwork is a vibrant cry of intense emotions, capturing passion, strength, and bubbling energy through layered textures and luminous colors.'

  const galleryImages =
    item.secondaryImagesUrl && item.secondaryImagesUrl.length > 0
      ? item.secondaryImagesUrl
      : ['/images/Ekaterina/artist2.jpg', '/images/Boucheix/artist1.2.jpg', '/images/Leloluce/artist3.4.jpg']

  return (
    <div className="mt-8">
      <Tabs
        items={tabs}
        activeId={activeTab}
        onChange={setActiveTab}
        inactiveTabClassName="text-white/50 hover:text-white/80"
        indicatorClassName="bg-purple"
      />

      <div className="mt-6 bg-white/5 rounded-2xl border border-white/10 p-6 space-y-6">
        {activeTab === 'information' && (
          <div className="space-y-6 text-white/80">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">Artwork details</h3>
              <ul className="space-y-2 text-sm md:text-base">
                {detailItems.map(detail => (
                  <li key={detail} className="list-disc list-inside text-white/70">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xl md:text-2xl font-semibold text-white">About this artwork</h4>
              <p className="text-sm md:text-base leading-relaxed text-white/70">
                {description}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold text-white">Gallery perspective</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/5"
                >
                  <img
                    src={image}
                    alt={`Gallery view ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ArtworkDetailsTabs

