'use client'

import { useState } from 'react';
import SectionNavigation from './SectionNavigation';
import ArtworkCard from '../artwork/ArtworkCard';
import { SectionTitle } from '../categories/SectionTitle';

const navigationItems = [
  { id: 'curators', label: 'Sélection de nos curateurs' },
  { id: 'pixelated', label: 'Peintures pixellisées' },
  { id: 'golden', label: 'Teintes dorées' },
];

export default function SelectionSection() {
  const [activeTab, setActiveTab] = useState('curators');

  // Mock data - replace with real data later
  const artworks = [
    {
      artistName: 'Artiste',
      artworkName: 'Nom de l\'oeuvre',
      price: 1450,
      dimensions: '60 x 45cm',
      technique: 'Lithographie sur papier',
    },
    {
      artistName: 'Artiste',
      artworkName: 'Nom de l\'oeuvre',
      price: 1450,
      dimensions: '60 x 45cm',
      technique: 'Lithographie sur papier',
    },
    {
      artistName: 'Artiste',
      artworkName: 'Nom de l\'oeuvre',
      price: 1450,
      dimensions: '60 x 45cm',
      technique: 'Lithographie sur papier',
    },
  ];

  return (
    <section className='mt-[10rem]'>
        <SectionTitle
          title="Notre sélection du moment"
          subtitle="Bienvenu chez Inrealart : des oeuvres inspirantes et sélectionnées par nos experts."
          showButton
          buttonText="Explorez nos oeuvres"
          buttonHref="/artworks"
        />

        <SectionNavigation
          items={navigationItems.map(item => ({
            ...item,
            isActive: item.id === activeTab
          }))}
          onSelect={setActiveTab}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-montserrat">
          {artworks.map((artwork, index) => (
            <ArtworkCard key={index} {...artwork} />
          ))}
        </div>
    </section>
  );
} 