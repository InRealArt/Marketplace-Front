'use client'
import React, { useMemo, useRef, useState, useEffect } from 'react'
import ListOfArtists from '@/components/List/ListOfArtists';
import { useArtistsStore } from '@/store/artistsStore';
import ArtistsHero from '@/components/artists/ArtistsHero';
import ArtistsFilter from '@/components/artists/ArtistsFilter';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import { ArtistWithRelations } from '@/types'
import ArtistCard from '@/components/Card/ArtistCard';

const PAGE_SIZE = 16 // 4 colonnes x 4 lignes

const Artists = () => {
  const { fetchArtists, artists } = useArtistsStore()
  console.log('artists', artists);

  useEffect(() => {
    if (artists.length === 0) {
      fetchArtists();
    }
  }, [artists.length, fetchArtists]);

  const [params, setParams] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    nationality: parseAsString.withDefault(''),
    q: parseAsString.withDefault('')
  })
  // Les artistes sont chargés par la page parente

  const filtered = useMemo(() => {
    // Filtre nationalité
    const byNation = params.nationality
      ? artists.filter(a => {
        const code = params.nationality.toUpperCase()
        return (
          (a.countryCode || '').toUpperCase() === code ||
          (a.countryName || a.Country?.name || '').toLowerCase() === params.nationality.toLowerCase()
        )
      })
      : artists

    // Filtre par nom (insensible à la casse)
    const query = params.q.trim().toLowerCase()
    const byName = query
      ? byNation.filter(a => a.name.toLowerCase().includes(query))
      : byNation

    return byName
  }, [artists, params.nationality, params.q])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const page = Math.min(params.page, totalPages)
  const start = (page - 1) * PAGE_SIZE
  const current = filtered.slice(start, start + PAGE_SIZE)

  const nationalities = useMemo(() => {
    const set = new Map<string, string>()
    artists.forEach(a => {
      if (a.countryCode || a.countryName) {
        const code = (a.countryCode || a.countryName || '').toUpperCase()
        const label = a.countryName || a.Country?.name || a.countryCode || ''
        if (!set.has(code)) set.set(code, label)
      }
    })
    return Array.from(set, ([code, label]) => ({ code, label }))
  }, [artists])
  return (
    <main>
      <ArtistsHero />
      <div className="m-auto mt-10">
        <ArtistsFilter
          nationalities={nationalities}
          params={params}
          setParams={setParams}
          artistsLength={current.length}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {current.map(a => (
            <ArtistCard key={a.id} artist={a} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Artists;
