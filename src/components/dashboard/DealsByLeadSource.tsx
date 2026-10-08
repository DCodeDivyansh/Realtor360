import React from 'react'
import { Card } from '../ui/Card'

export const DealsByLeadSource: React.FC = () => {
  const cx = 200
  const cy = 150
  const rOuter = 78
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

  // 1. Inbound Call: 37.87% (~136.3 deg), from 0deg to 136deg -> pale cream (#F4EED2)
  // 2. Reference: 30.6% (~110.1 deg), from 136deg to 246deg -> deep gold (#C99B30)
  // 3. Facebook: 6.78% (~24.4 deg), from 246deg to 270deg -> medium gold (#D7B158)
  // 4. Website: 24.83% (~89.4 deg), from 270deg to 360deg -> light gold (#E3C985)
  const slices = [
    {
      name: 'Inbound Call',
      path: describeArc(cx, cy, rOuter, rInner, 2, 134),
      color: '#F4EED2',
    },
    {
      name: 'Reference',
      path: describeArc(cx, cy, rOuter, rInner, 136, 244),
      color: '#C99B30',
    },
    {
      name: 'Facebook',
      path: describeArc(cx, cy, rOuter, rInner, 246, 269),
      color: '#D7B158',
    },
    {
      name: 'Website',
      path: describeArc(cx, cy, rOuter, rInner, 271, 358),
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
              id="arrow-lead"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path
                d="M 1 2 L 7 5 L 1 8"
                fill="none"
                stroke="#64748B"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          </defs>

          {/* Donut Chart Segments */}
          <g>
            {slices.map((slice, i) => (
              <path
                key={i}
                d={slice.path}
                fill={slice.color}
                className="transition-opacity hover:opacity-90"
              />
            ))}
          </g>

          {/* Callout 1: Website (Top Left) */}
          <g>
            <text x="80" y="76" textAnchor="middle" className="text-[11px] font-medium fill-slate-700">
              Website
            </text>
            <text x="80" y="92" textAnchor="middle" className="text-[10px] fill-slate-500">
              10 (24.83%)
            </text>
            {/* Curved pointer arrow to slice */}
            <path
              d="M 100 86 Q 130 80 148 108"
              fill="none"
              stroke="#64748B"
              strokeWidth="1.3"
              markerEnd="url(#arrow-lead)"
            />
          </g>

          {/* Callout 2: Inbound Call (Top Right) */}
          <g>
            <text x="320" y="76" textAnchor="middle" className="text-[11px] font-medium fill-slate-700">
              Inbound Call
            </text>
            <text x="320" y="92" textAnchor="middle" className="text-[10px] fill-slate-500">
              9 (37.87%)
            </text>
            {/* Curved pointer arrow to slice */}
            <path
              d="M 298 86 Q 268 80 252 108"
              fill="none"
              stroke="#64748B"
              strokeWidth="1.3"
              markerEnd="url(#arrow-lead)"
            />
          </g>

          {/* Callout 3: Facebook (Bottom Left) */}
          <g>
            <text x="75" y="222" textAnchor="middle" className="text-[11px] font-medium fill-slate-700">
              Facebook
            </text>
            <text x="75" y="238" textAnchor="middle" className="text-[10px] fill-slate-500">
              1 (6.78%)
            </text>
            {/* Curved pointer arrow to slice */}
            <path
              d="M 95 230 Q 120 234 140 196"
              fill="none"
              stroke="#64748B"
              strokeWidth="1.3"
              markerEnd="url(#arrow-lead)"
            />
          </g>

          {/* Callout 4: Reference (Bottom Right) */}
          <g>
            <text x="325" y="222" textAnchor="middle" className="text-[11px] font-medium fill-slate-700">
              Reference
            </text>
            <text x="325" y="238" textAnchor="middle" className="text-[10px] fill-slate-500">
              1 (30.6%)
            </text>
            {/* Curved pointer arrow to slice */}
            <path
              d="M 305 230 Q 280 234 256 198"
              fill="none"
              stroke="#64748B"
              strokeWidth="1.3"
              markerEnd="url(#arrow-lead)"
            />
          </g>
        </svg>
      </div>
    </Card>
  )
}
