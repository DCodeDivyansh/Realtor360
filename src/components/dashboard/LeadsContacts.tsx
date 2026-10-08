import React from 'react'
import { ArrowUpRight, Phone } from 'lucide-react'
import { Card } from '../ui/Card'
import { CONTACTS_DATA } from '../../data/dashboardData'

export const LeadsContacts: React.FC = () => {
  return (
    <Card className="p-4 sm:p-5 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm sm:text-base font-bold text-slate-800">
          Leads Contacts
        </h3>
        <button
          title="View all contacts"
          className="text-slate-500 hover:text-slate-800 p-1 rounded-full hover:bg-slate-100 transition-colors"
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Contacts List */}
      <div className="space-y-3">
        {CONTACTS_DATA.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center justify-between group py-0.5"
          >
            <div className="flex items-center gap-2.5">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-100 shadow-2xs"
              />
              <div>
                <h4 className="text-xs font-semibold text-slate-800 leading-tight">
                  {contact.name}
                </h4>
                <p className="text-[10px] text-slate-500 font-normal leading-tight mt-0.5">
                  {contact.location}
                </p>
              </div>
            </div>

            <button
              title={`Call ${contact.name}`}
              className="w-7 h-7 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </Card>
  )
}
