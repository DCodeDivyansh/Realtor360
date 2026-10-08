import React, { useState } from 'react'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'
import { Card } from '../ui/Card'
import type { DevelopmentFilterState } from '../../types/developments'

interface FilterSidebarProps {
  filters: DevelopmentFilterState
  onFilterChange: (filters: DevelopmentFilterState) => void
  onApplyFilters: () => void
  onResetFilters: () => void
}

export const DevelopmentsFilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onApplyFilters,
  onResetFilters,
}) => {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const toggleSection = (section: string) => {
    setCollapsed((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleCheckboxToggle = (category: keyof DevelopmentFilterState, value: string) => {
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
      id: 'cities',
      title: 'City',
      options: ['Bengaluru', 'Mumbai', 'Pune', 'Delhi', 'Hyderabad'],
      key: 'cities' as const,
    },
    {
      id: 'types',
      title: 'Type',
      options: ['Villa', 'Apartment', 'Penthouse', 'Commercial'],
      key: 'types' as const,
    },
    {
      id: 'tags',
      title: 'Tags',
      options: ['Luxury', 'Premium', 'Affordable', 'Ready to Move'],
      key: 'tags' as const,
    },
    {
      id: 'attorneyFirms',
      title: 'Attorney Firm',
      options: ['Lex Associates', 'Prime Legal Partners', 'Apex Law Corp'],
      key: 'attorneyFirms' as const,
    },
    {
      id: 'noOfBuildings',
      title: 'No of Buildings',
      options: ['1', '2', '3', '4+'],
      key: 'noOfBuildings' as const,
    },
    {
      id: 'priceRanges',
      title: 'Starting Price',
      options: ['Below 50L', '50L - 1Cr', '1Cr - 2.5Cr', '2.5Cr+'],
      key: 'priceRanges' as const,
    },
  ]

  return (
    <Card className="p-4 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
        <h3 className="font-bold text-sm text-slate-800">Filters</h3>
      </div>

      {/* Filter Search Input */}
      <div className="relative mb-3">
        <input
          type="text"
          value={filters.searchQuery}
          onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
          placeholder="Search filters..."
          className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200/80 rounded-md text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C99B30]"
        />
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* Accordion Filter Sections */}
      <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-1 no-scrollbar text-xs">
        {filterSections.map((sec) => {
          const isCollapsed = collapsed[sec.id]
          const selectedValues = (filters[sec.key] as string[]) || []

          return (
            <div key={sec.id} className="border-b border-slate-100/80 pb-2.5">
              <button
                type="button"
                onClick={() => toggleSection(sec.id)}
                className="w-full flex items-center justify-between text-left py-1 font-semibold text-slate-700 hover:text-slate-900"
              >
                <span>{sec.title}</span>
                {isCollapsed ? (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>

              {!isCollapsed && (
                <div className="mt-1.5 space-y-1.5 pl-0.5">
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
                          className="w-3.5 h-3.5 rounded text-[#C99B30] focus:ring-[#C99B30] border-slate-300 accent-[#C99B30]"
                        />
                        <span className="text-[11px] leading-tight">{opt}</span>
                      </label>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-2 space-y-2 border-t border-slate-100">
        <button
          type="button"
          onClick={onApplyFilters}
          className="w-full py-1.5 rounded-md bg-[#C99B30] text-white text-xs font-semibold hover:bg-[#b58928] transition-colors shadow-2xs"
        >
          Apply Filter
        </button>
        <button
          type="button"
          onClick={onResetFilters}
          className="w-full py-1 text-center text-[11px] font-medium text-slate-500 hover:text-slate-800 transition-colors"
        >
          Reset Filter
        </button>
      </div>
    </Card>
  )
}
