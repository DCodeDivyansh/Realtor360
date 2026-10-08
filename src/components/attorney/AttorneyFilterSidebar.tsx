import React, { useState } from 'react'
import { Card } from '../ui/Card'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { AttorneyFilterState } from '../../types/attorney'

interface AttorneyFilterSidebarProps {
  filters: AttorneyFilterState
  onFilterChange: (filters: AttorneyFilterState) => void
  onApplyFilters: () => void
  onResetFilters: () => void
}

export const AttorneyFilterSidebar: React.FC<AttorneyFilterSidebarProps> = ({
  filters,
  onFilterChange,
  onApplyFilters,
  onResetFilters,
}) => {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const toggleSection = (sec: string) => {
    setCollapsed((prev) => ({ ...prev, [sec]: !prev[sec] }))
  }

  const handleCheckboxToggle = (category: keyof AttorneyFilterState, value: string) => {
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
      id: 'city',
      title: 'City',
      options: ['Bengaluru', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad', 'Chennai', 'Ahmedabad'],
      key: 'cities' as const,
    },
    {
      id: 'status',
      title: 'Status',
      options: ['Active', 'Inactive'],
      key: 'statuses' as const,
    },
    {
      id: 'assignedDevelopments',
      title: 'Assigned Developments',
      options: ['Sunrise Enclave', 'Green Meadows', 'Orchid Grove', 'Vista Heights', 'Other'],
      key: 'assignedDevelopments' as const,
    },
    {
      id: 'services',
      title: 'Type of Service',
      options: [
        'Property Registration',
        'Legal Verification',
        'Title Due Diligence',
        'Agreement Drafting',
        'RERA Consultation',
      ],
      key: 'services' as const,
    },
    {
      id: 'clientsHandled',
      title: 'No. of Clients Handled',
      options: ['0-5', '6-10', '11-20', '21+'],
      key: 'clientsHandled' as const,
    },
  ]

  return (
    <Card className="p-4 w-full">
      {/* Header */}
      <div className="pb-2.5 mb-2 border-b border-slate-100">
        <h3 className="font-bold text-sm text-slate-800">Filters</h3>
      </div>

      {/* Accordion Filter Sections */}
      <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-1 no-scrollbar text-xs">
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
