import React, { useState } from 'react'
import { Plus, Search, ChevronLeft, ChevronRight, SlidersHorizontal, LayoutGrid, ChevronDown } from 'lucide-react'
import { Card } from '../ui/Card'
import type { AttorneyFirmItem } from '../../types/attorney'

interface AttorneyListProps {
  firms: AttorneyFirmItem[]
  onSelectFirm: (firm: AttorneyFirmItem) => void
  onToggleMobileFilter?: () => void
}

export const AttorneyList: React.FC<AttorneyListProps> = ({
  firms,
  onSelectFirm,
  onToggleMobileFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = firms.filter(
    (f) =>
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card className="p-4 sm:p-5 flex flex-col justify-between h-full">
      {/* Top Header & Sub-Bar */}
      <div className="space-y-4 mb-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-800">
          Attorney Firm
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Create Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#C99B30] text-white text-xs font-semibold hover:bg-[#b58928] transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Attorney Firm</span>
            </button>

            {onToggleMobileFilter && (
              <button
                onClick={onToggleMobileFilter}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors"
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
                placeholder="Search Attorney Firm"
                className="w-48 sm:w-56 pl-3 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-200/90 rounded-md text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C99B30]"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <button
              type="button"
              title="Toggle view"
              className="p-1.5 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>

            <button
              type="button"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 transition-colors"
            >
              <span>Actions</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto no-scrollbar flex-1">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-500 font-semibold bg-slate-50/70">
              <th className="py-2.5 px-3 font-semibold rounded-l-md">Firm Name</th>
              <th className="py-2.5 px-3 font-semibold">Email</th>
              <th className="py-2.5 px-3 font-semibold">Phone No.</th>
              <th className="py-2.5 px-3 font-semibold">City</th>
              <th className="py-2.5 px-3 font-semibold text-center rounded-r-md">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((item, idx) => {
              const isActive = item.status === 'Active'
              return (
                <tr
                  key={`${item.id}-${idx}`}
                  onClick={() => onSelectFirm(item)}
                  className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                >
                  {/* Firm Name */}
                  <td className="py-3 px-3 font-bold text-slate-800 group-hover:text-[#C99B30] transition-colors whitespace-nowrap">
                    {item.name}
                  </td>

                  {/* Email */}
                  <td className="py-3 px-3 text-slate-600">
                    {item.email}
                  </td>

                  {/* Phone No */}
                  <td className="py-3 px-3 text-slate-700 font-medium whitespace-nowrap">
                    {item.phone}
                  </td>

                  {/* City */}
                  <td className="py-3 px-3 text-slate-600">
                    {item.city}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-block px-3 py-0.5 rounded-full text-[11px] font-semibold border ${
                        isActive
                          ? 'bg-[#E7F8F1] text-[#10B981] border-[#A7F3D0]'
                          : 'bg-[#FDE8E8] text-[#E02424] border-[#FECACA]'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-center pt-4 mt-2 border-t border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="flex items-center gap-0.5 px-2.5 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          <span className="px-2.5 py-1 rounded bg-[#C99B30] text-white font-semibold">
            1
          </span>
          <button className="px-2.5 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">
            2
          </button>
          <button className="px-2.5 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">
            3
          </button>

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            className="flex items-center gap-0.5 px-2.5 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </Card>
  )
}
