import React, { useState } from 'react'
import { Plus, Search, ChevronLeft, ChevronRight, SlidersHorizontal, LayoutGrid, ChevronDown } from 'lucide-react'
import { Card } from '../ui/Card'
import type { ContactItem } from '../../types/contact'

interface ContactsListProps {
  contacts: ContactItem[]
  onSelectContact: (contact: ContactItem) => void
  onToggleMobileFilter?: () => void
}

export const ContactsList: React.FC<ContactsListProps> = ({
  contacts,
  onSelectContact,
  onToggleMobileFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: ContactItem['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-[#E7F8F1] text-[#10B981] border-[#A7F3D0]'
      case 'In Progress':
        return 'bg-amber-50 text-amber-700 border-amber-200'
      case 'Converted':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'Cold':
        return 'bg-slate-100 text-slate-700 border-slate-300'
      case 'Not Interested':
        return 'bg-[#FDE8E8] text-[#E02424] border-[#FECACA]'
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  return (
    <Card className="p-4 sm:p-5 flex flex-col justify-between h-full">
      {/* Top Header & Sub-Bar */}
      <div className="space-y-4 mb-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-800">
          All Contacts
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Create Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#C99B30] text-white text-xs font-semibold hover:bg-[#b58928] transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Contact</span>
            </button>

            {onToggleMobileFilter && (
              <button
                onClick={onToggleMobileFilter}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>
            )}
          </div>

          {/* Search, Layout Grid, Actions Dropdown */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Contact"
                className="w-48 sm:w-56 pl-3 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-200/90 rounded-md text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C99B30]"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <button
              type="button"
              title="Toggle view"
              className="p-1.5 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>

            <button
              type="button"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>Actions</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto no-scrollbar flex-1">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-500 font-semibold bg-slate-50/70">
              <th className="py-2.5 px-3 font-semibold rounded-l-md">Contact Name</th>
              <th className="py-2.5 px-3 font-semibold">Company</th>
              <th className="py-2.5 px-3 font-semibold">Role</th>
              <th className="py-2.5 px-3 font-semibold">Phone No.</th>
              <th className="py-2.5 px-3 font-semibold">Deal Stage</th>
              <th className="py-2.5 px-3 font-semibold text-center">Status</th>
              <th className="py-2.5 px-3 font-semibold text-right rounded-r-md">Assigned to</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((item, idx) => (
              <tr
                key={`${item.id}-${idx}`}
                onClick={() => onSelectContact(item)}
                className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
              >
                {/* Contact Name + email */}
                <td className="py-3 px-3">
                  <h4 className="font-bold text-slate-800 group-hover:text-[#C99B30] transition-colors whitespace-nowrap">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-normal">
                    Email: {item.email}
                  </p>
                </td>

                {/* Company */}
                <td className="py-3 px-3 text-slate-700 font-medium whitespace-nowrap">
                  {item.company}
                </td>

                {/* Role */}
                <td className="py-3 px-3 text-slate-600">
                  {item.role}
                </td>

                {/* Phone No */}
                <td className="py-3 px-3 text-slate-700 font-medium whitespace-nowrap">
                  {item.phone}
                </td>

                {/* Deal Stage */}
                <td className="py-3 px-3 text-slate-600">
                  {item.dealStage}
                </td>

                {/* Status Badge */}
                <td className="py-3 px-3 text-center">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadge(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* Assigned to */}
                <td className="py-3 px-3 text-right text-slate-700 font-medium whitespace-nowrap">
                  {item.assignedTo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-center pt-4 mt-2 border-t border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="flex items-center gap-0.5 px-2.5 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          <span className="px-2.5 py-1 rounded bg-[#C99B30] text-white font-semibold">
            1
          </span>
          <button className="px-2.5 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">
            2
          </button>
          <button className="px-2.5 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">
            3
          </button>

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            className="flex items-center gap-0.5 px-2.5 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </Card>
  )
}
