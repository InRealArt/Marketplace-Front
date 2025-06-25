'use client'

import { CategoryCard } from './CategoryCard'
import { SectionTitle } from './SectionTitle'

export default function CategoriesSection() {
  const categories = [
    { name: 'Abstrait', backgroundColor: '#c7b9ff', textColor: '#6366f1' },
    { name: 'Paysages', backgroundColor: '#a7f3d0', textColor: '#10b981' },
    { name: 'Portraits', backgroundColor: '#fef3c7', textColor: '#f59e0b' },
    { name: 'Grandes peintures', backgroundColor: '#c7b9ff', textColor: '#6366f1' },
    { name: 'Abstrait', backgroundColor: '#fef3c7', textColor: '#f59e0b' },
    { name: 'Le choix des collectionneurs', backgroundColor: '#e0e7ff', textColor: '#6366f1' },
    { name: 'Artistes célèbres', backgroundColor: '#fecaca', textColor: '#ef4444' },
    { name: 'Dernières ventes', backgroundColor: '#fed7aa', textColor: '#f97316' },
  ]

  return (
    <section className="w-full mx-auto mt-[10rem]">
        {/* Section Title */}
        <SectionTitle 
          title="Catégories les plus populaires"
          subtitle="Bienvenu chez Inrealart : des oeuvres inspirantes et sélectionnées par nos experts."
          showButton={true}
          buttonText="Voir toutes nos catégories"
          buttonHref="/categories"
        />

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-3">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              name={category.name}
              backgroundColor={category.backgroundColor}
              textColor={category.textColor}
            />
          ))}
        </div>
    </section>
  )
}
