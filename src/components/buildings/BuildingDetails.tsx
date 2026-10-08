import React, { useState } from 'react'
import { ArrowLeft, Edit2, ChevronDown, Plus, ExternalLink, MessageSquare, Clock, Paperclip, Send } from 'lucide-react'
import { Card } from '../ui/Card'
import { BUILDING_UNITS_DATA, BUILDINGS_DATA } from '../../data/buildingsData'
import type { BuildingItem } from '../../types/building'

interface BuildingDetailsProps {
  building: BuildingItem
  onBack: () => void
  onSwitchBuilding?: (building: BuildingItem) => void
}

export const BuildingDetails: React.FC<BuildingDetailsProps> = ({
  building,
  onBack,
  onSwitchBuilding,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'notes' | 'activities' | 'attachments'>('overview')
  const [selectedRelated, setSelectedRelated] = useState<string>('Overview')
  const [showBuildingDropdown, setShowBuildingDropdown] = useState(false)

  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'timeline' as const, label: 'Timeline' },
    { id: 'notes' as const, label: 'Notes' },
    { id: 'activities' as const, label: 'Activities' },
    { id: 'attachments' as const, label: 'Attachments' },
  ]

  const relatedItems = [
    { name: 'Notes', badge: null },
    { name: 'Units', badge: building.units },
    { name: 'Activities', badge: null },
    { name: 'Attachments', badge: null },
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
            <div className="flex items-center gap-3.5">
              <button
                onClick={onBack}
                className="p-1 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <img
                src={building.image}
                alt={building.name}
                className="w-14 h-14 rounded-lg object-cover border border-slate-100 shadow-xs shrink-0"
              />
              <div className="relative">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    {building.name}
                  </h2>
                  <button
                    onClick={() => setShowBuildingDropdown(!showBuildingDropdown)}
                    className="p-1 text-slate-500 hover:text-slate-800 rounded cursor-pointer"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Building Switcher Dropdown */}
                {showBuildingDropdown && onSwitchBuilding && (
                  <div className="absolute left-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-20 w-48 text-xs">
                    {BUILDINGS_DATA.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => {
                          onSwitchBuilding(b)
                          setShowBuildingDropdown(false)
                        }}
                        className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 ${
                          b.id === building.id ? 'font-bold text-[#C99B30]' : 'text-slate-700'
                        }`}
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>
                )}

                <p className="text-xs text-slate-500 mt-0.5">
                  Development: {building.developmentName}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Email: {building.email}
                </p>
              </div>
            </div>

            {/* Edit Button */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-[#C99B30] text-white text-xs font-semibold hover:bg-[#b58928] transition-colors shadow-2xs cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
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
                  <span className="text-slate-500">Development Name</span>
                  <span className="font-semibold text-slate-800">{building.developmentName}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">No. of Floors</span>
                  <span className="font-semibold text-slate-800">{building.floors}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Development Website</span>
                  <a
                    href={building.website}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-[#C99B30] hover:underline flex items-center gap-1"
                  >
                    <span>{building.website}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Building Status</span>
                  <span className="font-semibold text-emerald-600">{building.status}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">City</span>
                  <span className="font-semibold text-slate-800">{building.city}</span>
                </div>
              </div>
            </Card>

            {/* Section 2: Development Information */}
            <Card className="p-4 sm:p-5">
              <div className="mb-3.5 pb-2 border-b border-slate-100">
                <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                  Development Information
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Essential building information at a glance.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-xs">
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Building Owner</span>
                  <span className="font-semibold text-slate-800">{building.owner}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Development Scheme</span>
                  <span className="font-semibold text-slate-800">{building.scheme}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">No. of Floors</span>
                  <span className="font-semibold text-slate-800">{building.floors}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Building Name</span>
                  <span className="font-semibold text-slate-800">{building.name}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Parking Status</span>
                  <span className="font-semibold text-slate-800">{building.parkingStatus}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Development Website</span>
                  <span className="font-medium text-[#C99B30]">{building.website}</span>
                </div>
              </div>
            </Card>

            {/* Section 3: Units */}
            <Card className="p-4 sm:p-5">
              <div className="mb-3.5 pb-2 border-b border-slate-100">
                <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                  Units
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Units allocated to this building.
                </p>
              </div>

              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-500 font-semibold bg-slate-50/70">
                      <th className="py-2 px-3 font-semibold rounded-l-md">Unit ID</th>
                      <th className="py-2 px-3 font-semibold">Development Name</th>
                      <th className="py-2 px-3 font-semibold">Building Name</th>
                      <th className="py-2 px-3 font-semibold">Unit Price</th>
                      <th className="py-2 px-3 font-semibold text-center">Status</th>
                      <th className="py-2 px-3 font-semibold text-right rounded-r-md">Created Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {BUILDING_UNITS_DATA.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-slate-800">{u.unitId}</td>
                        <td className="py-2.5 px-3 text-slate-600">{u.developmentName}</td>
                        <td className="py-2.5 px-3 text-slate-700">{u.buildingName}</td>
                        <td className="py-2.5 px-3 font-medium text-slate-800">{u.unitPrice}</td>
                        <td className="py-2.5 px-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              u.status === 'Sold'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            {u.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-500">{u.createdTime}</td>
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
              <span>Building Construction & Sales Timeline</span>
            </h3>
            <div className="space-y-3 text-xs pl-2">
              <div className="border-l-2 border-[#C99B30] pl-3 py-1">
                <span className="text-[10px] text-slate-400">14/06/2022</span>
                <p className="font-semibold text-slate-800">Unit A-201 sold to client</p>
              </div>
              <div className="border-l-2 border-slate-300 pl-3 py-1">
                <span className="text-[10px] text-slate-400">12/06/2022</span>
                <p className="font-semibold text-slate-800">Building units registered in Realtor360</p>
              </div>
            </div>
          </Card>
        )}

        {/* Tab 3: Notes */}
        {activeTab === 'notes' && (
          <Card className="p-4 sm:p-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#C99B30]" />
              <span>Building Notes</span>
            </h3>
            <div className="p-3 bg-slate-50 rounded-lg text-xs border border-slate-100">
              <textarea
                placeholder="Add a building inspection note..."
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
            <p className="text-xs text-slate-500">Inspection checks and occupancy certificates tracked here.</p>
          </Card>
        )}

        {/* Tab 5: Attachments */}
        {activeTab === 'attachments' && (
          <Card className="p-4 sm:p-5">
            <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Paperclip className="w-4 h-4 text-[#C99B30]" />
              <span>Building Plans & Blueprints</span>
            </h3>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
              <span>Tower_Structural_Drawing.pdf</span>
              <button className="text-[#C99B30] font-semibold hover:underline cursor-pointer">Download</button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
