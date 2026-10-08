import React, { useState } from 'react'
import { ArrowLeft, Clock, MessageSquare, Paperclip, Send } from 'lucide-react'
import { Card } from '../ui/Card'
import type { LeadItem } from '../../types/lead'

interface LeadDetailsProps {
  lead: LeadItem
  onBack: () => void
}

export const LeadDetails: React.FC<LeadDetailsProps> = ({ lead, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'notes' | 'activities' | 'attachments'>('overview')
  const [selectedRelated, setSelectedRelated] = useState<string>('Notes')

  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'timeline' as const, label: 'Timeline' },
    { id: 'notes' as const, label: 'Notes' },
    { id: 'activities' as const, label: 'Activities' },
    { id: 'attachments' as const, label: 'Attachments' },
  ]

  const relatedItems = [
    'Notes',
    'Email',
    'Social',
    'Activities',
    'Attachments',
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
      {/* Left Sidebar: Related List */}
      <div className="lg:col-span-3">
        <Card className="p-5 bg-white border border-slate-100 rounded-xl shadow-xs">
          <div className="pb-3 mb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm sm:text-base text-slate-800">Related List</h3>
          </div>

          <nav className="space-y-3 text-xs pt-1">
            {relatedItems.map((item) => {
              const isSelected = selectedRelated === item
              return (
                <button
                  key={item}
                  onClick={() => {
                    setSelectedRelated(item)
                    if (item === 'Notes') setActiveTab('notes')
                    if (item === 'Activities') setActiveTab('activities')
                    if (item === 'Attachments') setActiveTab('attachments')
                  }}
                  className={`block w-full text-left transition-colors cursor-pointer text-xs ${
                    isSelected
                      ? 'text-slate-900 font-bold'
                      : 'text-slate-600 hover:text-slate-900 font-normal'
                  }`}
                >
                  {item}
                </button>
              )
            })}
          </nav>

          <div className="mt-6 pt-3">
            <button
              type="button"
              className="text-xs font-semibold text-[#0284c7] hover:underline cursor-pointer"
            >
              Add Related List
            </button>
          </div>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-9 space-y-5">
        <Card className="p-5 sm:p-6 bg-white border border-slate-100 rounded-xl shadow-xs">
          {/* Top Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="w-8 h-8 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                title="Go back"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <img
                src={lead.avatar}
                alt={lead.name}
                className="w-14 h-14 rounded-full object-cover border border-slate-200 shadow-2xs shrink-0"
              />

              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {lead.name}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Email: {lead.email}
                </p>
                <div className="mt-1">
                  <span className="inline-block px-2.5 py-0.5 rounded border border-emerald-400 bg-emerald-50 text-emerald-600 text-[10px] font-semibold">
                    {lead.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons: Send Email & Edit */}
            <div className="flex items-center gap-2 self-start sm:self-center">
              <button
                type="button"
                className="px-4 py-1.5 rounded-md bg-[#C99B30] text-white text-xs font-semibold hover:bg-[#b58928] transition-colors shadow-2xs cursor-pointer"
              >
                Send Email
              </button>
              <button
                type="button"
                className="px-4 py-1.5 rounded-md border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Edit
              </button>
            </div>
          </div>

          {/* Tab Navigation Pill Bar */}
          <div className="my-5 p-1 rounded-xl bg-slate-100/70 inline-flex flex-wrap items-center gap-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-200/90 text-slate-800 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Tab 1: Overview Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6 pt-2">
              {/* Section 1: Basic Details */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4">
                  <h3 className="text-sm font-bold text-slate-800">
                    Basic Details
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Key development highlights
                  </p>
                </div>

                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-xs">
                  {/* Left sub-col */}
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="w-28 text-slate-500 font-normal">Lead Name</span>
                      <span className="font-semibold text-slate-800">{lead.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-28 text-slate-500 font-normal">Mobile</span>
                      <span className="font-semibold text-slate-800">{lead.mobile}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-28 text-slate-500 font-normal">Email</span>
                      <span className="font-semibold text-slate-800">{lead.email}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-28 text-slate-500 font-normal">Status</span>
                      <span className="px-2 py-0.5 rounded border border-emerald-400 bg-emerald-50 text-emerald-600 text-[10px] font-semibold">
                        {lead.status}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-28 text-slate-500 font-normal">Last Contacted</span>
                      <span className="font-semibold text-slate-800">{lead.lastContacted}</span>
                    </div>
                  </div>

                  {/* Right sub-col */}
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="w-28 text-slate-500 font-normal">Lead Owner</span>
                      <span className="font-semibold text-slate-800">{lead.owner}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-28 text-slate-500 font-normal">Lead Source</span>
                      <span className="font-semibold text-slate-800">{lead.source}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-slate-100" />

              {/* Section 2: Address Information */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4">
                  <h3 className="text-sm font-bold text-slate-800">
                    Address Information
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Direct and indirect communication information.
                  </p>
                </div>

                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-xs">
                  {/* Left sub-col */}
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="w-28 text-slate-500 font-normal">Street</span>
                      <span className="font-semibold text-slate-800">{lead.address.street}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-28 text-slate-500 font-normal">State</span>
                      <span className="font-semibold text-slate-800">{lead.address.state}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-28 text-slate-500 font-normal">Country</span>
                      <span className="font-semibold text-slate-800">{lead.address.country}</span>
                    </div>
                  </div>

                  {/* Right sub-col */}
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="w-28 text-slate-500 font-normal">City</span>
                      <span className="font-semibold text-slate-800">{lead.address.city}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-28 text-slate-500 font-normal">Zip Code</span>
                      <span className="font-semibold text-slate-800">{lead.address.zipCode}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-slate-100" />

              {/* Section 3: Requirement Detail */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4">
                  <h3 className="text-sm font-bold text-slate-800">
                    Requirement Detail
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Direct and indirect communication information.
                  </p>
                </div>

                <div className="md:col-span-8 space-y-3 text-xs">
                  <div className="flex items-center">
                    <span className="w-36 text-slate-500 font-normal">Property Type</span>
                    <span className="font-semibold text-slate-800">{lead.requirements.propertyType}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-36 text-slate-500 font-normal">Budget</span>
                    <span className="font-semibold text-slate-800">{lead.requirements.budget}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-36 text-slate-500 font-normal">Preferred Location</span>
                    <span className="font-semibold text-slate-800">{lead.requirements.preferredLocation}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-36 text-slate-500 font-normal">Requirement Notes</span>
                    <span className="font-semibold text-slate-800">{lead.requirements.notes}</span>
                  </div>
                </div>
              </div>

              <div className="border-b border-slate-100" />

              {/* Section 4: Visit Summary */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4">
                  <h3 className="text-sm font-bold text-slate-800">
                    Visit Summary
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Direct and indirect communication information.
                  </p>
                </div>

                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-xs">
                  {/* Left sub-col */}
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="w-32 text-slate-500 font-normal">Days Visited</span>
                      <span className="font-semibold text-slate-800">{lead.visitSummary.daysVisited}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-32 text-slate-500 font-normal">Number of Chats</span>
                      <span className="font-semibold text-slate-800">{lead.visitSummary.numberOfChats}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-32 text-slate-500 font-normal">First Visit</span>
                      <span className="font-semibold text-slate-800">{lead.visitSummary.firstVisit}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-32 text-slate-500 font-normal">Next Task</span>
                      <span className="font-semibold text-slate-800">{lead.visitSummary.nextTask}</span>
                    </div>
                  </div>

                  {/* Right sub-col */}
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="w-32 text-slate-500 font-normal">Most recent Visit</span>
                      <span className="font-semibold text-slate-800">{lead.visitSummary.mostRecentVisit}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-32 text-slate-500 font-normal">Referrer</span>
                      <span className="font-semibold text-slate-800">{lead.visitSummary.referrer}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Timeline */}
          {activeTab === 'timeline' && (
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C99B30]" />
                <span>Lead Engagement Timeline</span>
              </h3>
              <div className="space-y-3 text-xs pl-2">
                <div className="border-l-2 border-[#C99B30] pl-3 py-1">
                  <span className="text-[10px] text-slate-400">10/02/2025</span>
                  <p className="font-semibold text-slate-800">Phone call logged: Client requested 2BHK flat brochure</p>
                </div>
                <div className="border-l-2 border-slate-300 pl-3 py-1">
                  <span className="text-[10px] text-slate-400">01/02/2025</span>
                  <p className="font-semibold text-slate-800">Inbound referral recorded from existing client</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Notes */}
          {activeTab === 'notes' && (
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#C99B30]" />
                <span>Lead Notes</span>
              </h3>
              <div className="p-3 bg-slate-50 rounded-lg text-xs border border-slate-100">
                <textarea
                  placeholder="Add meeting discussion notes..."
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
            </div>
          )}

          {/* Tab 4: Activities */}
          {activeTab === 'activities' && (
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-slate-800 mb-2">Activities Log</h3>
              <p className="text-xs text-slate-500">Upcoming site visits, follow-up calls, and meeting logs for this lead.</p>
            </div>
          )}

          {/* Tab 5: Attachments */}
          {activeTab === 'attachments' && (
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-[#C99B30]" />
                <span>Attachments & ID Proof</span>
              </h3>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
                <span>Client_PAN_Verification.pdf</span>
                <button className="text-[#C99B30] font-semibold hover:underline cursor-pointer">Download</button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
