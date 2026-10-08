import React from 'react'

interface AvatarGroupProps {
  avatars: string[]
  countBadge?: string | number
  size?: 'sm' | 'md'
  className?: string
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  countBadge,
  size = 'sm',
  className = '',
}) => {
  const sizeClasses = size === 'sm' ? 'w-6 h-6 text-[10px]' : 'w-7 h-7 text-xs'

  return (
    <div className={`flex items-center -space-x-1.5 ${className}`}>
      {avatars.map((avatar, idx) => (
        <img
          key={idx}
          src={avatar}
          alt={`User ${idx + 1}`}
          className={`${sizeClasses} rounded-full object-cover border-2 border-white ring-0 shadow-xs`}
        />
      ))}
      {countBadge && (
        <span
          className={`flex items-center justify-center ${sizeClasses} rounded-full bg-slate-200 text-slate-700 font-semibold border-2 border-white shadow-xs z-10 px-1`}
        >
          {typeof countBadge === 'number' ? `+${countBadge}` : countBadge}
        </span>
      )}
    </div>
  )
}
