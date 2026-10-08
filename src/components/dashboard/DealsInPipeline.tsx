import React from 'react'
import { Card } from '../ui/Card'
import { PIPELINE_DATA } from '../../data/dashboardData'

export const DealsInPipeline: React.FC = () => {
  return (
    <Card className="p-4 sm:p-5 flex flex-col justify-between h-full">
      <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-3">
        Deals in Pipeline by Development
      </h3>

      <div className="w-full flex-1 flex flex-col justify-between">
        {/* Table Header */}
        <div className="flex items-center justify-between py-2 px-3 bg-[#F8FAFC] rounded-lg text-xs font-semibold text-slate-700 mb-2">
          <span>Development Name</span>
          <span>Record Count</span>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-100/80">
          {PIPELINE_DATA.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between py-3 px-3 text-xs sm:text-sm text-slate-700 hover:bg-slate-50/60 transition-colors"
            >
              <span>{item.name}</span>
              <span className="font-medium text-slate-800">{item.count}</span>
            </div>
          ))}
        </div>

        <div className="h-2" />
      </div>
    </Card>
  )
}
