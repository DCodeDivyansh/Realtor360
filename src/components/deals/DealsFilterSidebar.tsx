import React from 'react'
import { Card } from '../ui/Card'
import type { DealFilterState } from '../../types/deal'

interface DealsFilterSidebarProps {
  filters: DealFilterState
  onFilterChange: (filters: DealFilterState) => void
  onApplyFilters: () => void
  onResetFilters: () => void
}

export const DealsFilterSidebar: React.FC<DealsFilterSidebarProps> = ({
  filters,
  onFilterChange,
  onApplyFilters,
  onResetFilters,
}) => {
  const handleCheckboxToggle = (category: 'owners' | 'statuses' | 'developments' | 'leadSources', value: string) => {
    const currentList = filters[category] || []
    const updated = currentList.includes(value)
      ? currentList.filter((item) => item !== value)
      : [...currentList, value]

    onFilterChange({
      ...filters,
      [category]: updated,
    })
  }

  const filterSections = [
    {
      id: 'dealOwner',
      title: 'Deal Owner',
      options: ['Jessica Chen', 'Evan Chris', 'Jack B.', 'Emily Paris'],
      key: 'owners' as const,
    },
    {
      id: 'status',
      title: 'Status',
      options: ['Closed Won', 'In Progress', 'Under Review', 'Closed Lost'],
      key: 'statuses' as const,
    },
    {
      id: 'development',
      title: 'Developments',
      options: ['Sunrise Villas', 'Palm Meadows', 'Green Acres', 'Urban Heights', 'Skyline Towers'],
      key: 'developments' as const,
    },
    {
      id: 'leadSource',
      title: 'Lead Source',
      options: ['Referral from Client', 'Social Media', 'Walk-in', 'Cold Call'],
      key: 'leadSources' as const,
    },
  ]

  return (
    <Card className="p-4 sm:p-5 w-full bg-white border border-slate-100 rounded-xl shadow-xs">
      {/* Header */}
      <div className="pb-3 mb-3 border-b border-slate-100">
        <h3 className="font-bold text-sm sm:text-base text-slate-800">Filters</h3>
      </div>

      {/* Filter Sections */}
      <div className="space-y-4 max-h-[calc(100vh-270px)] overflow-y-auto pr-1 no-scrollbar text-xs">
        {filterSections.map((sec) => {
          const selectedValues = filters[sec.key] || []

          return (
            <div key={sec.id} className="pb-1">
              <h4 className="font-semibold text-slate-800 text-xs mb-2">
                {sec.title}
              </h4>

              <div className="space-y-1.5 pl-0.5">
                {sec.options.map((opt) => {
                  const isChecked = selectedValues.includes(opt)
                  return (
                    <label
                      key={opt}
                      className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900 select-none py-0.5"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheckboxToggle(sec.key, opt)}
                        className="w-3.5 h-3.5 rounded border-slate-300 text-[#C99B30] focus:ring-[#C99B30] accent-[#C99B30]"
                      />
                      <span className="text-[11px] leading-tight text-slate-600">{opt}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          )
        })}

        {/* Deal Value Range */}
        <div className="pb-1 pt-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-slate-800 text-xs">Deal Value</h4>
            <span className="text-[10px] text-slate-500 font-medium">Up to Rs. {filters.maxValue} Cr</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.5"
            value={filters.maxValue}
            onChange={(e) => onFilterChange({ ...filters, maxValue: parseFloat(e.target.value) })}
            className="w-full accent-[#C99B30] cursor-pointer"
          />
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
