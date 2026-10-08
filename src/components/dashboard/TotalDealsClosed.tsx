import React from 'react'
import { Card } from '../ui/Card'

export const TotalDealsClosed: React.FC = () => {
  return (
    <Card className="p-4 sm:p-5 flex flex-col justify-between">
      <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-3">
        Total Deals Closed
      </h3>

      {/* Progress Bar with gold gradient and dashed divider */}
      <div className="relative w-full h-7 bg-[#F3F4F6] rounded-md overflow-hidden flex mb-3">
        <div
          className="h-full bg-linear-to-r from-[#C99B30] to-[#E3C985] relative rounded-l-md"
          style={{ width: '42%' }}
        >
          {/* Vertical dashed separator line */}
          <div className="absolute right-0 top-0 bottom-0 w-px border-r-2 border-dashed border-[#C99B30]" />
        </div>
      </div>

      {/* Numbers row */}
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl sm:text-2xl font-bold text-slate-900">
            42
          </span>
          <span className="text-xs text-slate-500">
            Closed Deals
          </span>
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="text-xl sm:text-2xl font-bold text-slate-900">
            132
          </span>
          <span className="text-xs text-slate-500">
            On Progress
          </span>
        </div>
      </div>
    </Card>
  )
}
