'use client'
import React from 'react'
import Tabs, { TabItem } from '@/components/Common/Tabs'
import { Grid, Building2, ZoomIn } from 'lucide-react'

export type ArtworkGalleryTab = 'artwork' | 'in-room'

interface ArtworkGalleryTabsProps {
  activeTab: ArtworkGalleryTab
  onTabChange: (tab: ArtworkGalleryTab) => void
  onZoom: () => void
}

const ArtworkGalleryTabs = ({
  activeTab,
  onTabChange,
  onZoom
}: ArtworkGalleryTabsProps) => {
  const tabs: TabItem[] = [
    { id: 'artwork', label: 'Artwork', icon: <Grid size={18} /> },
    { id: 'in-room', label: 'In a room', icon: <Building2 size={18} /> }
  ]

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <Tabs
        items={tabs}
        activeId={activeTab}
        onChange={(tabId) => onTabChange(tabId as ArtworkGalleryTab)}
        inactiveTabClassName="text-white/50 hover:text-white/80"
        indicatorClassName="bg-purple"
      />

      <button
        type="button"
        onClick={onZoom}
        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 text-white px-4 py-2 text-sm hover:bg-white/15 transition-colors"
        aria-label="Open zoom gallery"
      >
        <ZoomIn size={16} />
        Zoom
      </button>
    </div>
  )
}

export default ArtworkGalleryTabs

