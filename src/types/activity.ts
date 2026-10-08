export type ActivityType = 'Task' | 'Meeting' | 'Call'

export type ActivityStatus = 
  | 'Active' 
  | 'In Progress' 
  | 'Completed' 
  | 'Closed' 
  | 'Not Started' 
  | 'Overdue'

export type ActivityPriority = 'High' | 'Medium' | 'Low'

export type ActivityLinkedType = 'User' | 'Contact' | 'Lead' | 'Company' | 'Development'

export type ActivityCategory = 'Customers' | 'Open Deals' | 'Leads/Contacts' | 'Others'

export interface ActivityItem {
  id: string
  title: string
  type: ActivityType
  category: ActivityCategory
  assignedTo: string
  dueDate: string
  dueTime?: string
  linkedWith: string
  linkedType: ActivityLinkedType
  status: ActivityStatus
  priority: ActivityPriority
  description?: string
}

export interface ActivityFilterState {
  types: ActivityType[]
  statuses: string[]
  linkedWith: string[]
  priorities: ActivityPriority[]
  owners: string[]
  searchQuery: string
}
