import React from 'react'
import { Card } from '../ui/Card'
import type { ActivityFilterState } from '../../types/activity'

interface ActivitiesFilterSidebarProps {
  filters: ActivityFilterState
  onFilterChange: (filters: ActivityFilterState) => void
  onApplyFilters: () => void
  onResetFilters: () => void
}

export const ActivitiesFilterSidebar: React.FC<ActivitiesFilterSidebarProps> = ({
  filters,
  onFilterChange,
  onApplyFilters,
  onResetFilters,
}) => {
  const handleToggle = (
    category: 'types' | 'statuses' | 'linkedWith' | 'priorities' | 'owners',
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
      id: 'activityType',
      title: 'Activity Type',
      options: ['Task', 'Meeting', 'Call'],
      key: 'types' as const,
    },
    {
      id: 'status',
      title: 'Status',
      options: ['Active', 'In Progress', 'Completed', 'Closed', 'Not Interested'],
      key: 'statuses' as const,
    },
    {
      id: 'linkedWith',
      title: 'Linked With',
      options: ['User', 'Contact', 'Lead', 'Company', 'Development'],
      key: 'linkedWith' as const,
    },
    {
      id: 'priority',
      title: 'Priority',
      options: ['High', 'Medium', 'Low'],
      key: 'priorities' as const,
    },
    {
      id: 'ownerName',
      title: 'Owner Name',
      options: ['Jessica Chen', 'Arjun Malhotra', 'Mohit Mehra', 'Shruti Reddy', 'Neha Desai'],
      key: 'owners' as const,
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
