import React, { useState } from 'react'
import { Plus, ChevronLeft, ChevronRight, SlidersHorizontal, LayoutGrid, ChevronDown } from 'lucide-react'
import { Card } from '../ui/Card'
import type { BuildingItem } from '../../types/building'

interface BuildingsListProps {
  buildings: BuildingItem[]
  onSelectBuilding: (building: BuildingItem) => void
  onToggleMobileFilter?: () => void
}

export const BuildingsList: React.FC<BuildingsListProps> = ({
  buildings,
  onSelectBuilding,
  onToggleMobileFilter,
}) => {
  const [currentPage, setCurrentPage] = useState(1)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-[#E7F8F1] text-[#10B981] border-[#A7F3D0]'
      case 'Selling Fast':
        return 'bg-amber-50 text-amber-700 border-amber-200'
      case 'Ready to Move':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'Under Construction':
        return 'bg-purple-50 text-purple-700 border-purple-200'
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  return (
    <Card className="p-4 sm:p-5 flex flex-col justify-between h-full">
      {/* Top Header & Sub-Bar */}
      <div className="space-y-4 mb-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-800">
          Buildings
        </h2>

        <div className="flex items-center justify-between gap-3">
          {/* Create Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#C99B30] text-white text-xs font-semibold hover:bg-[#b58928] transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Building</span>
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

          {/* Layout Grid, Actions Dropdown */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              title="Toggle view"
              className="p-1.5 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>

            <button
              type="button"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 transition-colors cursor-pointer"
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
              <th className="py-2.5 px-3 font-semibold rounded-l-md">Building Name</th>
              <th className="py-2.5 px-3 font-semibold">Development Name</th>
              <th className="py-2.5 px-3 font-semibold">City</th>
              <th className="py-2.5 px-3 font-semibold text-center">Status</th>
              <th className="py-2.5 px-3 font-semibold text-center">Units</th>
              <th className="py-2.5 px-3 font-semibold text-center rounded-r-md">Sold</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {buildings.map((item) => (
              <tr
                key={item.id}
                onClick={() => onSelectBuilding(item)}
                className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
              >
                {/* Building Name + thumbnail + email */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-md object-cover border border-slate-100 shadow-2xs shrink-0 group-hover:ring-1 group-hover:ring-[#C99B30]/40 transition-all"
                    />
                    <div>
                      <h4 className="font-bold text-slate-800 group-hover:text-[#C99B30] transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-normal">
                        {item.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Development Name */}
                <td className="py-3 px-3 text-slate-700 font-medium">
                  {item.developmentName}
                </td>

                {/* City */}
                <td className="py-3 px-3 text-slate-600">
                  {item.city}
                </td>

                {/* Status Badge */}
                <td className="py-3 px-3 text-center">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadge(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* Units */}
                <td className="py-3 px-3 text-center text-slate-800 font-semibold">
                  {item.units}
                </td>

                {/* Sold */}
                <td className="py-3 px-3 text-center text-slate-800 font-semibold">
                  {item.sold}
                </td>
              </tr>
            ))}
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
