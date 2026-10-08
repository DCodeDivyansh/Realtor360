import React, { useState } from 'react'
import { Plus, Search, SlidersHorizontal, LayoutGrid, ChevronDown } from 'lucide-react'
import { Card } from '../ui/Card'
import type { DealItem, DealStatus } from '../../types/deal'

interface DealsListProps {
  deals: DealItem[]
  onSelectDeal: (deal: DealItem) => void
  onToggleMobileFilter?: () => void
}

export const DealsList: React.FC<DealsListProps> = ({
  deals,
  onSelectDeal,
  onToggleMobileFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = deals.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.development.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.dealValue.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const renderStatusBadge = (status: DealStatus) => {
    switch (status) {
      case 'Closed Won':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-md border border-emerald-400 bg-emerald-50 text-emerald-600 text-[11px] font-medium">
            Closed Won
          </span>
        )
      case 'Under Review':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-md border border-amber-300 bg-amber-50 text-amber-600 text-[11px] font-medium">
            Under Review
          </span>
        )
      case 'Closed Lost':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-md border border-rose-300 bg-rose-50 text-rose-500 text-[11px] font-medium">
            Closed Lost
          </span>
        )
      case 'In Progress':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-md border border-blue-300 bg-blue-50 text-blue-600 text-[11px] font-medium">
            In Progress
          </span>
        )
    }
  }

  return (
    <Card className="p-4 sm:p-5 flex flex-col justify-between h-full bg-white border border-slate-100 rounded-xl shadow-xs">
      {/* Top Header & Sub-Bar */}
      <div className="space-y-4 mb-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-800">
          All Deals
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Create Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#C99B30] text-white text-xs font-semibold hover:bg-[#b58928] transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Deal</span>
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
                placeholder="Search Deal"
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

      {/* Deals Data Table */}
      <div className="overflow-x-auto no-scrollbar flex-1">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-600 font-semibold">
              <th className="py-3 px-3 font-semibold">Deal Name</th>
              <th className="py-3 px-3 font-semibold">Deal Owner</th>
              <th className="py-3 px-3 font-semibold">Development</th>
              <th className="py-3 px-3 font-semibold">Unit</th>
              <th className="py-3 px-3 font-semibold">Status</th>
              <th className="py-3 px-3 font-semibold">Deal Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((deal, idx) => (
              <tr
                key={`${deal.id}-${idx}`}
                onClick={() => onSelectDeal(deal)}
                className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
              >
                <td className="py-3 px-3 font-semibold text-slate-800 group-hover:text-[#C99B30] transition-colors whitespace-nowrap">
                  {deal.name}
                </td>
                <td className="py-3 px-3 text-slate-700 font-medium whitespace-nowrap">
                  {deal.owner}
                </td>
                <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                  {deal.development}
                </td>
                <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                  {deal.unit}
                </td>
                <td className="py-3 px-3 whitespace-nowrap">
                  {renderStatusBadge(deal.status)}
                </td>
                <td className="py-3 px-3 text-slate-800 font-semibold whitespace-nowrap">
                  {deal.dealValue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
