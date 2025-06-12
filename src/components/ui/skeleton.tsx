import React from 'react'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-600 rounded ${className}`}
      style={{
        background: 'linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%)',
        backgroundSize: '200% 100%',
        animation: 'loading 1.5s infinite'
      }}
    >
      <style jsx>{`
        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  )
} 