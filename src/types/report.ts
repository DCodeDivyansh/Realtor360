export type ReportCategory =
  | 'Leads Reports'
  | 'Deals Reports'
  | 'Sales Pipeline Reports'
  | 'Customer Reports'
  | 'Stacking Plan Reports'
  | 'Building Reports'
  | 'Development Reports'
  | 'Attorney Firm Reports'
  | 'Company Reports'
  | 'Activity Reports'
  | 'Custom Reports'

export interface ReportItem {
  id: string
  name: string
  description: string
  category: ReportCategory
  lastRunDate: string
  isFavorite?: boolean
}

export interface LeadReportRow {
  id: string
  source: string
  owner: string
  name: string
  company: string
  email: string
  mobile: string
  requirementType: string
  status: string
  budget: string
}

export type ChartType =
  | 'Vertical Bar'
  | 'Horizontal Bar'
  | 'Line Graph'
  | 'Donut Graph'
  | 'Pie Chart'
  | 'Area Chart'
  | 'Funnel Chart'

export interface ReportFilterState {
  categories: string[]
  searchQuery: string
}
