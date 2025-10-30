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
  const {  name, surname, imageUrl, slug, countryName } = artist;
  return (
    <div className="rounded-xl overflow-hidden bg-cardBackground border border-white/10">
      <Link href={`/artists/${slug}`} className="block">
        <div
          className="h-52 md:h-64 w-full bg-center bg-cover"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </Link>
      <div className="p-4">
        {countryName ? (
          <div className="text-xs text-white/60">{countryName}</div>
        ) : null}
        <div className="mt-1 text-white font-semibold">{name} {surname}</div>
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