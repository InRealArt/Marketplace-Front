import React from 'react'

const ArtworkGridTitle = ({ title }: { title: string }) => {
  return (
    <div className="border-solid border-[#666565] border-t border-b p-2.5 flex flex-row gap-2.5 items-center justify-center self-stretch shrink-0 h-[90px] relative">
        <div className="text-[#ffffff] text-left font-['BricolageGrotesque-Medium',_sans-serif] text-2xl font-medium relative">
            {title}
        </div>
    </div>

  )
}

export default ArtworkGridTitle