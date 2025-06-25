'use client'

import React from 'react'

interface ArtworkCardProps {
  artistName: string;
  artworkName: string;
  price: number;
  dimensions: string;
  technique: string;
  imageUrl?: string;
  onClick?: () => void;
}

export default function ArtworkCard({
  artistName,
  artworkName,
  price,
  dimensions,
  technique,
  imageUrl = '/images/category-background-1.jpg',
  onClick
}: ArtworkCardProps) {
  return (
    <div className="group cursor-pointer bg-[#1B1C1E]  p-2.5 border border-[#4D4D4D] rounded-md" onClick={onClick}>
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4">
        <img
          src={imageUrl}
          alt={artworkName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-400 text-sm">{artistName}</p>
            <h3 className="text-white font-medium">{artworkName}</h3>
          </div>
          <span className="text-white font-medium">{price} €</span>
        </div>
        <p className="text-gray-400 text-sm">{technique} · {dimensions}</p>
      </div>
    </div>
  );
}
