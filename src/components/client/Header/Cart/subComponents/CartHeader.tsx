import React from 'react'
import Image from 'next/image'

type CartHeaderProps = {
  onClose: () => void
}

export function CartHeader({ onClose }: CartHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-[#6b6b66]">
      <h2 className="text-lg font-semibold text-white">Your Cart</h2>
      <button
        onClick={onClose}
        className="p-2 rounded-full cursor-pointer hover:bg-[#6b6b66] transition-colors"
        aria-label="Close cart"
      >
        <Image
          src="/icons/Cross.png"
          alt="Close"
          width={20}
          height={20}
        />
      </button>
    </div>
  )
}

