import React, { useState } from 'react'
import { Card } from '../ui/Card'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'
import type { ContactFilterState } from '../../types/contact'

interface ContactsFilterSidebarProps {
  filters: ContactFilterState
  onFilterChange: (filters: ContactFilterState) => void
  onApplyFilters: () => void
  onResetFilters: () => void
}

export const ContactsFilterSidebar: React.FC<ContactsFilterSidebarProps> = ({
  filters,
  onFilterChange,
  onApplyFilters,
  onResetFilters,
}) => {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const toggleSection = (sec: string) => {
    setCollapsed((prev) => ({ ...prev, [sec]: !prev[sec] }))
  }

  const handleCheckboxToggle = (category: keyof ContactFilterState, value: string) => {
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
      id: 'status',
      title: 'Status',
      options: ['Active', 'In Progress', 'Converted', 'Cold', 'Not Interested'],
      key: 'statuses' as const,
    },
    {
      id: 'role',
      title: 'Role',
      options: ['Buyer', 'Seller', 'Investor', 'Broker'],
      key: 'roles' as const,
    },
    {
      id: 'assignedTo',
      title: 'Assigned To',
      options: ['Jessica', 'Mohit', 'Arjun', 'Emily'],
      key: 'assignedTo' as const,
    },
    {
      id: 'city',
      title: 'City',
      options: ['Bengaluru', 'Pune', 'Mumbai', 'Hyderabad', 'Delhi'],
      key: 'cities' as const,
    },
    {
      id: 'leadSource',
      title: 'Lead Source',
      options: ['Website Form', 'Referral', 'Facebook Ads', 'Walk-in', 'Email Campaign'],
      key: 'leadSources' as const,
    },
  ]

  return (
    <Card className="p-4 w-full">
      {/* Header */}
      <div className="pb-2.5 mb-2 border-b border-slate-100">
        <h3 className="font-bold text-sm text-slate-800">Filters</h3>
      </div>

      {/* Search by Contact Name Input */}
      <div className="relative mb-3">
        <input
          type="text"
          value={filters.searchQuery}
          onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
          placeholder="Search by Contact name"
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
                className="w-full flex items-center justify-between text-left py-1 font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
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
          className="w-full py-1.5 rounded-md bg-[#C99B30] text-white text-xs font-semibold hover:bg-[#b58928] transition-colors shadow-2xs cursor-pointer"
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={onResetFilters}
          className="w-full py-1 text-center text-[11px] font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          Reset Filters
        </button>
      </div>
    </Card>
  )
}
