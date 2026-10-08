import React, { useState } from 'react'
import { ArrowLeft, Mail, Edit2, Plus, Clock, MessageSquare, Paperclip, Send } from 'lucide-react'
import { Card } from '../ui/Card'
import { CONTACT_DEALS_DATA } from '../../data/contactsData'
import type { ContactItem } from '../../types/contact'

interface ContactDetailsProps {
  contact: ContactItem
  onBack: () => void
}

export const ContactDetails: React.FC<ContactDetailsProps> = ({ contact, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'notes' | 'activities' | 'attachments'>('overview')
  const [selectedRelated, setSelectedRelated] = useState<string>('Overview')

  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'timeline' as const, label: 'Timeline' },
    { id: 'notes' as const, label: 'Notes' },
    { id: 'activities' as const, label: 'Activities' },
    { id: 'attachments' as const, label: 'Attachments' },
  ]

  const relatedItems = [
    { name: 'Notes', badge: null },
    { name: 'Deals', badge: 3 },
    { name: 'Activities', badge: null },
    { name: 'Attachments', badge: null },
  ]

  const getDealStatusBadge = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-amber-50 text-amber-700 border-amber-200'
      case 'Cold':
        return 'bg-slate-100 text-slate-700 border-slate-300'
      case 'Not Interested':
        return 'bg-[#FDE8E8] text-[#E02424] border-[#FECACA]'
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
      {/* Left Sidebar: Related List */}
      <div className="lg:col-span-3 space-y-4">
        <Card className="p-4">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-800">Related List</h3>
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-[11px] font-semibold text-[#C99B30] hover:text-[#b58928] cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          </div>

          <nav className="space-y-1 text-xs">
            {relatedItems.map((item) => {
              const isSelected = selectedRelated === item.name
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setSelectedRelated(item.name)
                    if (item.name === 'Notes') setActiveTab('notes')
                    if (item.name === 'Activities') setActiveTab('activities')
                    if (item.name === 'Attachments') setActiveTab('attachments')
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50 text-[#C99B30] font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.name}</span>
                  {item.badge !== null && (
                    <span className="w-4 h-4 rounded-full bg-[#C99B30] text-white text-[10px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              type="button"
              className="flex items-center gap-1 text-xs font-semibold text-[#C99B30] hover:underline cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Related List</span>
            </button>
          </div>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-9 space-y-4">
        {/* Top Header Card */}
        <Card className="p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <button
                onClick={onBack}
                className="p-1 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 mt-1 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    {contact.name}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#E7F8F1] text-[#10B981] border border-[#A7F3D0]">
                    {contact.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Email: {contact.email}
                </p>
              </div>
            </div>

            {/* Actions: Send Email & Edit */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#C99B30] text-white text-xs font-semibold hover:bg-[#b58928] transition-colors shadow-2xs cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Email</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        </Card>

        {/* Sub-Tabs Navigation */}
        <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-[#C99B30] text-[#C99B30]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab 1: Overview Content */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Section 1: Basic Details */}
            <Card className="p-4 sm:p-5">
              <div className="mb-3.5 pb-2 border-b border-slate-100">
                <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                  Basic Details
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Key development highlights
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-xs">
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Contact Name</span>
                  <span className="font-semibold text-slate-800">{contact.name}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Role</span>
                  <span className="font-semibold text-slate-800">{contact.role}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Status</span>
                  <span className="font-semibold text-emerald-600 px-2 py-0.5 rounded-full bg-emerald-50 text-[10px]">
                    {contact.status}
                  </span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Assigned To</span>
                  <span className="font-semibold text-slate-800">{contact.assignedTo}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Created Date</span>
                  <span className="font-semibold text-slate-800">{contact.createdDate}</span>
                </div>
              </div>
            </Card>

            {/* Section 2: Contact Information */}
            <Card className="p-4 sm:p-5">
              <div className="mb-3.5 pb-2 border-b border-slate-100">
                <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                  Contact Information
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Direct and indirect communication information.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-xs">
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Email</span>
                  <span className="font-semibold text-slate-800">{contact.email}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Phone Number</span>
                  <span className="font-semibold text-slate-800">{contact.phone}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Location/City</span>
                  <span className="font-semibold text-slate-800">{contact.location}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Preferred Contact Method</span>
                  <span className="font-semibold text-slate-800">{contact.preferredContact}</span>
                </div>
              </div>
            </Card>

            {/* Section 3: Deals */}
            <Card className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                    Deals
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Associated transactions or deal stages with the contact.
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    className="px-2.5 py-1 rounded border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                  >
                    New
                  </button>
                  <button
                    type="button"
                    className="px-2.5 py-1 rounded border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-500 font-semibold bg-slate-50/70">
                      <th className="py-2 px-3 font-semibold rounded-l-md">Deal Name</th>
                      <th className="py-2 px-3 font-semibold">Development Name</th>
                      <th className="py-2 px-3 font-semibold">Unit Type</th>
                      <th className="py-2 px-3 font-semibold">Deal Value</th>
                      <th className="py-2 px-3 font-semibold text-center">Status</th>
                      <th className="py-2 px-3 font-semibold text-right rounded-r-md">Follow-up Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {CONTACT_DEALS_DATA.map((deal) => (
                      <tr key={deal.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-slate-800">{deal.dealName}</td>
                        <td className="py-2.5 px-3 text-slate-600">{deal.developmentName}</td>
                        <td className="py-2.5 px-3 text-slate-700">{deal.unitType}</td>
                        <td className="py-2.5 px-3 font-bold text-slate-800">{deal.dealValue}</td>
                        <td className="py-2.5 px-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getDealStatusBadge(
                              deal.status
                            )}`}
                          >
                            {deal.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-500">{deal.followUpDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Tab 2: Timeline */}
        {activeTab === 'timeline' && (
          <Card className="p-4 sm:p-5">
            <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C99B30]" />
              <span>Contact Engagement Timeline</span>
            </h3>
            <div className="space-y-3 text-xs pl-2">
              <div className="border-l-2 border-[#C99B30] pl-3 py-1">
                <span className="text-[10px] text-slate-400">12/07/2025</span>
                <p className="font-semibold text-slate-800">Negotiation initiated for Villa Purchase - Sunrise</p>
              </div>
              <div className="border-l-2 border-slate-300 pl-3 py-1">
                <span className="text-[10px] text-slate-400">12/06/2024</span>
                <p className="font-semibold text-slate-800">Contact registered in Realtor360 CRM</p>
              </div>
            </div>
          </Card>
        )}

        {/* Tab 3: Notes */}
        {activeTab === 'notes' && (
          <Card className="p-4 sm:p-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#C99B30]" />
              <span>Contact Notes</span>
            </h3>
            <div className="p-3 bg-slate-50 rounded-lg text-xs border border-slate-100">
              <textarea
                placeholder="Add meeting discussion or client feedback..."
                rows={3}
                className="w-full bg-transparent border-none text-slate-800 placeholder-slate-400 focus:outline-none resize-none"
              />
              <div className="flex justify-end pt-2">
                <button className="flex items-center gap-1.5 px-3 py-1 bg-[#C99B30] text-white rounded text-xs font-semibold hover:bg-[#b58928] cursor-pointer">
                  <Send className="w-3 h-3" />
                  <span>Save Note</span>
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* Tab 4: Activities */}
        {activeTab === 'activities' && (
          <Card className="p-4 sm:p-5">
            <h3 className="text-sm font-bold text-slate-800 mb-3">Activities Log</h3>
            <p className="text-xs text-slate-500">Phone calls, email exchanges, and scheduled visits.</p>
          </Card>
        )}

        {/* Tab 5: Attachments */}
        {activeTab === 'attachments' && (
          <Card className="p-4 sm:p-5">
            <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Paperclip className="w-4 h-4 text-[#C99B30]" />
              <span>Client Attachments & KYC</span>
            </h3>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
              <span>Broker_KYC_Registration.pdf</span>
              <button className="text-[#C99B30] font-semibold hover:underline cursor-pointer">Download</button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
