import React from 'react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { AvatarGroup } from '../ui/AvatarGroup'
import { LISTINGS_DATA } from '../../data/dashboardData'

export const ActiveListingsTable: React.FC = () => {
  return (
    <Card className="p-4 sm:p-5">
      <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-3.5">
        Active Listing
      </h3>

      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-500 font-medium">
              <th className="pb-3 font-medium">Property</th>
              <th className="pb-3 font-medium">Type</th>
              <th className="pb-3 font-medium">Units</th>
              <th className="pb-3 font-medium">Price</th>
              <th className="pb-3 font-medium">Active Leads</th>
              <th className="pb-3 font-medium">Views</th>
              <th className="pb-3 font-medium text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/70">
            {LISTINGS_DATA.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                {/* Property with thumbnail image */}
                <td className="py-2.5 pr-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-8 h-8 rounded-md object-cover border border-slate-100 shadow-2xs"
                    />
                    <span className="font-semibold text-slate-800 whitespace-nowrap">
                      {item.title}
                    </span>
                  </div>
                </td>

                {/* Type */}
                <td className="py-2.5 pr-3 text-slate-600">
                  {item.type}
                </td>

                {/* Units */}
                <td className="py-2.5 pr-3 text-slate-700">
                  {item.units}
                </td>

                {/* Price */}
                <td className="py-2.5 pr-3 font-medium text-slate-800 whitespace-nowrap">
                  {item.price}
                </td>

                {/* Active Leads */}
                <td className="py-2.5 pr-3">
                  <AvatarGroup avatars={item.avatars} countBadge={item.activeLeads} />
                </td>

                {/* Views */}
                <td className="py-2.5 pr-3 text-slate-700">
                  {item.views}
                </td>

                {/* Status Badge */}
                <td className="py-2.5 text-center">
                  <Badge variant={item.statusType} text={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
