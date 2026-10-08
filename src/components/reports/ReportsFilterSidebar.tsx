import React from 'react'
import { Card } from '../ui/Card'
import type { ReportFilterState } from '../../types/report'

interface ReportsFilterSidebarProps {
  filters: ReportFilterState
  onFilterChange: (filters: ReportFilterState) => void
  onApplyFilters: () => void
  onResetFilters: () => void
}

export const ReportsFilterSidebar: React.FC<ReportsFilterSidebarProps> = ({
  filters,
  onFilterChange,
  onApplyFilters,
  onResetFilters,
}) => {
  const handleToggle = (value: string) => {
    const currentList = filters.categories || []
    const updated = currentList.includes(value)
      ? currentList.filter((item) => item !== value)
      : [...currentList, value]

    onFilterChange({
      ...filters,
      categories: updated,
    })
  }

  const categoryOptions = [
    'Leads Reports',
    'Deals Reports',
    'Sales Pipeline Reports',
    'Customer Reports',
    'Stacking Plan Reports',
    'Building Reports',
    'Development Reports',
    'Attorney Firm Reports',
    'Company Reports',
    'Activity Reports',
    'Custom Reports',
  ]

  return (
    <Card className="p-4 sm:p-5 w-full bg-white border border-slate-100 rounded-xl shadow-xs">
      {/* Header */}
      <div className="pb-3 mb-3 border-b border-slate-100">
        <h3 className="font-bold text-sm sm:text-base text-slate-800">Filters</h3>
      </div>

      {/* Category Section */}
      <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-1 no-scrollbar text-xs">
        <div className="pb-1">
          <h4 className="font-semibold text-slate-800 text-xs mb-2">
            Report Category
          </h4>

          <div className="space-y-1.5 pl-0.5">
            {categoryOptions.map((opt) => {
              const isChecked = filters.categories.includes(opt)
              return (
                <label
                  key={opt}
                  className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900 select-none py-0.5"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleToggle(opt)}
                    className="w-3.5 h-3.5 rounded border-slate-300 text-[#C99B30] focus:ring-[#C99B30] accent-[#C99B30]"
                  />
                  <span className="text-[11px] leading-tight text-slate-600">{opt}</span>
                </label>
              )
            })}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 pt-3 space-y-2 border-t border-slate-100">
        <button
          type="button"
          onClick={onApplyFilters}
          className="w-full py-1.5 rounded-md bg-[#C99B30] text-white text-xs font-semibold hover:bg-[#b58928] transition-colors shadow-2xs cursor-pointer text-center"
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={onResetFilters}
          className="w-full py-1.5 rounded-md border border-[#C99B30] text-[#C99B30] text-xs font-semibold hover:bg-amber-50/50 transition-colors cursor-pointer text-center"
        >
          Reset Filters
        </button>
      </div>
    </Card>
  )
}
