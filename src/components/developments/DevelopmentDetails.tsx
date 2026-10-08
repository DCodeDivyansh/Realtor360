import React, { useState } from 'react'
import {
  ArrowLeft,
  Edit2,
  ChevronDown,
  Building2,
  Clock,
  Paperclip,
  ExternalLink,
  Phone,
} from 'lucide-react'
import { Card } from '../ui/Card'
import { DevelopmentNotes } from './DevelopmentNotes'
import type { DevelopmentItem } from '../../types/developments'

interface DevelopmentDetailsProps {
  development: DevelopmentItem
  onBack: () => void
}

export const DevelopmentDetails: React.FC<DevelopmentDetailsProps> = ({
  development,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'buildings' | 'units' | 'notes' | 'activities' | 'attachments'>('overview')
  const [relatedActive, setRelatedActive] = useState<string>('Overview')

  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'buildings' as const, label: 'Buildings' },
    { id: 'units' as const, label: 'Units' },
    { id: 'notes' as const, label: 'Notes' },
    { id: 'activities' as const, label: 'Activities' },
    { id: 'attachments' as const, label: 'Attachments' },
  ]

  const relatedItems = [
    { name: 'Overview', badge: null },
    { name: 'Buildings', badge: development.noOfBuildings },
    { name: 'Units', badge: development.totalUnits },
    { name: 'Deals', badge: 5 },
    { name: 'Activities', badge: null },
    { name: 'Adjustments', badge: null },
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
              className="flex items-center gap-1 text-[11px] font-semibold text-[#C99B30] hover:text-[#b58928] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          </div>

          <nav className="space-y-1 text-xs">
            {relatedItems.map((item) => {
              const isSelected = relatedActive === item.name
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setRelatedActive(item.name)
                    if (item.name.toLowerCase() === 'overview') setActiveTab('overview')
                    if (item.name.toLowerCase() === 'buildings') setActiveTab('buildings')
                    if (item.name.toLowerCase() === 'units') setActiveTab('units')
                    if (item.name.toLowerCase() === 'activities') setActiveTab('activities')
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-colors ${
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
              onClick={onBack}
              className="w-full py-1.5 text-center text-xs font-semibold text-slate-600 hover:text-[#C99B30] transition-colors"
            >
              View All Developments
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
              <img
                src={development.image}
                alt={development.name}
                className="w-16 h-16 rounded-xl object-cover border border-slate-100 shadow-xs shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    {development.name}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600">
                    {development.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {development.developmentCode} • {development.address.city}, {development.address.state}
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  {development.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions: Edit & Dropdown */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#C99B30] text-white text-xs font-semibold hover:bg-[#b58928] transition-colors shadow-2xs"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
              >
                <span>Actions</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
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
                className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
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

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Section 1: Basic Details */}
            <Card className="p-4 sm:p-5">
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 mb-3.5 pb-2 border-b border-slate-100">
                Basic Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3.5 gap-x-8 text-xs">
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Development Name</span>
                  <span className="font-semibold text-slate-800">{development.name}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Development Website</span>
                  <a
                    href={development.website}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-[#C99B30] hover:underline flex items-center gap-1 truncate max-w-[200px]"
                  >
                    <span>{development.website}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Starting Price</span>
                  <span className="font-bold text-slate-900">{development.startingPrice}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Development Status</span>
                  <span className="font-semibold text-emerald-600">{development.status}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">City</span>
                  <span className="font-semibold text-slate-800">{development.city}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Property Type</span>
                  <span className="font-semibold text-slate-800">{development.type}</span>
                </div>
              </div>
            </Card>

            {/* Section 2: Development Information */}
            <Card className="p-4 sm:p-5">
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 mb-3.5 pb-2 border-b border-slate-100">
                Development Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3.5 gap-x-8 text-xs">
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Development Code</span>
                  <span className="font-semibold text-slate-800">{development.developmentCode}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Development Scheme</span>
                  <span className="font-semibold text-slate-800">{development.developmentScheme}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Total Units</span>
                  <span className="font-semibold text-slate-800">{development.totalUnits} Units</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Total Buildings</span>
                  <span className="font-semibold text-slate-800">{development.noOfBuildings} Buildings</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Attorney Firm</span>
                  <span className="font-semibold text-slate-800">{development.attorneyFirm}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Contact Phone</span>
                  <span className="font-medium text-slate-800 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#C99B30]" />
                    {development.phone}
                  </span>
                </div>
                <div className="col-span-full pt-1">
                  <span className="text-slate-500 block mb-1">Description</span>
                  <p className="text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-md">
                    {development.description}
                  </p>
                </div>
              </div>
            </Card>

            {/* Section 3: Address Information */}
            <Card className="p-4 sm:p-5">
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 mb-3.5 pb-2 border-b border-slate-100">
                Address Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3.5 gap-x-8 text-xs">
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Street</span>
                  <span className="font-semibold text-slate-800">{development.address.street}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">City</span>
                  <span className="font-semibold text-slate-800">{development.address.city}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">State</span>
                  <span className="font-semibold text-slate-800">{development.address.state}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Zip Code</span>
                  <span className="font-semibold text-slate-800">{development.address.zipCode}</span>
                </div>
                <div className="flex justify-between items-baseline py-1 border-b border-slate-50">
                  <span className="text-slate-500">Country</span>
                  <span className="font-semibold text-slate-800">{development.address.country}</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Tab 2: Notes (Matching View 3 from Figma) */}
        {activeTab === 'notes' && <DevelopmentNotes />}

        {/* Tab 3: Buildings */}
        {activeTab === 'buildings' && (
          <Card className="p-4 sm:p-5">
            <h3 className="text-sm font-bold text-slate-800 mb-3">Buildings ({development.noOfBuildings})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Array.from({ length: development.noOfBuildings }).map((_, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-4 h-4 text-[#C99B30]" />
                    <span className="font-bold text-xs text-slate-800">Tower {String.fromCharCode(65 + i)}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">4 Floors • {Math.floor(development.totalUnits / development.noOfBuildings)} Units</p>
                  <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-700">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Tab 4: Units */}
        {activeTab === 'units' && (
          <Card className="p-4 sm:p-5">
            <h3 className="text-sm font-bold text-slate-800 mb-3">Units ({development.totalUnits})</h3>
            <p className="text-xs text-slate-500 mb-3">
              Explore all inventory units for {development.name}. See the full stacking diagram under Reports.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {['Unit 101', 'Unit 102', 'Unit 201', 'Unit 202', 'Unit 301', 'Unit 302', 'Unit 401', 'Unit 402'].map((unit, idx) => (
                <div key={unit} className="p-2.5 bg-slate-50 rounded border border-slate-100 flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{unit}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                    idx % 3 === 0 ? 'bg-emerald-100 text-emerald-700' : idx % 3 === 1 ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {idx % 3 === 0 ? 'Available' : idx % 3 === 1 ? 'Booked' : 'Sold'}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Tab 5: Activities */}
        {activeTab === 'activities' && (
          <Card className="p-4 sm:p-5">
            <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C99B30]" />
              <span>Recent Activities</span>
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 py-2 border-b border-slate-100">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <div>
                  <p className="font-medium text-slate-800">Unit 403 status changed to Booked</p>
                  <span className="text-[10px] text-slate-400">By Jessica Chen • 3 hours ago</span>
                </div>
              </div>
              <div className="flex items-start gap-3 py-2 border-b border-slate-100">
                <span className="w-2 h-2 rounded-full bg-[#C99B30] mt-1.5 shrink-0" />
                <div>
                  <p className="font-medium text-slate-800">Price revision updated for 3BHK units</p>
                  <span className="text-[10px] text-slate-400">By John Doe • Yesterday</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Tab 6: Attachments */}
        {activeTab === 'attachments' && (
          <Card className="p-4 sm:p-5">
            <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Paperclip className="w-4 h-4 text-[#C99B30]" />
              <span>Attachments & Documents</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800">Brochure_SunriseEnclave.pdf</p>
                  <span className="text-[10px] text-slate-400">4.2 MB • Uploaded 2 days ago</span>
                </div>
                <button className="text-[#C99B30] font-semibold text-xs hover:underline">Download</button>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800">Master_Floor_Plan.dwg</p>
                  <span className="text-[10px] text-slate-400">12.8 MB • Uploaded 1 week ago</span>
                </div>
                <button className="text-[#C99B30] font-semibold text-xs hover:underline">Download</button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
