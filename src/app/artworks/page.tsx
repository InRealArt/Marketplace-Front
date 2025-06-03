'use client'
import React from 'react'
import ListOfItems from '@/components/List/ListOfItems'

const Artworks = () => {
  return (
    <main className="Artworks">
      <div className="container">
        <h2 className="text-[70px] font-medium leading-[78px] tracking-[-1.5px] max-desktop:text-[32px] max-desktop:leading-[40px]">
          Available Artworks</h2>
        <ListOfItems />
      </div>
    </main>
  )
}

export default Artworks
