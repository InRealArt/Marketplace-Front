import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArtistWithRelations } from '@/types';
import { useItemsStore } from '@/store/itemsStore';

interface ArtistCardProps {
  artist: ArtistWithRelations;
  showFollowButton?: boolean;
}

const ArtistCard = ({ artist, showFollowButton = false }: ArtistCardProps) => {
  const {  name, surname, imageUrl, slug, country } = artist;
  
  return (
    <div className="rounded-xl overflow-hidden bg-cardBackground border border-white/10">
      <Link href={`/artists/${slug}`} className="block">
        <div
          className="h-40 md:h-80 w-full bg-top bg-cover"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </Link>
      <div className="p-4">
        <div className="mt-1 text-white text-sm font-semibold">{name} {surname}</div>
        <div className="mt-1 text-white text-xs font-semibold">Painter <span className="text-white/60 text-xs">{country?.code && `| ${country?.name}`}</span></div>

        {showFollowButton ? (
          <div className="mt-3">
            <button className="px-4 py-1.5 text-sm rounded-full bg-white/10 text-white hover:bg-white/20 transition">Suivre +</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ArtistCard; 