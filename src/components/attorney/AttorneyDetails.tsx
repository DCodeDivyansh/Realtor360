import React, { useState } from 'react'
import { ArrowLeft, Mail, Edit2, Plus, Clock, MessageSquare, Paperclip, Send } from 'lucide-react'
import { Card } from '../ui/Card'
import { ASSIGNED_DEVELOPMENTS, ASSIGNED_UNITS, TEAM_MEMBERS } from '../../data/attorneyData'
import type { AttorneyFirmItem } from '../../types/attorney'

interface AttorneyDetailsProps {
  firm: AttorneyFirmItem
  onBack: () => void
}

export const AttorneyDetails: React.FC<AttorneyDetailsProps> = ({ firm, onBack }) => {
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
    'Notes',
    'Email',
    'Assigned Matters',
    'Originating Leads',
    'Originating Matters',
    'Activities',
    'Attachments',
  ]

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
                  className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50 text-[#C99B30] font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item}
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
                    {firm.name}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#E7F8F1] text-[#10B981] border border-[#A7F3D0]">
                    {firm.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {firm.services.join(', ')}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Email: {firm.email}
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
                  <span className="text-slate-500">Firm Name</span>
                  <span className="font-semibold text-slate-800">{firm.name}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Phone</span>
                  <span className="font-semibold text-slate-800">{firm.phone}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Email</span>
                  <span className="font-semibold text-slate-800">{firm.email}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Status</span>
                  <span className="font-semibold text-emerald-600 px-2 py-0.5 rounded-full bg-emerald-50 text-[10px]">
                    {firm.status}
                  </span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">City</span>
                  <span className="font-semibold text-slate-800">{firm.city}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Type of Service</span>
                  <span className="font-semibold text-slate-800">{firm.services.join(', ')}</span>
                </div>
              </div>
            </Card>

            {/* Section 2: Assigned Developments */}
            <Card className="p-4 sm:p-5">
              <div className="mb-3.5 pb-2 border-b border-slate-100">
                <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                  Assigned Developments
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Direct and indirect communication information.
                </p>
              </div>

              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-500 font-semibold bg-slate-50/70">
                      <th className="py-2 px-3 font-semibold rounded-l-md">Development Name</th>
                      <th className="py-2 px-3 font-semibold">City</th>
                      <th className="py-2 px-3 font-semibold text-center">No. of Buildings</th>
                      <th className="py-2 px-3 font-semibold text-right rounded-r-md">Starting Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {ASSIGNED_DEVELOPMENTS.map((dev) => (
                      <tr key={dev.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-slate-800">{dev.name}</td>
                        <td className="py-2.5 px-3 text-slate-600">{dev.city}</td>
                        <td className="py-2.5 px-3 text-center text-slate-700 font-semibold">{dev.noOfBuildings}</td>
                        <td className="py-2.5 px-3 text-right font-bold text-slate-800">{dev.startingPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Section 3: Assigned Units */}
            <Card className="p-4 sm:p-5">
              <div className="mb-3.5 pb-2 border-b border-slate-100">
                <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                  Assigned Units
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Direct and indirect communication information.
                </p>
              </div>

              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-500 font-semibold bg-slate-50/70">
                      <th className="py-2 px-3 font-semibold rounded-l-md">Unit ID</th>
                      <th className="py-2 px-3 font-semibold">Development</th>
                      <th className="py-2 px-3 font-semibold">Building Name</th>
                      <th className="py-2 px-3 font-semibold text-center">Status</th>
                      <th className="py-2 px-3 font-semibold text-right rounded-r-md">Assigned Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {ASSIGNED_UNITS.map((unit) => (
                      <tr key={unit.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-slate-800">{unit.unitId}</td>
                        <td className="py-2.5 px-3 text-slate-600">{unit.development}</td>
                        <td className="py-2.5 px-3 text-slate-700">{unit.buildingName}</td>
                        <td className="py-2.5 px-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              unit.status === 'Sold'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            {unit.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-500">{unit.assignedDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Section 4: Team Member */}
            <Card className="p-4 sm:p-5">
              <div className="mb-3.5 pb-2 border-b border-slate-100">
                <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                  Team Member
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Direct and indirect communication information.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                {TEAM_MEMBERS.map((tm) => (
                  <div key={tm.id} className="flex items-center justify-between py-1.5 px-2 bg-slate-50 rounded-md">
                    <span className="font-semibold text-slate-800">
                      {tm.name} <span className="text-slate-500 font-normal">({tm.role})</span>
                    </span>
                    <a href={`mailto:${tm.email}`} className="text-[#C99B30] hover:underline font-medium">
                      {tm.email}
                    </a>
                  </div>
                ))}
              </div>
            </Card>

            {/* Section 5: Originating Leads */}
            <Card className="p-4 sm:p-5">
              <div className="mb-3.5 pb-2 border-b border-slate-100">
                <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                  Originating Leads
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Recent clients routed through {firm.name}
                </p>
              </div>

              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-500 font-semibold bg-slate-50/70">
                      <th className="py-2 px-3 font-semibold rounded-l-md">Lead Name</th>
                      <th className="py-2 px-3 font-semibold">Source</th>
                      <th className="py-2 px-3 font-semibold">Category</th>
                      <th className="py-2 px-3 font-semibold text-center">Status</th>
                      <th className="py-2 px-3 font-semibold text-right rounded-r-md">Contact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-2.5 px-3 font-bold text-slate-800">Ananya Verma</td>
                      <td className="py-2.5 px-3 text-slate-600">Referral</td>
                      <td className="py-2.5 px-3 text-slate-700">Residential</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-700">Verified</span>
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-600">+91 98450 12345</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-2.5 px-3 font-bold text-slate-800">Rajesh Kulkarni</td>
                      <td className="py-2.5 px-3 text-slate-600">Website</td>
                      <td className="py-2.5 px-3 text-slate-700">Commercial</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-700">In Review</span>
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-600">+91 97401 54321</td>
                    </tr>
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
              <span>Firm Timeline</span>
            </h3>
            <div className="space-y-3 text-xs pl-2">
              <div className="border-l-2 border-[#C99B30] pl-3 py-1">
                <span className="text-[10px] text-slate-400">18/07/2022</span>
                <p className="font-semibold text-slate-800">Assigned to Orchid Grove (Unit B-205)</p>
              </div>
              <div className="border-l-2 border-slate-300 pl-3 py-1">
                <span className="text-[10px] text-slate-400">12/06/2022</span>
                <p className="font-semibold text-slate-800">Title deed verification finalized for Sunrise Enclave</p>
              </div>
            </div>
          </Card>
        )}

        {/* Tab 3: Notes */}
        {activeTab === 'notes' && (
          <Card className="p-4 sm:p-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#C99B30]" />
              <span>Legal Notes</span>
            </h3>
            <div className="p-3 bg-slate-50 rounded-lg text-xs border border-slate-100">
              <textarea
                placeholder="Add a legal note..."
                rows={3}
                className="w-full bg-transparent border-none text-slate-800 placeholder-slate-400 focus:outline-none resize-none"
              />
              <div className="flex justify-end pt-2">
                <button className="flex items-center gap-1.5 px-3 py-1 bg-[#C99B30] text-white rounded text-xs font-semibold hover:bg-[#b58928]">
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
            <p className="text-xs text-slate-500">All due diligence filings and verified stamp duty contracts recorded.</p>
          </Card>
        )}

        {/* Tab 5: Attachments */}
        {activeTab === 'attachments' && (
          <Card className="p-4 sm:p-5">
            <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Paperclip className="w-4 h-4 text-[#C99B30]" />
              <span>Contracts & Power of Attorney</span>
            </h3>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
              <span>Legal_Retainer_Agreement_2024.pdf</span>
              <button className="text-[#C99B30] font-semibold hover:underline">Download</button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
