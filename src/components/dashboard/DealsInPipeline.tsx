import React from 'react'
import { Card } from '../ui/Card'
import { PIPELINE_DATA } from '../../data/dashboardData'

export const DealsInPipeline: React.FC = () => {
  return (
    <Card className="p-4 sm:p-5 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-4">
          Deals in Pipeline by Development
        </h3>

        {/* Table Header */}
        <div className="flex items-center justify-between py-2 px-3 bg-[#F8FAFC] rounded-lg text-xs font-semibold text-slate-700 mb-3">
          <span>Development Name</span>
          <span>Record Count</span>
        </div>

        {/* Table Rows */}
        <div className="space-y-4 px-1 pt-1">
          {PIPELINE_DATA.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between py-2 px-2 text-xs sm:text-sm text-slate-700 hover:bg-slate-50/80 rounded-md transition-colors"
            >
              <span className="font-normal text-slate-700">{item.name}</span>
              <span className="font-semibold text-slate-800">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-4" />
    </Card>
  )
}
