import React from 'react'
import { Card } from '../ui/Card'
import { STAGES_DATA } from '../../data/dashboardData'

export const DealsByStages: React.FC = () => {
  const chartHeight = 150
  const chartWidth = 310
  const maxVal = 10
  const yTicks = [10, 7.5, 5, 2.5, 0]

  return (
    <Card className="p-4 sm:p-5 flex flex-col justify-between h-full">
      <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-2">
        Deals by Stages by Development
      </h3>

      <div className="w-full flex-1 flex flex-col justify-center">
        <svg
          viewBox="0 0 440 260"
          className="w-full h-auto select-none"
        >
          {/* Y Axis Title */}
          <text
            x="-95"
            y="16"
            transform="rotate(-90)"
            textAnchor="middle"
            className="text-[11px] font-medium fill-slate-500"
          >
            Record Count
          </text>

          {/* Grid lines and Y Axis ticks */}
          {yTicks.map((val) => {
            const yPos = 20 + ((maxVal - val) / maxVal) * chartHeight
            return (
              <g key={val}>
                <text
                  x="50"
                  y={yPos + 3.5}
                  textAnchor="end"
                  className="text-[10px] fill-slate-500"
                >
                  {val}
                </text>
                <line
                  x1="58"
                  y1={yPos}
                  x2={58 + chartWidth + 24}
                  y2={yPos}
                  stroke="#E2E8F0"
                  strokeWidth="0.8"
                />
              </g>
            )
          })}

          {/* Stacked Bars */}
          {STAGES_DATA.map((item, idx) => {
            const barWidth = 22
            const barSpacing = (chartWidth + 24) / STAGES_DATA.length
            const xPos = 58 + idx * barSpacing + (barSpacing - barWidth) / 2

            const plazaH = (item.angelPlaza / maxVal) * chartHeight
            const gardenH = (item.angelGarden / maxVal) * chartHeight
            const noneH = (item.none / maxVal) * chartHeight

            const plazaY = 20 + chartHeight - plazaH
            const gardenY = plazaY - gardenH
            const noneY = gardenY - noneH

            return (
              <g key={item.stage} className="transition-opacity hover:opacity-90">
                {/* Angel Plaza segment (bottom) */}
                <rect
                  x={xPos}
                  y={plazaY}
                  width={barWidth}
                  height={plazaH}
                  fill="#C99B30"
                />
                {/* Angel Garden segment (middle) */}
                <rect
                  x={xPos}
                  y={gardenY}
                  width={barWidth}
                  height={gardenH}
                  fill="#E3C985"
                />
                {/* None segment (top, rounded top) */}
                <rect
                  x={xPos}
                  y={noneY}
                  width={barWidth}
                  height={noneH}
                  rx="2.5"
                  fill="#F4EED2"
                />

                {/* X-axis stage rotated label (-45deg with anchor end) */}
                <text
                  x={xPos + barWidth / 2}
                  y="180"
                  transform={`rotate(-45, ${xPos + barWidth / 2}, 180)`}
                  textAnchor="end"
                  className="text-[9.5px] fill-slate-600 font-normal"
                >
                  {item.stage}
                </text>
              </g>
            )
          })}

          {/* X Axis Title: Stage */}
          <text
            x={58 + (chartWidth + 24) / 2}
            y="245"
            textAnchor="middle"
            className="text-[11px] font-medium fill-slate-600"
          >
            Stage
          </text>
        </svg>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-1 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C99B30]" />
            <span>Angel Plaza</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E3C985]" />
            <span>Angel Garden</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F4EED2]" />
            <span>None</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
