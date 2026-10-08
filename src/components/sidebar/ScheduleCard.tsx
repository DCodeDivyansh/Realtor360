import React from 'react'
import { Card } from '../ui/Card'
import { SCHEDULE_DATA } from '../../data/dashboardData'

export const ScheduleCard: React.FC = () => {
  const getBorderColor = (color: 'teal' | 'rose' | 'amber') => {
    switch (color) {
      case 'teal':
        return 'border-[#14B8A6]' // Teal / Cyan accent
      case 'rose':
        return 'border-[#FB7185]' // Pink / Rose accent
      case 'amber':
        return 'border-[#FBBF24]' // Amber / Gold accent
    }
  }

  return (
    <Card className="p-4 sm:p-5">
      <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-3.5">
        My Schedule
      </h3>

      <div className="space-y-3.5">
        {SCHEDULE_DATA.map((item) => (
          <div
            key={item.id}
            className={`border-l-2 ${getBorderColor(item.color)} pl-3 py-0.5`}
          >
            <h4 className="text-xs font-bold text-slate-800 leading-snug hover:text-slate-900 transition-colors cursor-pointer">
              {item.title}
            </h4>
            <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-snug">
              {item.subtitle}
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}
