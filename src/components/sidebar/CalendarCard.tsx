import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card } from '../ui/Card'

export const CalendarCard: React.FC = () => {
  // Calendar days for July 2025 (Starts on Tuesday = index 2)
  // S M T W T F S
  // Blank spaces: Sun, Mon (2 blanks)
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  // 1 to 31
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1)
  const emptyDays = [null, null] // Sunday, Monday are before July 1 (Tuesday)

  return (
    <Card className="p-4 sm:p-5">
      {/* Header: Month and Chevrons */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          July 2025
        </h3>
        <div className="flex items-center gap-1 text-slate-700">
          <button
            title="Previous month"
            className="p-1 rounded-md hover:bg-slate-100 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            title="Next month"
            className="p-1 rounded-md hover:bg-slate-100 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 text-center mb-2">
        {daysOfWeek.map((day, idx) => (
          <span key={idx} className="text-[11px] font-medium text-slate-400">
            {day}
          </span>
        ))}
      </div>

      {/* Dates Grid */}
      <div className="grid grid-cols-7 gap-y-1.5 text-center text-xs">
        {emptyDays.map((_, idx) => (
          <div key={`empty-${idx}`} />
        ))}

        {daysInMonth.map((day) => {
          const isSelected = day === 8
          const isGreenUnderline = day === 10 || day === 11
          const isRedUnderline = day === 14

          return (
            <div
              key={day}
              className="h-7 flex flex-col items-center justify-center cursor-pointer select-none"
            >
              {isSelected ? (
                <span className="w-6 h-6 rounded-full bg-[#C99B30] text-white font-semibold flex items-center justify-center text-xs shadow-xs">
                  {day}
                </span>
              ) : (
                <span
                  className={`text-slate-700 hover:text-slate-900 transition-colors ${
                    isGreenUnderline
                      ? 'border-b-2 border-emerald-500 font-semibold'
                      : isRedUnderline
                      ? 'border-b-2 border-rose-500 font-semibold'
                      : ''
                  }`}
                >
                  {day}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </Card>
  )
}
