import React, { useState } from 'react'
import { Plus, Search, SlidersHorizontal, LayoutGrid, ChevronDown, Star } from 'lucide-react'
import { Card } from '../ui/Card'
import type { ReportItem } from '../../types/report'

interface ReportsListProps {
  reports: ReportItem[]
  onSelectReport: (report: ReportItem) => void
  onToggleMobileFilter?: () => void
}

export const ReportsList: React.FC<ReportsListProps> = ({
  reports,
  onSelectReport,
  onToggleMobileFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    'rep-1': true,
    'rep-2': true,
    'rep-3': true,
    'rep-4': true,
    'rep-5': true,
    'rep-6': true,
  })

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const filtered = reports.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card className="p-4 sm:p-5 flex flex-col justify-between h-full bg-white border border-slate-100 rounded-xl shadow-xs">
      {/* Top Header & Sub-Bar */}
      <div className="space-y-4 mb-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-800">
          All Reports
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Create Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#C99B30] text-white text-xs font-semibold hover:bg-[#b58928] transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Report</span>
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
                placeholder="Search Report"
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

      {/* Reports Data Table */}
      <div className="overflow-x-auto no-scrollbar flex-1">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-600 font-semibold">
              <th className="py-3 px-3 font-semibold">Report Name</th>
              <th className="py-3 px-3 font-semibold">Description</th>
              <th className="py-3 px-3 font-semibold">Category</th>
              <th className="py-3 px-3 font-semibold">Last Run Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((report, idx) => {
              const isFav = !!favorites[report.id]
              return (
                <tr
                  key={`${report.id}-${idx}`}
                  onClick={() => onSelectReport(report)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  {/* Report Name with Star Icon */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={(e) => toggleFavorite(report.id, e)}
                        className="cursor-pointer"
                        title={isFav ? 'Favorited' : 'Add to favorites'}
                      >
                        <Star
                          className={`w-3.5 h-3.5 transition-colors ${
                            isFav
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-300 hover:text-amber-400'
                          }`}
                        />
                      </button>
                      <span className="font-semibold text-slate-800 group-hover:text-[#C99B30] transition-colors whitespace-nowrap">
                        {report.name}
                      </span>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="py-3.5 px-3 text-slate-500 max-w-md truncate">
                    {report.description}
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-3 text-slate-700 font-medium whitespace-nowrap">
                    {report.category}
                  </td>

                  {/* Last Run Date */}
                  <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">
                    {report.lastRunDate}
                  </td>
                </tr>
              )
            })}
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
