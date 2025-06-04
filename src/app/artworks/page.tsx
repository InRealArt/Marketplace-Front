'use client'
import React from 'react'
import ListOfItems from '@/components/List/ListOfItems'

const Artworks = () => {
  return (
    <main className="min-h-screen w-full">
      <div className="w-full px-4 md:px-6 lg:px-8 pt-[120px]">
        <h2 className="text-[70px] font-medium leading-[78px] tracking-[-1.5px] max-desktop:text-[32px] max-desktop:leading-[40px] mb-6">
          Available Artworks</h2>
        <ListOfItems />
      </div>
    </main>
  )
}

export default Artworks
