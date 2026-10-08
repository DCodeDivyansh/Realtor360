import React, { useState } from 'react'
import { Search, MoreHorizontal, Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  'Home',
  'Developments',
  'Buildings',
  'Units',
  'Leads',
  'Companies',
  'Contacts',
  'Deals',
  'Activities',
  'Attorney Firms',
  'Reports',
]

interface NavbarProps {
  activeItem?: string
  onSelectItem?: (item: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({
  activeItem: controlledActiveItem,
  onSelectItem,
}) => {
  const [internalActive, setInternalActive] = useState('Home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const activeItem = controlledActiveItem ?? internalActive

  const handleSelect = (item: string) => {
    if (onSelectItem) {
      onSelectItem(item)
    } else {
      setInternalActive(item)
    }
    setMobileMenuOpen(false)
  }

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-40">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div
          onClick={() => handleSelect('Home')}
          className="flex items-center gap-2.5 shrink-0 cursor-pointer select-none"
        >
          <div className="w-7 h-7 flex items-center justify-center">
            {/* Custom Realtor 360 Emblem */}
            <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
              <path
                d="M6 22V12C6 8.68629 8.68629 6 12 6"
                stroke="#C99B30"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <path
                d="M12 26V16C12 12.6863 14.6863 10 18 10"
                stroke="#C99B30"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <path
                d="M18 26V18C18 16.3431 19.3431 15 21 15"
                stroke="#C99B30"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <path
                d="M24 26V20C24 18.8954 24.8954 18 26 18"
                stroke="#C99B30"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="font-extrabold text-base tracking-tight text-slate-800">
            REALTOR360
          </span>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden xl:flex items-center gap-1 overflow-x-auto no-scrollbar">
          {NAV_ITEMS.map((item) => {
            const isActive = activeItem === item
            return (
              <button
                key={item}
                onClick={() => handleSelect(item)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#C99B30] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item}
              </button>
            )
          })}
          <button
            title="More Options"
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </nav>

        {/* Right: Search Bar & Profile */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search..."
              className="w-40 md:w-48 pl-3.5 pr-8 py-1.5 text-xs bg-[#F2F4F7] text-slate-700 placeholder-slate-400 rounded-full focus:outline-none focus:ring-1 focus:ring-[#C99B30] border-none"
            />
            <Search className="w-3.5 h-3.5 text-slate-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* User Profile Avatar */}
          <div className="flex items-center">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
              alt="User Profile"
              className="w-8 h-8 rounded-full object-cover border border-slate-200 cursor-pointer hover:ring-2 hover:ring-[#C99B30]/30 transition-all"
            />
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-100 px-4 py-3 bg-white space-y-1 shadow-md">
          <div className="relative mb-3 sm:hidden">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-3.5 pr-8 py-2 text-xs bg-[#F2F4F7] text-slate-700 placeholder-slate-400 rounded-full focus:outline-none focus:ring-1 focus:ring-[#C99B30]"
            />
            <Search className="w-4 h-4 text-slate-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => handleSelect(item)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold text-left transition-colors cursor-pointer ${
                  activeItem === item
                    ? 'bg-[#C99B30] text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
