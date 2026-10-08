import React from 'react'
import { Card } from '../ui/Card'
import { AvatarGroup } from '../ui/AvatarGroup'
import { REMINDERS_DATA } from '../../data/dashboardData'

export const RemindersCard: React.FC = () => {
  const [highlighted, ...otherReminders] = REMINDERS_DATA

  return (
    <Card className="p-4 sm:p-5">
      <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-3">
        Reminder
      </h3>

      {/* Top Highlighted Follow-Ups card */}
      {highlighted && (
        <div className="bg-[#FAF6EC] rounded-xl p-3 mb-3 border border-[#F5EED8]/70">
          <h4 className="text-xs font-bold text-slate-800 leading-tight">
            {highlighted.title}
          </h4>
          <p className="text-[11px] text-slate-600 mt-0.5 mb-2 leading-tight">
            {highlighted.subtitle}
          </p>
          {highlighted.leadAvatars && (
            <AvatarGroup
              avatars={highlighted.leadAvatars}
              countBadge={highlighted.leadsCountBadge}
              size="sm"
            />
          )}
        </div>
      )}

      {/* Other Reminders */}
      <div className="space-y-3">
        {otherReminders.map((item) => (
          <div key={item.id} className="py-0.5">
            <h4 className="text-xs font-bold text-slate-800 leading-snug hover:text-[#C99B30] transition-colors cursor-pointer">
              {item.title}
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
              {item.subtitle}
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}
