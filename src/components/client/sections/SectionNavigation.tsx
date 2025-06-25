'use client'

import { useRef } from 'react';

interface NavigationItem {
  id: string;
  label: string;
  isActive?: boolean;
}

interface SectionNavigationProps {
  items: NavigationItem[];
  onSelect?: (id: string) => void;
}

export default function SectionNavigation({ items, onSelect }: SectionNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const setIndicatorPosition = (button: HTMLButtonElement) => {
    const container = containerRef.current;
    const indicator = indicatorRef.current;

    if (container && indicator) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();

      const left = buttonRect.left - containerRect.left;
      const width = buttonRect.width;

      // Update CSS custom properties for pure CSS animation
      indicator.style.setProperty('--indicator-width', `${width}px`);
      indicator.style.setProperty('--indicator-left', `${left}px`);
    }
  };

  const handleClick = (id: string, event: React.MouseEvent<HTMLButtonElement>) => {
    setIndicatorPosition(event.currentTarget);
    onSelect?.(id);
  };

  const handleActiveButtonRef = (element: HTMLButtonElement | null) => {
    if (element) {
      // Set initial position for active button
      setTimeout(() => setIndicatorPosition(element), 0);
    }
  };

  return (
    <div className="relative mb-12">
      {/* Navigation buttons */}
      <div ref={containerRef} className="flex gap-12 pb-4">
        {items.map((item) => (
          <button
            key={item.id}
            ref={item.isActive ? handleActiveButtonRef : null}
            onClick={(e) => handleClick(item.id, e)}
            className={`text-sm md:text-lg font-medium py-3 px-2 transition-colors duration-200 ${item.isActive
                ? 'text-white'
                : 'text-gray-400 hover:text-gray-200'
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Background grey border */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D9D9D9] rounded-lg" />

      {/* Sliding purple indicator - Pure CSS animation */}
      <div
        ref={indicatorRef}
        className="absolute bottom-[-1.5px] h-[4px] bg-[#6052FF] transition-all duration-300 ease-in-out rounded-lg"
        style={{
          width: 'var(--indicator-width, 0px)',
          transform: 'translateX(var(--indicator-left, 0px))'
        }}
      />
    </div>
  );
} 