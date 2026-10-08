import React from 'react'
import { Home, User, Handshake, Coins } from 'lucide-react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { METRIC_CARDS } from '../../data/dashboardData'
import type { MetricItem } from '../../types/dashboard'

export const MetricCards: React.FC = () => {
  const getIcon = (type: MetricItem['icon']) => {
    switch (type) {
      case 'listing':
        return <Home className="w-4 h-4 text-[#C99B30]" />
      case 'leads':
        return <User className="w-4 h-4 text-[#C99B30]" />
      case 'closed':
        return <Handshake className="w-4 h-4 text-[#C99B30]" />
      case 'revenue':
        return <Coins className="w-4 h-4 text-[#C99B30]" />
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
      {METRIC_CARDS.map((metric) => (
        <Card key={metric.id} className="p-4 sm:p-5 flex flex-col justify-between">
          {/* Top header row: Icon circle + Title */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#FAF5E6] flex items-center justify-center shrink-0">
              {getIcon(metric.icon)}
            </div>
            <span className="text-sm font-medium text-slate-700">
              {metric.title}
            </span>
          </div>

          {/* Bottom row: Large Metric Value + Trend Badge */}
          <div className="flex items-center justify-between mt-auto">
            <span className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight">
              {metric.value}
            </span>
            <Badge variant={metric.isPositive ? 'positive' : 'negative'} text={metric.change} />
          </div>
        </Card>
      ))}
    </div>
  )
}
