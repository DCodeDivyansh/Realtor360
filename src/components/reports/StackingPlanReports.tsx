import React, { useState } from 'react'
import { Card } from '../ui/Card'
import { ArrowLeft, Download, Printer, Filter, Search } from 'lucide-react'
import { STACKING_PLANS_DATA } from '../../data/developmentsData'
import type { UnitStatus } from '../../types/developments'

interface StackingPlanReportsProps {
  onBack?: () => void
}

export const StackingPlanReports: React.FC<StackingPlanReportsProps> = ({ onBack }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [searchUnit, setSearchUnit] = useState<string>('')

  const statusConfigs: Record<UnitStatus, { label: string; bg: string; text: string; border: string }> = {
    available: { label: 'Available', bg: 'bg-[#DCFCE7]', text: 'text-[#15803D]', border: 'border-[#BBF7D0]' },
    booked: { label: 'Booked', bg: 'bg-[#DBEAFE]', text: 'text-[#1D4ED8]', border: 'border-[#BFDBFE]' },
    sold: { label: 'Sold', bg: 'bg-[#FEE2E2]', text: 'text-[#B91C1C]', border: 'border-[#FECACA]' },
    blocked: { label: 'Blocked', bg: 'bg-[#FEF3C7]', text: 'text-[#B45309]', border: 'border-[#FDE68A]' },
    'under-construction': { label: 'Under Construction', bg: 'bg-[#F1F5F9]', text: 'text-[#475569]', border: 'border-[#E2E8F0]' },
  }

  return (
    <div className="space-y-5">
      {/* Top Header Card */}
      <Card className="p-4 sm:p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800">
                Stacking Plan Reports
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Visual architectural inventory matrix by building level and real-time status.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Box */}
            <div className="relative">
              <input
                type="text"
                value={searchUnit}
                onChange={(e) => setSearchUnit(e.target.value)}
                placeholder="Search unit..."
                className="w-36 sm:w-44 pl-7 pr-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C99B30]"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print</span>
            </button>

            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#C99B30] text-white text-xs font-semibold hover:bg-[#b58928] transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Legend / Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1 text-slate-500 font-semibold mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Status:</span>
          </div>

          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
              selectedStatus === 'all'
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All
          </button>

          {(Object.keys(statusConfigs) as UnitStatus[]).map((st) => {
            const config = statusConfigs[st]
            const isSelected = selectedStatus === st
            return (
              <button
                key={st}
                onClick={() => setSelectedStatus(isSelected ? 'all' : st)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
                  isSelected ? 'ring-2 ring-slate-800' : ''
                } ${config.bg} ${config.text} ${config.border}`}
              >
                <span className="w-2 h-2 rounded-full bg-current" />
                <span>{config.label}</span>
              </button>
            )
          })}
        </div>
      </Card>

      {/* Buildings Stacking Plans */}
      <div className="space-y-5">
        {STACKING_PLANS_DATA.map((building) => (
          <Card key={building.id} className="p-4 sm:p-5">
            {/* Building Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-slate-800">
                  {building.developmentName}
                </h3>
                <span className="text-xs text-[#C99B30] font-semibold">
                  {building.buildingName}
                </span>
              </div>
            </div>

            {/* Matrix Elevation Grid */}
            <div className="space-y-3 overflow-x-auto no-scrollbar">
              {building.floors.map((floor) => (
                <div
                  key={floor.level}
                  className="flex items-stretch gap-2.5 min-w-[760px]"
                >
                  {/* Floor Level Label */}
                  <div className="w-20 shrink-0 bg-slate-100 rounded-lg flex flex-col items-center justify-center py-2 px-1 border border-slate-200/80">
                    <span className="text-xs font-bold text-slate-800">
                      {floor.level}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Floor {floor.levelNumber}
                    </span>
                  </div>

                  {/* Units Row */}
                  <div className="grid grid-cols-6 gap-2 flex-1">
                    {floor.units.map((unit) => {
                      const config = statusConfigs[unit.status]
                      const matchesStatus = selectedStatus === 'all' || selectedStatus === unit.status
                      const matchesSearch =
                        !searchUnit ||
                        unit.unitNumber.toLowerCase().includes(searchUnit.toLowerCase()) ||
                        unit.type.toLowerCase().includes(searchUnit.toLowerCase())

                      const isDimmed = !matchesStatus || !matchesSearch

                      return (
                        <div
                          key={unit.id}
                          className={`p-2.5 rounded-lg border transition-all duration-150 flex flex-col justify-between ${
                            config.bg
                          } ${config.border} ${
                            isDimmed ? 'opacity-25 grayscale' : 'hover:shadow-md hover:scale-[1.02]'
                          }`}
                        >
                          {/* Unit Number & Status Badge */}
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-bold text-xs text-slate-900">
                              {unit.unitNumber}
                            </span>
                            <span
                              className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${config.text} bg-white/70 shadow-2xs`}
                            >
                              {config.label}
                            </span>
                          </div>

                          {/* Unit Meta */}
                          <div className="space-y-0.5 text-[11px]">
                            <div className="flex justify-between text-slate-600">
                              <span>Type:</span>
                              <span className="font-semibold">{unit.type}</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                              <span>Area:</span>
                              <span className="font-semibold">{unit.area}</span>
                            </div>
                            <div className="flex justify-between text-slate-900 pt-1 border-t border-black/5 font-bold">
                              <span>Price:</span>
                              <span>{unit.price}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
