import React from 'react'
import { Card } from '../ui/Card'
import { SALES_PEOPLE_DATA } from '../../data/dashboardData'

export const DealsBySalesPeople: React.FC = () => {
  const chartWidth = 320
  const maxVal = 20
  const xTicks = [0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20]

  return (
    <Card className="p-4 sm:p-5 flex flex-col justify-between">
      <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-2">
        Deals by Sales People by Development
      </h3>

      <div className="w-full flex-1 flex flex-col justify-center">
        <svg
          viewBox="0 0 420 160"
          className="w-full h-auto select-none"
        >
          {/* Y Axis Label: Deal Owner */}
          <text
            x="-60"
            y="16"
            transform="rotate(-90)"
            textAnchor="middle"
            className="text-[10px] font-medium fill-slate-500"
          >
            Deal Owner
          </text>

          {/* Vertical Grid lines for X axis */}
          {xTicks.map((val) => {
            const xPos = 40 + (val / maxVal) * chartWidth
            return (
              <g key={val}>
                <line
                  x1={xPos}
                  y1="10"
                  x2={xPos}
                  y2="100"
                  stroke="#F1F5F9"
                  strokeWidth="1"
                />
                <text
                  x={xPos}
                  y="114"
                  textAnchor="middle"
                  className="text-[9px] fill-slate-500"
                >
                  {val}
                </text>
              </g>
            )
          })}

          {/* Horizontal Stacked Bars */}
          {SALES_PEOPLE_DATA.map((item, idx) => {
            const barHeight = 16
            const yPos = 20 + idx * 36

            const plazaW = (item.angelPlaza / maxVal) * chartWidth
            const gardenW = (item.angelGarden / maxVal) * chartWidth
            const noneW = (item.none / maxVal) * chartWidth

            return (
              <g key={item.person} className="transition-opacity hover:opacity-95">
                {/* Segment 1: Angel Plaza (left, rounded left) */}
                <rect
                  x="40"
                  y={yPos}
                  width={plazaW}
                  height={barHeight}
                  rx="4"
                  fill="#C99B30"
                />
                {/* Segment 2: Angel Garden (middle) */}
                <rect
                  x={40 + plazaW}
                  y={yPos}
                  width={gardenW}
                  height={barHeight}
                  fill="#E3C985"
                />
                {/* Segment 3: None (right, rounded right) */}
                <rect
                  x={40 + plazaW + gardenW}
                  y={yPos}
                  width={noneW}
                  height={barHeight}
                  rx="4"
                  fill="#F4EED2"
                />
              </g>
            )
          })}

          {/* Bottom X-Axis Title: Record Count */}
          <text
            x={40 + chartWidth / 2}
            y="132"
            textAnchor="middle"
            className="text-[10px] font-medium fill-slate-600"
          >
            Record Count
          </text>
        </svg>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-1 text-xs text-slate-600">
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
