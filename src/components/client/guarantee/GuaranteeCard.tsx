import React from 'react'
import Image from 'next/image'

interface GuaranteeCardProps {
  title: string
  description: string
  secondaryDescription?: string
  bgImage: string
  frameImage: string
}

function GuaranteeCard({ title, description, bgImage, frameImage }: GuaranteeCardProps) {
  return (
    <div
      className="rounded-lg border-solid border-[#4d4d4d] border p-6 bg-auto bg-center h-auto " style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Image
        className="shrink-0 w-12 h-12 md:w-16 md:h-16 mb-4"
        src={frameImage}
        alt={title}
        width={64}
        height={64}
      />
      <div
        className="flex flex-col gap-0 items-start justify-start self-stretch shrink-0 relative"
      >
        <h1
          className="text-[#ffffff] text-left font-['BricolageGrotesque-Medium',_sans-serif] text-lg md:text-2xl font-medium relative self-stretch"
        >
          {title}
        </h1>
        <p
          className="text-[#ffffff] text-left font-['Montserrat-Medium',_sans-serif] text-sm md:text-base font-medium relative self-stretch"
        >
          {description}
        </p>
      </div>
    </div>
  )
}

export default GuaranteeCard