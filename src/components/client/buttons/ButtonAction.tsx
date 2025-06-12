'use client'

import React from 'react'

const ButtonAction = ({ text, onClick }: { text: string, onClick: () => void }) => {
  return (
    <button className="bg-[#6052ff] border border-solid rounded-lg px-6 py-2.5 text-[#f6f8ff] text-sm font-medium cursor-pointer hover:bg-[#5041ee] transition-colors">
        {text}
    </button>

  )
}

export default ButtonAction