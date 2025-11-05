import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <section className={`max-w-screen desktop:max-w-[1414px] mx-auto mt-[80px] 2xl:mt-[120px] ${className}`}>
      {children}
    </section>
  )
}
