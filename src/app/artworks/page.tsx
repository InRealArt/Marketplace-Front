import React from 'react'
import ListOfItems from '@/components/List/ListOfItems'
import Container from '@/components/Common/Container'

const Artworks = () => {
  return (
    <Container>
      <main className="min-h-screen w-full">
        <div className="w-full px-4 md:px-6 lg:px-8">
          <h2 className="text-[70px] font-medium leading-[78px] tracking-[-1.5px] max-desktop:text-[32px] max-desktop:leading-[40px] mb-6">
            Available Artworks</h2>
          <ListOfItems />
        </div>
      </main>
    </Container>
  )
}

export default Artworks
