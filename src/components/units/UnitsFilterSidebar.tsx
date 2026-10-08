import React from 'react'
import { Card } from '../ui/Card'
import type { UnitFilterState } from '../../types/unit'

interface UnitsFilterSidebarProps {
  filters: UnitFilterState
  onFilterChange: (filters: UnitFilterState) => void
  onApplyFilters: () => void
  onResetFilters: () => void
}

export const UnitsFilterSidebar: React.FC<UnitsFilterSidebarProps> = ({
  filters,
  onFilterChange,
  onApplyFilters,
  onResetFilters,
}) => {
  const handleToggle = (
    category: keyof UnitFilterState,
    value: string
  ) => {
    const currentList = (filters[category] as string[]) || []
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
      id: 'development',
      title: 'Development',
      options: ['Sunrise Enclave', 'Green Heights', 'Ocean Pearl', 'Eden Greens'],
      key: 'developments' as const,
    },
    {
      id: 'building',
      title: 'Building',
      options: ['Aster Tower', 'Orchid Heights', 'Lotus Crest'],
      key: 'buildings' as const,
    },
    {
      id: 'status',
      title: 'Status',
      options: ['Active', 'Sold', 'Booked', 'Under Construction', 'Ready to Move'],
      key: 'statuses' as const,
    },
    {
      id: 'unitType',
      title: 'Unit Type',
      options: ['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Penthouse', 'Studio'],
      key: 'unitTypes' as const,
    },
    {
      id: 'areaRange',
      title: 'Area Range (sqft)',
      options: ['0-1000', '1001-1500', '1501-2000', '2001-2500', '2500+'],
      key: 'areaRanges' as const,
    },
    {
      id: 'priceRange',
      title: 'Price Range',
      options: ['< 50L', '50L - 1Cr', '1Cr - 2Cr', '2Cr - 3Cr', '3Cr+'],
      key: 'priceRanges' as const,
    },
    {
      id: 'facing',
      title: 'Facing',
      options: ['East', 'West', 'North', 'South'],
      key: 'facings' as const,
    },
  ]

  return (
    <Card className="p-4 sm:p-5 w-full bg-white border border-slate-100 rounded-xl shadow-xs">
      {/* Header */}
      <div className="pb-3 mb-3 border-b border-slate-100">
        <h3 className="font-bold text-sm sm:text-base text-slate-800">Filters</h3>
      </div>

      {/* Filter Sections */}
      <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-1 no-scrollbar text-xs">
        {filterSections.map((sec) => {
          const selectedValues = (filters[sec.key] as string[]) || []

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
                        onChange={() => handleToggle(sec.key, opt)}
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
