import React from 'react'
import { Card } from '../ui/Card'
import type { CompanyFilterState } from '../../types/company'

interface CompaniesFilterSidebarProps {
  filters: CompanyFilterState
  onFilterChange: (filters: CompanyFilterState) => void
  onApplyFilters: () => void
  onResetFilters: () => void
}

export const CompaniesFilterSidebar: React.FC<CompaniesFilterSidebarProps> = ({
  filters,
  onFilterChange,
  onApplyFilters,
  onResetFilters,
}) => {
  const handleCheckboxToggle = (category: keyof CompanyFilterState, value: string) => {
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
      id: 'companyType',
      title: 'Company Type',
      options: ['Developer', 'Contractor', 'Brokerage Firm', 'Consultant', 'Legal Partner', 'Marketing Agency'],
      key: 'companyTypes' as const,
    },
    {
      id: 'city',
      title: 'City',
      options: ['Bengaluru', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad', 'Chennai', 'Ahmedabad'],
      key: 'cities' as const,
    },
    {
      id: 'ownerName',
      title: 'Owner Name',
      options: ['Mohit Verma', 'Arjun Malhotra', 'Mohit Mehra', 'Shruti Reddy', 'Neha Desai'],
      key: 'ownerNames' as const,
    },
    {
      id: 'projectRange',
      title: 'Number of Projects',
      options: ['0-5', '6-10', '11-20', '21+'],
      key: 'projectRanges' as const,
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
