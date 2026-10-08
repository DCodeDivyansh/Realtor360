import React from 'react'
import { Card } from '../ui/Card'

export const DealsByLeadSource: React.FC = () => {
  // SVG Donut calculation helpers
  const cx = 200
  const cy = 150
  const rOuter = 82
  const rInner = 44

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    }
  }

  const describeArc = (
    x: number,
    y: number,
    rOut: number,
    rIn: number,
    startAngle: number,
    endAngle: number
  ) => {
    const startOuter = polarToCartesian(x, y, rOut, endAngle)
    const endOuter = polarToCartesian(x, y, rOut, startAngle)
    const startInner = polarToCartesian(x, y, rIn, endAngle)
    const endInner = polarToCartesian(x, y, rIn, startAngle)

    const arcSweep = endAngle - startAngle <= 180 ? '0' : '1'

    return [
      `M ${startOuter.x} ${startOuter.y}`,
      `A ${rOut} ${rOut} 0 ${arcSweep} 0 ${endOuter.x} ${endOuter.y}`,
      `L ${endInner.x} ${endInner.y}`,
      `A ${rIn} ${rIn} 0 ${arcSweep} 1 ${startInner.x} ${startInner.y}`,
      'Z',
    ].join(' ')
  }

  // Slices definitions:
  // 1. Inbound Call: 37.87% (136.3 deg), from 10deg to 146.3deg -> pale cream (#F4EED2)
  // 2. Reference: 30.6% (110.1 deg), from 146.3deg to 256.4deg -> deep gold (#C99B30)
  // 3. Facebook: 6.78% (24.4 deg), from 256.4deg to 280.8deg -> medium gold (#D7B158)
  // 4. Website: 24.83% (89.4 deg), from 280.8deg to 370.2deg (10.2deg) -> light warm gold (#E3C985)
  const slices = [
    {
      name: 'Inbound Call',
      count: 9,
      percentage: '37.87%',
      path: describeArc(cx, cy, rOuter, rInner, 10, 146),
      color: '#F4EED2',
    },
    {
      name: 'Reference',
      count: 1,
      percentage: '30.6%',
      path: describeArc(cx, cy, rOuter, rInner, 146, 256),
      color: '#C99B30',
    },
    {
      name: 'Facebook',
      count: 1,
      percentage: '6.78%',
      path: describeArc(cx, cy, rOuter, rInner, 256, 281),
      color: '#D7B158',
    },
    {
      name: 'Website',
      count: 10,
      percentage: '24.83%',
      path: describeArc(cx, cy, rOuter, rInner, 281, 370),
      color: '#E3C985',
    },
  ]

  return (
    <Card className="p-4 sm:p-5 flex flex-col justify-between h-full">
      <h3 className="text-sm sm:text-base font-bold text-slate-800">
        Deals by Lead Source
      </h3>

      <div className="relative w-full aspect-4/3 flex items-center justify-center my-auto">
        <svg
          viewBox="0 0 400 300"
          className="w-full h-full max-h-[290px] select-none"
        >
          <defs>
            {/* Arrow Marker */}
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 6 5 L 0 8.5" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          </defs>

          {/* Donut Chart Segments */}
          <g>
            {slices.map((slice, i) => (
              <path
                key={i}
                d={slice.path}
                fill={slice.color}
                stroke="#FFFFFF"
                strokeWidth="1.5"
                className="transition-opacity hover:opacity-90"
              />
            ))}
          </g>

          {/* Callout 1: Inbound Call (Top Right) */}
          <g className="text-xs">
            <text x="325" y="70" textAnchor="middle" className="text-[11px] font-medium fill-slate-500">
              Inbound Call
            </text>
            <text x="325" y="86" textAnchor="middle" className="text-[11px] font-medium fill-slate-500">
              9 (37.87%)
            </text>
            {/* Curved pointer arrow */}
            <path
              d="M 310 75 C 275 72 260 90 252 110"
              fill="none"
              stroke="#64748B"
              strokeWidth="1.2"
              markerEnd="url(#arrow)"
            />
          </g>

          {/* Callout 2: Website (Top Left) */}
          <g className="text-xs">
            <text x="80" y="80" textAnchor="middle" className="text-[11px] font-medium fill-slate-500">
              Website
            </text>
            <text x="80" y="96" textAnchor="middle" className="text-[11px] font-medium fill-slate-500">
              10 (24.83%)
            </text>
            {/* Curved pointer arrow */}
            <path
              d="M 95 85 C 125 80 135 100 148 116"
              fill="none"
              stroke="#64748B"
              strokeWidth="1.2"
              markerEnd="url(#arrow)"
            />
          </g>

          {/* Callout 3: Facebook (Bottom Left) */}
          <g className="text-xs">
            <text x="75" y="224" textAnchor="middle" className="text-[11px] font-medium fill-slate-500">
              Facebook
            </text>
            <text x="75" y="240" textAnchor="middle" className="text-[11px] font-medium fill-slate-500">
              1 (6.78%)
            </text>
            {/* Curved pointer arrow */}
            <path
              d="M 90 230 C 120 235 130 220 145 200"
              fill="none"
              stroke="#64748B"
              strokeWidth="1.2"
              markerEnd="url(#arrow)"
            />
          </g>

          {/* Callout 4: Reference (Bottom Right) */}
          <g className="text-xs">
            <text x="325" y="224" textAnchor="middle" className="text-[11px] font-medium fill-slate-500">
              Reference
            </text>
            <text x="325" y="240" textAnchor="middle" className="text-[11px] font-medium fill-slate-500">
              1 (30.6%)
            </text>
            {/* Curved pointer arrow */}
            <path
              d="M 310 230 C 285 235 270 215 252 195"
              fill="none"
              stroke="#64748B"
              strokeWidth="1.2"
              markerEnd="url(#arrow)"
            />
          </g>
        </svg>
      </div>
    </Card>
  )
}
