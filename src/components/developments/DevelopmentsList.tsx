import React, { useState } from 'react'
import { Plus, Search, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react'
import { Card } from '../ui/Card'
import type { DevelopmentItem } from '../../types/developments'

interface DevelopmentsListProps {
  developments: DevelopmentItem[]
  onSelectDevelopment: (development: DevelopmentItem) => void
  onToggleMobileFilter?: () => void
}

export const DevelopmentsList: React.FC<DevelopmentsListProps> = ({
  developments,
  onSelectDevelopment,
  onToggleMobileFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = developments.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card className="p-4 sm:p-5 flex flex-col justify-between h-full">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-800">
            Developments
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Showing {filtered.length} developments
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile filter toggle */}
          {onToggleMobileFilter && (
            <button
              onClick={onToggleMobileFilter}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          )}

          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search developments..."
              className="w-48 sm:w-56 pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200/90 rounded-md text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C99B30]"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Add Development Button */}
          <button
            type="button"
            className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#C99B30] text-white text-xs font-semibold hover:bg-[#b58928] transition-colors shadow-2xs whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Development</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto no-scrollbar flex-1">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-500 font-semibold bg-slate-50/70">
              <th className="py-2.5 px-3 font-semibold rounded-l-md">Name</th>
              <th className="py-2.5 px-3 font-semibold">Type</th>
              <th className="py-2.5 px-3 font-semibold">City</th>
              <th className="py-2.5 px-3 font-semibold">Attorney Firm Name</th>
              <th className="py-2.5 px-3 font-semibold text-center">No of Buildings</th>
              <th className="py-2.5 px-3 font-semibold text-right rounded-r-md">Starting Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((item) => (
              <tr
                key={item.id}
                onClick={() => onSelectDevelopment(item)}
                className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
              >
                {/* Name + thumbnail + address */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-md object-cover border border-slate-100 shadow-2xs shrink-0 group-hover:ring-1 group-hover:ring-[#C99B30]/40 transition-all"
                    />
                    <div>
                      <h4 className="font-bold text-slate-800 group-hover:text-[#C99B30] transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-normal">
                        {item.address.street}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Type */}
                <td className="py-3 px-3 text-slate-600 font-medium">
                  {item.type}
                </td>

                {/* City */}
                <td className="py-3 px-3 text-slate-600">
                  {item.city}
                </td>

                {/* Attorney Firm */}
                <td className="py-3 px-3 text-slate-700 font-medium">
                  {item.attorneyFirm}
                </td>

                {/* No of Buildings */}
                <td className="py-3 px-3 text-slate-700 text-center font-semibold">
                  {item.noOfBuildings}
                </td>

                {/* Starting Price */}
                <td className="py-3 px-3 text-right font-bold text-slate-800 whitespace-nowrap">
                  {item.startingPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-100 text-xs text-slate-500">
        <span>Showing 1 to {filtered.length} of {filtered.length} entries</span>

        <div className="flex items-center gap-1.5">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="flex items-center gap-0.5 px-2.5 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          <span className="px-2.5 py-1 rounded bg-[#C99B30] text-white font-semibold">
            1
          </span>
          <button className="px-2.5 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50">
            2
          </button>
          <span className="px-1 text-slate-400">...</span>
          <button className="px-2.5 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50">
            10
          </button>

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            className="flex items-center gap-0.5 px-2.5 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </Card>
  )
}
