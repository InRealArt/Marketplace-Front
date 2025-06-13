import React from 'react'

interface GuaranteeCardProps {
  title: string
  description: string
  secondaryDescription?: string
  bgImage: string
  frameImage: string
}

function GuaranteeCard({ title, description, secondaryDescription, bgImage, frameImage }: GuaranteeCardProps) {
  return (
    <div
      className="bg-[#1b1c1e] rounded-lg border-solid border-[#4d4d4d] border p-2.5 flex flex-col gap-2 items-start justify-start shrink-0 w-[298.25px] h-[161px] relative overflow-hidden"
    >
      <img
        className="shrink-0 w-[1725px] h-[1725px] absolute left-[-487px] top-[-40px] overflow-visible"
        src={bgImage}
      />
      <img
        className="shrink-0 w-16 h-16 relative overflow-visible"
        src={frameImage}
      />
      <div
        className="flex flex-col gap-0 items-start justify-start self-stretch shrink-0 relative"
      >
        <div
          className="text-[#ffffff] text-left font-['BricolageGrotesque-Medium',_sans-serif] text-2xl font-medium relative self-stretch"
        >
          {title}
        </div>
        <div
          className="text-[#ffffff] text-left font-['Montserrat-Medium',_sans-serif] text-base font-medium relative self-stretch"
        >
          {description}
        </div>
        {secondaryDescription && (
          <div
            className="text-[#ffffff] text-left font-['Montserrat-Medium',_sans-serif] text-sm font-medium relative self-stretch opacity-80"
          >
            {secondaryDescription}
          </div>
        )}
      </div>
    </div>
  )
}

export default GuaranteeCard