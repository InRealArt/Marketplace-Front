import React from 'react'
import Link from 'next/link'

type CartFooterProps = {
  totalHT: number
  tva: number
  totalTTC: number
  onClose: () => void
}

export function CartFooter({ totalHT, tva, totalTTC, onClose }: CartFooterProps) {
  return (
    <div className="border-t border-[#6b6b66] p-6 bg-[#212224]">
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex items-center justify-between text-white text-sm">
          <span>Subtotal (Tax free)</span>
          <span>{totalHT} €</span>
        </div>
        <div className="flex items-center justify-between text-white text-sm">
          <span>VAT (20%)</span>
          <span>{tva} €</span>
        </div>
        <div className="flex items-center justify-between font-semibold text-white text-base mt-2 pt-2 border-t border-[#6b6b66]">
          <span>Total (Including VAT)</span>
          <span>{totalTTC} €</span>
        </div>
      </div>
      <Link
        href="/checkout"
        onClick={onClose}
        className={`block w-full py-3.5 text-center font-medium mb-4 transition-colors text-sm ${
          totalTTC === 0 
            ? 'bg-[#52524c] text-white/50 cursor-not-allowed opacity-50' 
            : 'bg-purple text-white cursor-pointer hover:bg-[#6052ff]'
        }`}
        style={totalTTC === 0 ? { pointerEvents: 'none' } : {}}
      >
        Checkout
      </Link>
      <button
        onClick={onClose}
        className="block w-full border border-purple text-white py-3.5 text-center font-medium cursor-pointer transition-colors hover:bg-purple/20 text-sm"
      >
        Continue shopping
      </button>
    </div>
  )
}

