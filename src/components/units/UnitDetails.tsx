import React, { useState } from 'react'
import { ArrowLeft, Clock, MessageSquare, Paperclip, Send } from 'lucide-react'
import { Card } from '../ui/Card'
import type { UnitItem, UnitStatus } from '../../types/unit'

interface UnitDetailsProps {
  unit: UnitItem
  onBack: () => void
}

export const UnitDetails: React.FC<UnitDetailsProps> = ({ unit, onBack }) => {
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
    'Deals Associate',
    'Add-On Units Associated',
    'Activities',
    'Attachments',
  ]

  const renderStatusBadge = (status: UnitStatus) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded border border-emerald-400 bg-emerald-50 text-emerald-600 text-[10px] font-semibold">
            Active
          </span>
        )
      case 'Sold':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded border border-sky-400 bg-sky-50 text-sky-600 text-[10px] font-semibold">
            Sold
          </span>
        )
      case 'Booked':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded border border-amber-300 bg-amber-50 text-amber-600 text-[10px] font-semibold">
            Booked
          </span>
        )
      default:
        return (
          <span className="inline-block px-2.5 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-600 text-[10px] font-semibold">
            {status}
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
                src={unit.thumbnail}
                alt={unit.name}
                className="w-14 h-14 rounded-xl object-cover border border-slate-200 shadow-2xs shrink-0"
              />

              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    {unit.name}
                  </h2>
                  {renderStatusBadge(unit.status)}
                </div>
                
                <div className="text-xs text-slate-500 mt-0.5 space-y-0.5">
                  <p>
                    <span>Building Name: </span>
                    <span className="text-slate-700 font-medium">{unit.buildingInfo.name}</span>
                  </p>
                  <p>
                    <span>Development Name: </span>
                    <span className="text-slate-700 font-medium">{unit.buildingInfo.developmentName}</span>
                  </p>
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

                <div className="md:col-span-8 space-y-2.5 text-xs">
                  <div className="flex items-center">
                    <span className="w-32 text-slate-500 font-normal">Unit Name</span>
                    <span className="font-semibold text-slate-800">{unit.name.split(' (')[0]}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-32 text-slate-500 font-normal">Type</span>
                    <span className="font-semibold text-slate-800">{unit.type}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-32 text-slate-500 font-normal">Area</span>
                    <span className="font-semibold text-slate-800">{unit.area}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-32 text-slate-500 font-normal">Floor</span>
                    <span className="font-semibold text-slate-800">{unit.floor}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-32 text-slate-500 font-normal">Balconies</span>
                    <span className="font-semibold text-slate-800">{unit.balconies}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-32 text-slate-500 font-normal">Bathrooms</span>
                    <span className="font-semibold text-slate-800">{unit.bathrooms}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-32 text-slate-500 font-normal">Status</span>
                    {renderStatusBadge(unit.status)}
                  </div>
                  <div className="flex items-center">
                    <span className="w-32 text-slate-500 font-normal">Price</span>
                    <span className="font-bold text-slate-900">{unit.price}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-32 text-slate-500 font-normal">Facing</span>
                    <span className="font-semibold text-slate-800">{unit.facing}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-32 text-slate-500 font-normal">Furnishing</span>
                    <span className="font-semibold text-slate-800">{unit.furnishing}</span>
                  </div>
                </div>
              </div>

              <div className="border-b border-slate-100" />

              {/* Section 2: Building & Development Info */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4">
                  <h3 className="text-sm font-bold text-slate-800">
                    Building & Development Info
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Direct and indirect communication information.
                  </p>
                </div>

                <div className="md:col-span-8 space-y-2.5 text-xs">
                  <div className="flex items-center">
                    <span className="w-44 text-slate-500 font-normal">Building Name</span>
                    <span className="font-semibold text-slate-800">{unit.buildingInfo.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-44 text-slate-500 font-normal">Development Name</span>
                    <span className="font-semibold text-slate-800">{unit.buildingInfo.developmentName}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-44 text-slate-500 font-normal">City</span>
                    <span className="font-semibold text-slate-800">{unit.buildingInfo.city}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-44 text-slate-500 font-normal">No. of Floors in Building</span>
                    <span className="font-semibold text-slate-800">{unit.buildingInfo.floorsInBuilding}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-44 text-slate-500 font-normal">Building Status</span>
                    <span className="font-semibold text-emerald-600">{unit.buildingInfo.buildingStatus}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-44 text-slate-500 font-normal">Development Website</span>
                    <a
                      href={`https://${unit.buildingInfo.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-[#C99B30] hover:underline"
                    >
                      {unit.buildingInfo.website}
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-b border-slate-100" />

              {/* Section 3: Assigned Broker / Sales Agent */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4">
                  <h3 className="text-sm font-bold text-slate-800">
                    Assigned Broker / Sales Agent
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Direct and indirect communication
                  </p>
                </div>

                <div className="md:col-span-8 space-y-2.5 text-xs">
                  <div className="flex items-center">
                    <span className="w-44 text-slate-500 font-normal">Name</span>
                    <span className="font-semibold text-slate-800">{unit.agentInfo.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-44 text-slate-500 font-normal">Role</span>
                    <span className="font-semibold text-slate-800">{unit.agentInfo.role}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-44 text-slate-500 font-normal">Email</span>
                    <span className="font-semibold text-slate-800">{unit.agentInfo.email}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-44 text-slate-500 font-normal">Phone</span>
                    <span className="font-semibold text-slate-800">{unit.agentInfo.phone}</span>
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
                <span>Unit Listing Timeline</span>
              </h3>
              <div className="space-y-3 text-xs pl-2">
                <div className="border-l-2 border-[#C99B30] pl-3 py-1">
                  <span className="text-[10px] text-slate-400">01/02/2025</span>
                  <p className="font-semibold text-slate-800">Interior photoshoot completed and listed on Realtor360 portal</p>
                </div>
                <div className="border-l-2 border-slate-300 pl-3 py-1">
                  <span className="text-[10px] text-slate-400">15/01/2025</span>
                  <p className="font-semibold text-slate-800">Unit base pricing confirmed at ₹1.45 Cr with builder</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Notes */}
          {activeTab === 'notes' && (
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#C99B30]" />
                <span>Unit Internal Notes</span>
              </h3>
              <div className="p-3 bg-slate-50 rounded-lg text-xs border border-slate-100">
                <textarea
                  placeholder="Add inventory observation notes..."
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
              <h3 className="text-sm font-bold text-slate-800 mb-2">Unit Activities Log</h3>
              <p className="text-xs text-slate-500">Upcoming client visits, plumbing verification, and key inspections for this unit.</p>
            </div>
          )}

          {/* Tab 5: Attachments */}
          {activeTab === 'attachments' && (
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-[#C99B30]" />
                <span>Floor Plan & Architectural Drawings</span>
              </h3>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
                <span>Unit_A101_3BHK_FloorPlan.pdf</span>
                <button className="text-[#C99B30] font-semibold hover:underline cursor-pointer">Download</button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
