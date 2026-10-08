import React, { useState } from 'react'
import { ArrowLeft, Clock, MessageSquare, Paperclip, Send } from 'lucide-react'
import { Card } from '../ui/Card'
import type { CompanyItem, CompanyStatus } from '../../types/company'

interface CompanyDetailsProps {
  company: CompanyItem
  onBack: () => void
}

export const CompanyDetails: React.FC<CompanyDetailsProps> = ({ company, onBack }) => {
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
    'Deals',
    'Projects',
    'Activities',
    'Attachments',
  ]

  const renderStatusBadge = (status: CompanyStatus) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded border border-emerald-400 bg-emerald-50 text-emerald-600 text-[10px] font-semibold">
            Active
          </span>
        )
      case 'In Progress':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded border border-amber-300 bg-amber-50 text-amber-600 text-[10px] font-semibold">
            In Progress
          </span>
        )
      case 'Inactive':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded border border-rose-300 bg-rose-50 text-rose-500 text-[10px] font-semibold">
            Inactive
          </span>
        )
    }
  }

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
                src={company.logo}
                alt={company.name}
                className="w-14 h-14 rounded-full object-cover border border-slate-200 shadow-2xs shrink-0"
              />

              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    {company.name}
                  </h2>
                  {renderStatusBadge(company.status)}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0.5 text-xs text-slate-500 mt-1">
                  <div>
                    <span>Email: </span>
                    <span className="text-slate-700">{company.email}</span>
                  </div>
                  <div>
                    <span>Type: </span>
                    <span className="text-slate-700">{company.type}</span>
                  </div>
                  <div>
                    <span>Owner Name: </span>
                    <span className="text-slate-700">{company.ownerName}</span>
                  </div>
                  <div>
                    <span>City: </span>
                    <span className="text-slate-700">{company.city}</span>
                  </div>
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
                      <span className="w-32 text-slate-500 font-normal">Company Name</span>
                      <span className="font-semibold text-slate-800">{company.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-32 text-slate-500 font-normal">Type</span>
                      <span className="font-semibold text-slate-800">{company.type}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-32 text-slate-500 font-normal">City</span>
                      <span className="font-semibold text-slate-800">{company.city}</span>
                    </div>
                  </div>

                  {/* Right sub-col */}
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="w-28 text-slate-500 font-normal">Owner Name</span>
                      <span className="font-semibold text-slate-800">{company.ownerName}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-28 text-slate-500 font-normal">Status</span>
                      {renderStatusBadge(company.status)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-slate-100" />

              {/* Section 2: Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4">
                  <h3 className="text-sm font-bold text-slate-800">
                    Contact Information
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Essential communication details
                  </p>
                </div>

                <div className="md:col-span-8 space-y-3 text-xs">
                  <div className="flex items-center">
                    <span className="w-32 text-slate-500 font-normal">Phone</span>
                    <span className="font-semibold text-slate-800">{company.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-32 text-slate-500 font-normal">Email</span>
                    <span className="font-semibold text-slate-800">{company.email}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-32 text-slate-500 font-normal">Website</span>
                    <span className="font-semibold text-slate-800">{company.website}</span>
                  </div>
                </div>
              </div>

              <div className="border-b border-slate-100" />

              {/* Section 3: Address Information */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4">
                  <h3 className="text-sm font-bold text-slate-800">
                    Address Information
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Essential communication details
                  </p>
                </div>

                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-xs">
                  {/* Left sub-col */}
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="w-28 text-slate-500 font-normal">Address</span>
                      <span className="font-semibold text-slate-800">{company.address.street}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-28 text-slate-500 font-normal">State</span>
                      <span className="font-semibold text-slate-800">{company.address.state}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-28 text-slate-500 font-normal">Country</span>
                      <span className="font-semibold text-slate-800">{company.address.country}</span>
                    </div>
                  </div>

                  {/* Right sub-col */}
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="w-28 text-slate-500 font-normal">City</span>
                      <span className="font-semibold text-slate-800">{company.address.city}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-28 text-slate-500 font-normal">Zip Code</span>
                      <span className="font-semibold text-slate-800">{company.address.zipCode}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-slate-100" />

              {/* Section 4: Deals Information */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4">
                  <h3 className="text-sm font-bold text-slate-800">
                    Deals Information
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Essential communication details
                  </p>
                </div>

                <div className="md:col-span-8 space-y-4 text-xs">
                  {/* Total Deals & Deal Value Range */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <span className="w-28 text-slate-500 font-normal">Total Deals</span>
                      <span className="font-bold text-slate-800">{company.dealsInfo.totalDeals}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-32 text-slate-500 font-normal">Deal Value Range</span>
                      <span className="font-semibold text-slate-800">{company.dealsInfo.dealValueRange}</span>
                    </div>
                  </div>

                  {/* Deal Types bullet points */}
                  <div className="flex items-baseline gap-2">
                    <span className="w-28 text-slate-500 font-normal shrink-0">Deal Types</span>
                    <span className="font-medium text-slate-800">
                      {company.dealsInfo.dealTypes.map((t) => `• ${t}`).join('  ')}
                    </span>
                  </div>

                  {/* Deal Status Breakdown Table */}
                  <div className="pt-1">
                    <span className="block text-slate-500 font-normal mb-2">Deal Status</span>
                    <div className="grid grid-cols-4 gap-2 text-center max-w-md">
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <span className="block text-[10px] text-slate-500 font-medium">Open Deals</span>
                        <span className="block text-sm font-bold text-slate-800 mt-0.5">
                          {company.dealsInfo.dealStatus.openDeals}
                        </span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <span className="block text-[10px] text-slate-500 font-medium">In progress</span>
                        <span className="block text-sm font-bold text-amber-600 mt-0.5">
                          {company.dealsInfo.dealStatus.inProgress}
                        </span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <span className="block text-[10px] text-slate-500 font-medium">Closed Won</span>
                        <span className="block text-sm font-bold text-emerald-600 mt-0.5">
                          {company.dealsInfo.dealStatus.closedWon}
                        </span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <span className="block text-[10px] text-slate-500 font-medium">Closed Lost</span>
                        <span className="block text-sm font-bold text-rose-500 mt-0.5">
                          {company.dealsInfo.dealStatus.closedLost}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-slate-100" />

              {/* Section 5: Projects Information */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4">
                  <h3 className="text-sm font-bold text-slate-800">
                    Projects Information
                  </h3>
                </div>

                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="flex items-center">
                    <span className="w-28 text-slate-500 font-normal">Total Deals</span>
                    <span className="font-bold text-slate-800">{company.projectsInfo.totalProjects}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 font-normal mb-1">Project Types</span>
                    <div className="space-y-1 font-medium text-slate-800">
                      {company.projectsInfo.projectTypes.map((pt) => (
                        <div key={pt.type}>
                          {pt.type} - {pt.count}
                        </div>
                      ))}
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
                <span>Company Project Timeline</span>
              </h3>
              <div className="space-y-3 text-xs pl-2">
                <div className="border-l-2 border-[#C99B30] pl-3 py-1">
                  <span className="text-[10px] text-slate-400">01/02/2025</span>
                  <p className="font-semibold text-slate-800">Commercial Lease deal registered for Whitefield Tech Zone</p>
                </div>
                <div className="border-l-2 border-slate-300 pl-3 py-1">
                  <span className="text-[10px] text-slate-400">15/01/2025</span>
                  <p className="font-semibold text-slate-800">Company partnership verified for Bengaluru Villa projects</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Notes */}
          {activeTab === 'notes' && (
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#C99B30]" />
                <span>Company Internal Notes</span>
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
              <p className="text-xs text-slate-500">Upcoming site visits, contractor review calls, and partner meetings.</p>
            </div>
          )}

          {/* Tab 5: Attachments */}
          {activeTab === 'attachments' && (
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-[#C99B30]" />
                <span>Corporate Documents & GST</span>
              </h3>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
                <span>Urban_Build_Group_GST_Certificate.pdf</span>
                <button className="text-[#C99B30] font-semibold hover:underline cursor-pointer">Download</button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
