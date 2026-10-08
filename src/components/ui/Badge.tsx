import React from 'react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

interface BadgeProps {
  children?: React.ReactNode
  variant?: 'positive' | 'negative' | 'available' | 'occupied' | 'sold-out' | 'count'
  text?: string
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'positive',
  text,
  className = '',
}) => {
  if (variant === 'positive') {
    return (
      <span
        className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#E7F8F1] text-[#10B981] ${className}`}
      >
        {text || children}
        <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
      </span>
    )
  }

  if (variant === 'negative') {
    return (
      <span
        className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FDE8E8] text-[#E02424] ${className}`}
      >
        {text || children}
        <ArrowDownRight className="w-3.5 h-3.5 stroke-[2.5]" />
      </span>
    )
  }

  if (variant === 'occupied' || variant === 'available') {
    return (
      <span
        className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold bg-[#E6FFFA] text-[#0D9488] whitespace-nowrap ${className}`}
      >
        {text || children}
      </span>
    )
  }

  if (variant === 'sold-out') {
    return (
      <span
        className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold bg-[#FEE2E2] text-[#DC2626] whitespace-nowrap ${className}`}
      >
        {text || children}
      </span>
    )
  }

  return (
    <span
      className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[11px] font-semibold bg-gray-200 text-gray-700 ${className}`}
    >
      {text || children}
    </span>
  )
}
