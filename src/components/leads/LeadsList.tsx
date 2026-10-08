import React, { useState } from 'react'
import { Plus, Search, SlidersHorizontal, LayoutGrid, ChevronDown, X } from 'lucide-react'
import { Card } from '../ui/Card'
import type { LeadItem } from '../../types/lead'

interface LeadsListProps {
  leads: LeadItem[]
  onSelectLead: (lead: LeadItem) => void
  onToggleMobileFilter?: () => void
}

export const LeadsList: React.FC<LeadsListProps> = ({
  leads,
  onSelectLead,
  onToggleMobileFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.owner.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card className="p-4 sm:p-5 flex flex-col justify-between h-full bg-white border border-slate-100 rounded-xl shadow-xs">
      {/* Top Header & Sub-Bar */}
      <div className="space-y-4 mb-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-800">
          Leads
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Create Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#C99B30] text-white text-xs font-semibold hover:bg-[#b58928] transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Lead</span>
            </button>

            {onToggleMobileFilter && (
              <button
                onClick={onToggleMobileFilter}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>
            )}
          </div>

          {/* Search, Layout Grid, Actions Dropdown */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Lead"
                className="w-48 sm:w-56 pl-3 pr-8 py-1.5 text-xs bg-white border border-slate-200 rounded-md text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C99B30]"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <button
              type="button"
              title="Toggle view"
              className="p-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-slate-600" />
            </button>

            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>Actions</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Leads Rows List */}
      <div className="space-y-3 flex-1">
        {filtered.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            onClick={() => onSelectLead(item)}
            className="p-3 sm:p-3.5 rounded-xl border border-slate-100 bg-white hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-3 group"
          >
            {/* Left: Avatar + Name + Email */}
            <div className="flex items-center gap-3 shrink-0 lg:w-[220px]">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0 group-hover:ring-2 group-hover:ring-[#C99B30]/30 transition-all"
              />
              <div className="min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-[#C99B30] transition-colors truncate">
                  {item.name}
                </h4>
                <p className="text-[11px] text-slate-400 font-normal truncate">
                  Email: {item.email}
                </p>
              </div>
            </div>

            {/* Middle: Horizontal details separated by vertical divider lines */}
            <div className="flex flex-wrap lg:flex-nowrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 flex-1 border-t lg:border-t-0 border-slate-100 pt-2 lg:pt-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-400">Lead Source:</span>
                <span className="font-medium text-slate-700 text-[11px]">{item.source}</span>
              </div>
              <span className="hidden lg:inline text-slate-300">|</span>

              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-400">Lead Status:</span>
                <span className="font-medium text-slate-700 text-[11px]">{item.status}</span>
              </div>
              <span className="hidden lg:inline text-slate-300">|</span>

              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-400">Lead Category:</span>
                <span className="font-medium text-slate-700 text-[11px]">{item.category}</span>
              </div>
              <span className="hidden lg:inline text-slate-300">|</span>

              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-400">Lead Owner:</span>
                <span className="font-medium text-slate-700 text-[11px]">{item.owner}</span>
              </div>
            </div>

            {/* Far Right: Dark Circular Close/Options icon */}
            <div className="self-end lg:self-center shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                }}
                className="w-5 h-5 rounded-full bg-slate-800 hover:bg-slate-900 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Dismiss or Options"
              >
                <X className="w-3 h-3 text-white stroke-[2.5]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer: < Prev 1 | 2 | 3 | Next > */}
      <div className="flex items-center justify-center pt-5 mt-4 border-t border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="text-slate-600 hover:text-slate-900 font-medium disabled:opacity-40 cursor-pointer flex items-center"
          >
            <span>&lt; Prev</span>
          </button>

          <span className="px-2 py-0.5 rounded border border-[#C99B30] text-[#C99B30] font-bold">
            1
          </span>
          <span className="text-slate-300">|</span>

          <button
            onClick={() => setCurrentPage(2)}
            className="text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
          >
            2
          </button>
          <span className="text-slate-300">|</span>

          <button
            onClick={() => setCurrentPage(3)}
            className="text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
          >
            3
          </button>

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            className="text-slate-600 hover:text-slate-900 font-medium cursor-pointer flex items-center"
          >
            <span>Next &gt;</span>
          </button>
        </div>
      </div>
    </Card>
  )
}
