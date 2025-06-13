import React from 'react'
import GuaranteeCard from './GuaranteeCard'

function Guarantees() {
  const guaranteesData = [
    {
      title: 'Free Return',
      description: 'Up to 30 days after delivery',
      bgImage: '/icons/bg_card_guarantee.svg',
      frameImage: '/icons/world_little.svg'
    },
    {
      title: 'International Shipping',
      description: 'Professional home delivery',
      bgImage: '/icons/bg_card_guarantee.svg',
      frameImage: '/icons/world_little.svg'
    },
    {
      title: 'Excellent Reviews',
      description: 'By artists and collectors',
      bgImage: '/icons/bg_card_guarantee.svg',
      frameImage: '/icons/world_little.svg'
    },
    {
      title: 'Secure Payments',
      description: 'By credit card, wire transfer or in installments',
      bgImage: '/icons/bg_card_guarantee.svg',
      frameImage: '/icons/world_little.svg'
    }
  ]

  return (
    <div
      className="pt-20 pb-20 flex flex-row gap-4 items-center justify-start self-stretch shrink-0 relative"
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