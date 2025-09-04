'use client'

import Link from 'next/link';
import React from 'react'

interface ArtworkCardProps {
  artistName: string;
  artworkName: string;
  price: number;
  dimensions: string;
  technique: string;
  imageUrl?: string;
  slug: string;
  onClick?: () => void;
}

export default function ArtworkCard({
  artistName,
  artworkName,
  price,
  slug,
  dimensions,
  technique,
  imageUrl = '/images/category-background-1.jpg',
  onClick
}: ArtworkCardProps) {
  return (
    <div className="p-6 border border-gray-300 rounded-lg bg-cardBackground relative">
    <Link href={`/artwork/${slug}`} className="block">
      <div className="bg-contain bg-center m-auto bg-no-repeat h-80 md:h-96 w-full rounded-lg" style={{ backgroundImage: ` url('${imageUrl}')` }} />
      <div className="mt-4">
        <p className="text-white font-medium text-lg">{artworkName}</p>
        <p className="text-white text-sm opacity-80">{artistName}</p>
        {price && (
          <p className="text-white text-sm opacity-80">{price}€</p>
        )}
      </div>
    </Link>
    
    <Link href={`/artwork/${slug}`} className="absolute bottom-6 right-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-500 rounded-lg text-white text-sm transition-colors duration-200 font-bricolage">
      See details
    </Link>
  </div>
  );
}
