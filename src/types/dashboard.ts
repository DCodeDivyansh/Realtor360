export interface MetricItem {
  id: string
  title: string
  value: string
  change: string
  isPositive: boolean
  icon: 'listing' | 'leads' | 'closed' | 'revenue'
}

export interface LeadSourceItem {
  name: string
  count: number
  percentage: number
  color: string
}

export interface StageDealItem {
  stage: string
  angelPlaza: number
  angelGarden: number
  none: number
}

export interface SalesPersonDealItem {
  person: string
  angelPlaza: number
  angelGarden: number
  none: number
}

export interface PipelineItem {
  name: string
  count: number
}

export interface ListingItem {
  id: string
  title: string
  type: string
  units: number | string
  price: string
  activeLeads: number
  avatars: string[]
  views: number
  status: string
  statusType: 'occupied' | 'available' | 'sold-out'
  image: string
}

export interface ContactItem {
  id: string
  name: string
  location: string
  avatar: string
  phone: string
}

export interface ReminderItem {
  id: string
  title: string
  subtitle: string
  isHighlighted?: boolean
  leadAvatars?: string[]
  leadsCountBadge?: string
}

export interface ScheduleItem {
  id: string
  title: string
  subtitle: string
  color: 'teal' | 'rose' | 'amber'
}
