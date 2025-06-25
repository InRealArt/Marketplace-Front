'use client'

interface CategoryCardProps {
  name: string
  backgroundColor: string
  textColor?: string
}

export function CategoryCard({
  name,
  backgroundColor,
  textColor = '#6366f1'
}: CategoryCardProps) {
  return (
    <div
      className="category-card relative h-48 lg:h-56 cursor-pointer rounded-2xl overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Bottom image */}
      <div className="category-card__image-bottom">
        <img
          src="/images/category-background-2.jpg"
          alt="Category background 2"
          className="w-20 h-auto object-cover rounded-lg shadow-lg"
          draggable="false"
        />
      </div>
      {/* Top image */}
      <div className="category-card__image-top">
        <img
          src="/images/category-background-1.jpg"
          alt="Category background 1"
          className="w-20 h-auto object-cover rounded-lg shadow-lg"
          draggable="false"
        />
      </div>
      {/* Category Name - Top Left */}
      <div className="absolute top-6 left-6 z-30">
        <h3
          className="category-card__title font-medium text-xl lg:text-2xl leading-tight max-w-[60%] font-bricolage"
          style={{ color: textColor }}
        >
          {name}
        </h3>
      </div>
    </div>
  )
}
