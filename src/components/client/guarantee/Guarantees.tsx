import React from 'react'
import GuaranteeCard from './GuaranteeCard'

function Guarantees() {
  const guaranteesData = [
    {
      title: 'Free Return',
      description: 'Up to 30 days after delivery',
      bgImage: '/images/bg_hero.svg',
      frameImage: '/icons/world_little.svg'
    },
    {
      title: 'International Shipping',
      description: 'Professional home delivery',
      bgImage: '/images/bg_hero.svg',
      frameImage: '/icons/world_little.svg'
    },
    {
      title: 'Excellent Reviews',
      description: 'By artists and collectors',
      bgImage: '/images/bg_hero.svg',
      frameImage: '/icons/world_little.svg'
    },
    {
      title: 'Secure Payments',
      description: 'By credit card, wire transfer or in installments',
      bgImage: '/images/bg_hero.svg',
      frameImage: '/icons/world_little.svg'
    }
  ]

  return (
    <div
      className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-[10rem] font-montserrat"
    >
      {guaranteesData.map((guarantee, index) => (
        <GuaranteeCard
          key={index}
          title={guarantee.title}
          description={guarantee.description}
          bgImage={guarantee.bgImage}
          frameImage={guarantee.frameImage}
        />
      ))}
    </div>
  )
}

export default Guarantees 