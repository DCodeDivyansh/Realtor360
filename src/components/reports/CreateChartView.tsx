import React, { useState } from 'react'
import {
  ArrowLeft,
  BarChart3,
  BarChart2,
  TrendingUp,
  CircleDot,
  PieChart,
  AreaChart,
  Filter,
  Check,
} from 'lucide-react'
import { Card } from '../ui/Card'
import type { ChartType, LeadReportRow, ReportItem } from '../../types/report'

interface CreateChartViewProps {
  report: ReportItem
  rows: LeadReportRow[]
  onBack: () => void
}

export const CreateChartView: React.FC<CreateChartViewProps> = ({
  report,
  rows,
  onBack,
}) => {
  const [selectedChartType, setSelectedChartType] = useState<ChartType>('Vertical Bar')
  const [xAxis, setXAxis] = useState('Lead Source')
  const [yAxis, setYAxis] = useState('Total Leads')
  const [widgetAdded, setWidgetAdded] = useState(false)

  const chartOptions: { type: ChartType; label: string; icon: React.ReactNode }[] = [
    { type: 'Vertical Bar', label: 'Vertical Bar', icon: <BarChart3 className="w-5 h-5" /> },
    { type: 'Horizontal Bar', label: 'Horizontal Bar', icon: <BarChart2 className="w-5 h-5 rotate-90" /> },
    { type: 'Line Graph', label: 'Line Graph', icon: <TrendingUp className="w-5 h-5" /> },
    { type: 'Donut Graph', label: 'Donut Graph', icon: <CircleDot className="w-5 h-5" /> },
    { type: 'Pie Chart', label: 'Pie Chart', icon: <PieChart className="w-5 h-5" /> },
    { type: 'Area Chart', label: 'Area Chart', icon: <AreaChart className="w-5 h-5" /> },
    { type: 'Funnel Chart', label: 'Funnel Chart', icon: <Filter className="w-5 h-5" /> },
  ]

  // Compute aggregate source counts
  const sourceCounts: Record<string, number> = {}
  rows.forEach((r) => {
    sourceCounts[r.source] = (sourceCounts[r.source] || 0) + 1
  })
  const chartData = Object.entries(sourceCounts).map(([label, value]) => ({
    label,
    value: value * 6, // scaled up for representative visual weight
  }))

  const maxVal = Math.max(...chartData.map((d) => d.value), 20)
  const colors = ['#C99B30', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899']

  const handleAddWidget = () => {
    setWidgetAdded(true)
    setTimeout(() => setWidgetAdded(false), 2500)
  }

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="Back to Report Table"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Create Chart
            </h2>
            <p className="text-xs text-slate-400">
              Visualizing: {report.name}
            </p>
          </div>
        </div>
      </div>

      <Card className="p-5 sm:p-6 bg-white border border-slate-100 rounded-xl shadow-xs space-y-6">
        {/* Chart Type Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 border-b border-slate-100 pb-5">
          {chartOptions.map((opt) => {
            const isSelected = selectedChartType === opt.type
            return (
              <button
                key={opt.type}
                type="button"
                onClick={() => setSelectedChartType(opt.type)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#C99B30] bg-amber-50/70 text-[#C99B30] font-semibold shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="mb-1.5">{opt.icon}</div>
                <span className="text-[11px] leading-tight">{opt.label}</span>
              </button>
            )
          })}
        </div>

        {/* Axis Configuration Sub-Panel */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50/80 border border-slate-100">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="font-bold text-slate-800 text-xs">Axis Values:</span>

            <div className="flex items-center gap-2">
              <span className="text-slate-500">X-axis:</span>
              <select
                value={xAxis}
                onChange={(e) => setXAxis(e.target.value)}
                className="px-2.5 py-1 rounded-md border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#C99B30]"
              >
                <option value="Lead Source">Lead Source</option>
                <option value="Lead Owner">Lead Owner</option>
                <option value="Requirement Type">Requirement Type</option>
                <option value="Lead Status">Lead Status</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500">Y-axis:</span>
              <select
                value={yAxis}
                onChange={(e) => setYAxis(e.target.value)}
                className="px-2.5 py-1 rounded-md border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#C99B30]"
              >
                <option value="Total Leads">Total Leads (Count)</option>
                <option value="Estimated Budget">Estimated Budget (Sum)</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddWidget}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer shadow-2xs whitespace-nowrap flex items-center gap-1.5 ${
              widgetAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[#C99B30] text-white hover:bg-[#b58928]'
            }`}
          >
            {widgetAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Dashboard!</span>
              </>
            ) : (
              <span>Add as Dashboard Widget</span>
            )}
          </button>
        </div>

        {/* Live Interactive Chart Preview */}
        <div className="p-6 rounded-xl border border-slate-100 bg-white min-h-[380px] flex flex-col justify-center items-center">
          <div className="w-full max-w-2xl text-center mb-6">
            <h3 className="font-bold text-sm text-slate-800">
              {report.name} — {selectedChartType} Preview
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Grouping by {xAxis} measuring {yAxis}
            </p>
          </div>

          {/* Render 1: Vertical Bar */}
          {selectedChartType === 'Vertical Bar' && (
            <div className="w-full max-w-xl h-64 flex items-end justify-between gap-4 pt-4 px-4 border-b border-l border-slate-200">
              {chartData.map((d, i) => {
                const heightPct = Math.round((d.value / maxVal) * 100)
                return (
                  <div key={d.label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="text-[10px] font-bold text-slate-700 opacity-80 group-hover:opacity-100">
                      {d.value}
                    </span>
                    <div
                      style={{ height: `${heightPct}%`, backgroundColor: colors[i % colors.length] }}
                      className="w-full max-w-[48px] rounded-t-md transition-all duration-300 group-hover:brightness-105 shadow-2xs"
                    />
                    <span className="text-[10px] text-slate-500 text-center truncate w-full mt-1">
                      {d.label}
                    </span>
                  </div>
                )
              })}
            </div>
          )}

          {/* Render 2: Horizontal Bar */}
          {selectedChartType === 'Horizontal Bar' && (
            <div className="w-full max-w-xl space-y-3.5 px-4">
              {chartData.map((d, i) => {
                const widthPct = Math.round((d.value / maxVal) * 100)
                return (
                  <div key={d.label} className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-600">
                      <span className="font-medium">{d.label}</span>
                      <span className="font-bold text-slate-800">{d.value}</span>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${widthPct}%`, backgroundColor: colors[i % colors.length] }}
                        className="h-full rounded-full transition-all duration-300"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Render 3: Donut or Pie */}
          {(selectedChartType === 'Donut Graph' || selectedChartType === 'Pie Chart') && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-2">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {chartData.map((d, i) => {
                    const total = chartData.reduce((acc, curr) => acc + curr.value, 0)
                    const prevTotal = chartData.slice(0, i).reduce((acc, curr) => acc + curr.value, 0)
                    const strokeDasharray = `${(d.value / total) * 283} 283`
                    const strokeDashoffset = -((prevTotal / total) * 283)

                    return (
                      <circle
                        key={d.label}
                        cx="50"
                        cy="50"
                        r={selectedChartType === 'Donut Graph' ? '35' : '25'}
                        fill="none"
                        stroke={colors[i % colors.length]}
                        strokeWidth={selectedChartType === 'Donut Graph' ? '18' : '50'}
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-300 hover:opacity-90"
                      />
                    )
                  })}
                </svg>
                {selectedChartType === 'Donut Graph' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xs text-slate-400 font-medium">Total</span>
                    <span className="text-lg font-bold text-slate-800">
                      {chartData.reduce((acc, curr) => acc + curr.value, 0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Legend */}
              <div className="space-y-2 text-xs">
                {chartData.map((d, i) => (
                  <div key={d.label} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-sm shrink-0"
                      style={{ backgroundColor: colors[i % colors.length] }}
                    />
                    <span className="text-slate-600">{d.label}:</span>
                    <span className="font-bold text-slate-800">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Render 4: Line Graph / Area Chart */}
          {(selectedChartType === 'Line Graph' || selectedChartType === 'Area Chart') && (
            <div className="w-full max-w-xl h-60 relative px-4 flex flex-col justify-end">
              <svg viewBox="0 0 500 200" className="w-full h-48 overflow-visible">
                {/* Grid lines */}
                <line x1="0" y1="40" x2="500" y2="40" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="160" x2="500" y2="160" stroke="#f1f5f9" strokeWidth="1" />

                {/* Points */}
                {(() => {
                  const pts = chartData.map((d, i) => {
                    const x = (i / (chartData.length - 1 || 1)) * 460 + 20
                    const y = 180 - (d.value / maxVal) * 150
                    return { x, y, ...d }
                  })
                  const pathStr = pts.reduce((acc, curr, idx) => `${acc} ${idx === 0 ? 'M' : 'L'} ${curr.x} ${curr.y}`, '')
                  const areaStr = `${pathStr} L ${pts[pts.length - 1].x} 190 L ${pts[0].x} 190 Z`

                  return (
                    <>
                      {selectedChartType === 'Area Chart' && (
                        <path d={areaStr} fill="#C99B30" fillOpacity="0.15" />
                      )}
                      <path d={pathStr} fill="none" stroke="#C99B30" strokeWidth="3" strokeLinecap="round" />
                      {pts.map((p, idx) => (
                        <g key={idx}>
                          <circle cx={p.x} cy={p.y} r="5" fill="#fff" stroke="#C99B30" strokeWidth="3" />
                          <text x={p.x} y={p.y - 10} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155">
                            {p.value}
                          </text>
                        </g>
                      ))}
                    </>
                  )
                })()}
              </svg>
              <div className="flex justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-200">
                {chartData.map((d) => (
                  <span key={d.label}>{d.label}</span>
                ))}
              </div>
            </div>
          )}

          {/* Render 5: Funnel Chart */}
          {selectedChartType === 'Funnel Chart' && (
            <div className="w-full max-w-md space-y-2">
              {chartData.map((d, i) => {
                const widthPct = 100 - i * 15
                return (
                  <div key={d.label} className="flex flex-col items-center">
                    <div
                      style={{ width: `${Math.max(widthPct, 40)}%`, backgroundColor: colors[i % colors.length] }}
                      className="py-2.5 px-4 rounded-md text-white font-semibold text-xs flex justify-between items-center shadow-xs"
                    >
                      <span>{d.label}</span>
                      <span className="font-bold">{d.value}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
