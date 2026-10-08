import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export const Card: React.FC<CardProps> = ({ children, className = '', id }) => {
  return (
    <div
      id={id}
      className={`bg-white rounded-2xl border border-slate-100/90 shadow-[0_1px_4px_rgba(0,0,0,0.03)] ${className}`}
    >
      {children}
    </div>
  )
}
