import React, { useState } from 'react'
import { ArrowLeft, Clock, MessageSquare, Paperclip, Send, FileText, ChevronDown } from 'lucide-react'
import { Card } from '../ui/Card'
import type { DealItem, DealStatus } from '../../types/deal'

interface DealDetailsProps {
  deal: DealItem
  onBack: () => void
  onOpenOfferForm: () => void
  onOpenDealSheet: () => void
}

export const DealDetails: React.FC<DealDetailsProps> = ({
  deal,
  onBack,
  onOpenOfferForm,
  onOpenDealSheet,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'notes' | 'activities' | 'attachments'>('overview')
  const [selectedRelated, setSelectedRelated] = useState<string>('Notes')
  const [showGenerateMenu, setShowGenerateMenu] = useState(false)

  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'timeline' as const, label: 'Timeline' },
    { id: 'notes' as const, label: 'Notes' },
    { id: 'activities' as const, label: 'Activities' },
    { id: 'attachments' as const, label: 'Attachments' },
  ]

  const relatedItems = [
    'Notes',
    'Stage History',
    'Documents',
    'Proposal',
    'Meetings',
    'Attachments',
  ]

  const renderStatusBadge = (status: DealStatus) => {
    switch (status) {
      case 'Closed Won':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded border border-emerald-400 bg-emerald-50 text-emerald-600 text-[10px] font-semibold">
            Closed Won
          </span>
        )
      case 'Under Review':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded border border-amber-300 bg-amber-50 text-amber-600 text-[10px] font-semibold">
            Under Review
          </span>
        )
      case 'Closed Lost':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded border border-rose-300 bg-rose-50 text-rose-500 text-[10px] font-semibold">
            Closed Lost
          </span>
        )
      case 'In Progress':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded border border-blue-300 bg-blue-50 text-blue-600 text-[10px] font-semibold">
            In Progress
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
                    if (item === 'Stage History') setActiveTab('overview')
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

              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {deal.name} - {deal.owner}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {deal.development} • {deal.unit} • {deal.dealValue}
                </p>
              </div>
            </div>

            {/* Top Right: Generate Actions */}
            <div className="flex items-center gap-2 self-start sm:self-center relative">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowGenerateMenu(!showGenerateMenu)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#C99B30] text-white text-xs font-semibold hover:bg-[#b58928] transition-colors shadow-2xs cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Generate Document</span>
                  <ChevronDown className="w-3 h-3" />
                </button>

                {showGenerateMenu && (
                  <div className="absolute right-0 mt-1.5 w-48 bg-white border border-slate-100 rounded-lg shadow-lg py-1 z-30 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setShowGenerateMenu(false)
                        onOpenOfferForm()
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-slate-700 font-medium cursor-pointer"
                    >
                      Offer Form
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowGenerateMenu(false)
                        onOpenDealSheet()
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-slate-700 font-medium cursor-pointer"
                    >
                      Deal Sheet
                    </button>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={onOpenDealSheet}
                className="px-3.5 py-1.5 rounded-md border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Deal Sheet
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
                      <span className="w-32 text-slate-500 font-normal">Deal Name</span>
                      <span className="font-semibold text-slate-800">{deal.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-32 text-slate-500 font-normal">Deal Owner</span>
                      <span className="font-semibold text-slate-800">{deal.owner}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-32 text-slate-500 font-normal">Development</span>
                      <span className="font-semibold text-slate-800">{deal.development}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-32 text-slate-500 font-normal">Unit</span>
                      <span className="font-semibold text-slate-800">{deal.unit}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-32 text-slate-500 font-normal">Phone</span>
                      <span className="font-semibold text-slate-800">{deal.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-32 text-slate-500 font-normal">Email</span>
                      <span className="font-semibold text-slate-800">{deal.email}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-32 text-slate-500 font-normal">Status</span>
                      {renderStatusBadge(deal.status)}
                    </div>
                  </div>

                  {/* Right sub-col */}
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="w-32 text-slate-500 font-normal">Customer Name</span>
                      <span className="font-semibold text-slate-800">{deal.customerName}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-32 text-slate-500 font-normal">Deal Stage</span>
                      <span className="font-semibold text-slate-800">{deal.dealStage}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-32 text-slate-500 font-normal">Deal Value</span>
                      <span className="font-bold text-slate-900">{deal.dealValue}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-slate-100" />

              {/* Section 2: Stage History */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4">
                  <h3 className="text-sm font-bold text-slate-800">
                    Stage History
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Track lead journey across sales pipeline stages.
                  </p>
                </div>

                <div className="md:col-span-8 overflow-x-auto no-scrollbar">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-500 font-medium">
                        <th className="py-2 pr-4 font-medium">Stage</th>
                        <th className="py-2 px-4 font-medium">Date</th>
                        <th className="py-2 pl-4 font-medium">Updated By</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {deal.stageHistory.map((sh, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-2.5 pr-4 font-semibold text-slate-800">
                            {sh.stage}
                          </td>
                          <td className="py-2.5 px-4 text-slate-600">
                            {sh.date}
                          </td>
                          <td className="py-2.5 pl-4 text-slate-600">
                            {sh.updatedBy}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Timeline */}
          {activeTab === 'timeline' && (
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C99B30]" />
                <span>Deal Milestone Timeline</span>
              </h3>
              <div className="space-y-3 text-xs pl-2">
                <div className="border-l-2 border-[#C99B30] pl-3 py-1">
                  <span className="text-[10px] text-slate-400">10/02/2025</span>
                  <p className="font-semibold text-slate-800">Contract signed and booking advance recorded</p>
                </div>
                <div className="border-l-2 border-slate-300 pl-3 py-1">
                  <span className="text-[10px] text-slate-400">05/02/2025</span>
                  <p className="font-semibold text-slate-800">Customer accepted revised commercial offer</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Notes */}
          {activeTab === 'notes' && (
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#C99B30]" />
                <span>Deal Notes</span>
              </h3>
              <div className="p-3 bg-slate-50 rounded-lg text-xs border border-slate-100">
                <textarea
                  placeholder="Add deal negotiation notes..."
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
              <h3 className="text-sm font-bold text-slate-800 mb-2">Deal Activities</h3>
              <p className="text-xs text-slate-500">Bank loan verification, agreement signing appointment, and key handover schedule.</p>
            </div>
          )}

          {/* Tab 5: Attachments */}
          {activeTab === 'attachments' && (
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-[#C99B30]" />
                <span>Deal Attachments</span>
              </h3>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
                <span>Sale_Agreement_Draft_A101.pdf</span>
                <button className="text-[#C99B30] font-semibold hover:underline cursor-pointer">Download</button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
