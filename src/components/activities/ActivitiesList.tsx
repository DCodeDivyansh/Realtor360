import React, { useState } from 'react'
import {
  Plus,
  SlidersHorizontal,
  Phone,
  Video,
  CheckSquare,
  ChevronRight,
  X,
} from 'lucide-react'
import { Card } from '../ui/Card'
import type {
  ActivityItem,
  ActivityCategory,
  ActivityType,
  ActivityStatus,
  ActivityPriority,
} from '../../types/activity'

interface ActivitiesListProps {
  activities: ActivityItem[]
  onToggleMobileFilter?: () => void
}

export const ActivitiesList: React.FC<ActivitiesListProps> = ({
  activities,
  onToggleMobileFilter,
}) => {
  const [activeCategory, setActiveCategory] = useState<ActivityCategory>('Customers')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null)
  const [modalType, setModalType] = useState<ActivityType | null>(null)

  // New activity form states
  const [newTitle, setNewTitle] = useState('')
  const [newAssignedTo, setNewAssignedTo] = useState('Jessica Chen')
  const [newDueDate, setNewDueDate] = useState('15/02/2025')
  const [newLinkedWith, setNewLinkedWith] = useState('')
  const [newPriority, setNewPriority] = useState<ActivityPriority>('Medium')
  const [localActivities, setLocalActivities] = useState<ActivityItem[]>(activities)

  const categories: ActivityCategory[] = [
    'Customers',
    'Open Deals',
    'Leads/Contacts',
    'Others',
  ]

  const filteredByCategory = localActivities.filter(
    (a) => a.category === activeCategory
  )

  const getTypeIcon = (type: ActivityType) => {
    switch (type) {
      case 'Meeting':
        return <Video className="w-4 h-4 text-indigo-600" />
      case 'Call':
        return <Phone className="w-4 h-4 text-emerald-600" />
      case 'Task':
        return <CheckSquare className="w-4 h-4 text-amber-600" />
    }
  }

  const renderStatusBadge = (status: ActivityStatus) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-block px-2 py-0.5 rounded border border-emerald-400 bg-emerald-50 text-emerald-600 text-[10px] font-semibold">
            Completed
          </span>
        )
      case 'In Progress':
        return (
          <span className="inline-block px-2 py-0.5 rounded border border-amber-300 bg-amber-50 text-amber-600 text-[10px] font-semibold">
            In Progress
          </span>
        )
      case 'Active':
        return (
          <span className="inline-block px-2 py-0.5 rounded border border-blue-300 bg-blue-50 text-blue-600 text-[10px] font-semibold">
            Active
          </span>
        )
      case 'Overdue':
        return (
          <span className="inline-block px-2 py-0.5 rounded border border-rose-300 bg-rose-50 text-rose-600 text-[10px] font-semibold">
            Overdue
          </span>
        )
      default:
        return (
          <span className="inline-block px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-600 text-[10px] font-semibold">
            {status}
          </span>
        )
    }
  }

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || !modalType) return

    const newAct: ActivityItem = {
      id: `act-custom-${Date.now()}`,
      title: newTitle,
      type: modalType,
      category: activeCategory,
      assignedTo: newAssignedTo,
      dueDate: newDueDate,
      dueTime: '11:00 AM',
      linkedWith: newLinkedWith || 'John Doe',
      linkedType: activeCategory === 'Open Deals' ? 'User' : 'Contact',
      status: 'Active',
      priority: newPriority,
      description: 'Activity created from Realtor360 CRM quick action.',
    }

    setLocalActivities([newAct, ...localActivities])
    setModalType(null)
    setNewTitle('')
    setNewLinkedWith('')
  }

  return (
    <Card className="p-4 sm:p-5 flex flex-col justify-between h-full bg-white border border-slate-100 rounded-xl shadow-xs">
      {/* Top Header & Quick Action Buttons */}
      <div className="space-y-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-800">
            Activities
          </h2>

          <div className="flex items-center gap-2 flex-wrap">
            {onToggleMobileFilter && (
              <button
                onClick={onToggleMobileFilter}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setModalType('Task')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#C99B30]" />
              <span>New Task</span>
            </button>

            <button
              type="button"
              onClick={() => setModalType('Call')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#C99B30]" />
              <span>Log Call</span>
            </button>

            <button
              type="button"
              onClick={() => setModalType('Meeting')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#C99B30] text-white text-xs font-semibold hover:bg-[#b58928] transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Meeting</span>
            </button>
          </div>
        </div>

        {/* Category Tabs Pill Bar */}
        <div className="p-1 rounded-xl bg-slate-100/70 inline-flex flex-wrap items-center gap-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-200/90 text-slate-800 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid of Activity Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 flex-1">
        {filteredByCategory.map((act) => (
          <div
            key={act.id}
            onClick={() => setSelectedActivity(act)}
            className="p-3.5 rounded-xl border border-slate-200/90 bg-white hover:border-[#C99B30]/60 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
          >
            {/* Card Header: Type Icon + Title + Date */}
            <div>
              <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="p-1 rounded bg-slate-50 shrink-0">
                    {getTypeIcon(act.type)}
                  </div>
                  <h4 className="font-bold text-xs text-slate-800 truncate group-hover:text-[#C99B30] transition-colors">
                    {act.title}
                  </h4>
                </div>
                <span className="text-[10px] text-slate-400 font-medium shrink-0">
                  {act.dueDate}
                </span>
              </div>

              {/* Card Meta Rows */}
              <div className="space-y-1.5 text-[11px] pt-2.5 text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Assigned To:</span>
                  <span className="font-semibold text-slate-700">{act.assignedTo}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Due Date:</span>
                  <span className="font-medium text-slate-700">{act.dueDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Linked With:</span>
                  <span className="font-semibold text-slate-800 truncate max-w-[120px]">
                    {act.linkedWith}
                  </span>
                </div>
              </div>
            </div>

            {/* Card Footer: Status Badge + Arrow */}
            <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 mr-1.5">Status:</span>
                {renderStatusBadge(act.status)}
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#C99B30] group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer: < Prev 1 | 2 | 3 | Next > */}
      <div className="flex items-center justify-center pt-5 mt-4 border-t border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="text-slate-600 hover:text-slate-900 font-medium disabled:opacity-40 cursor-pointer flex items-center"
          >
            <span>&lt; Prev</span>
          </button>

          <span className="px-2 py-0.5 rounded border border-[#C99B30] text-[#C99B30] font-bold">
            1
          </span>
          <span className="text-slate-300">|</span>

          <button
            onClick={() => setCurrentPage(2)}
            className="text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
          >
            2
          </button>
          <span className="text-slate-300">|</span>

          <button
            onClick={() => setCurrentPage(3)}
            className="text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
          >
            3
          </button>

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            className="text-slate-600 hover:text-slate-900 font-medium cursor-pointer flex items-center"
          >
            <span>Next &gt;</span>
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-slate-100">
                  {getTypeIcon(selectedActivity.type)}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    {selectedActivity.title}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Category: {selectedActivity.category}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedActivity(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Activity Type</span>
                <span className="font-semibold text-slate-800">{selectedActivity.type}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Assigned To</span>
                <span className="font-semibold text-slate-800">{selectedActivity.assignedTo}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Due Date & Time</span>
                <span className="font-semibold text-slate-800">
                  {selectedActivity.dueDate} {selectedActivity.dueTime ? `at ${selectedActivity.dueTime}` : ''}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Linked With</span>
                <span className="font-semibold text-slate-800">{selectedActivity.linkedWith}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Status</span>
                {renderStatusBadge(selectedActivity.status)}
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Priority</span>
                <span className="font-semibold text-slate-800">{selectedActivity.priority}</span>
              </div>
              {selectedActivity.description && (
                <div className="pt-2">
                  <span className="text-slate-400 block mb-1">Description</span>
                  <p className="p-2.5 bg-slate-50 rounded text-slate-700 text-xs">
                    {selectedActivity.description}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedActivity(null)}
                className="px-4 py-1.5 rounded-md bg-[#C99B30] text-white text-xs font-semibold hover:bg-[#b58928] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Activity Modal */}
      {modalType && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleCreateActivity}
            className="bg-white rounded-xl max-w-md w-full p-5 space-y-4 shadow-xl border border-slate-200"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">
                Create New {modalType}
              </h3>
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder={`e.g. Follow-up on project specs...`}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C99B30]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Assigned To</label>
                  <select
                    value={newAssignedTo}
                    onChange={(e) => setNewAssignedTo(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C99B30] bg-white"
                  >
                    <option value="Jessica Chen">Jessica Chen</option>
                    <option value="Mohit Mehra">Mohit Mehra</option>
                    <option value="Arjun Malhotra">Arjun Malhotra</option>
                    <option value="Shruti Reddy">Shruti Reddy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Due Date</label>
                  <input
                    type="text"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C99B30]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Linked With</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe / Sunrise Villas"
                  value={newLinkedWith}
                  onChange={(e) => setNewLinkedWith(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C99B30]"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Priority</label>
                <div className="flex gap-2">
                  {(['High', 'Medium', 'Low'] as ActivityPriority[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setNewPriority(p)}
                      className={`flex-1 py-1 rounded text-xs font-medium border transition-colors cursor-pointer ${
                        newPriority === p
                          ? 'border-[#C99B30] bg-amber-50 text-[#C99B30] font-semibold'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="px-3.5 py-1.5 rounded-md border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-md bg-[#C99B30] text-white text-xs font-semibold hover:bg-[#b58928] cursor-pointer"
              >
                Create {modalType}
              </button>
            </div>
          </form>
        </div>
      )}
    </Card>
  )
}
