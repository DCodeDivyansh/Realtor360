export type ContactStatus =
  | 'Active'
  | 'In Progress'
  | 'Converted'
  | 'Cold'
  | 'Not Interested'

export type ContactRole =
  | 'Buyer'
  | 'Seller'
  | 'Investor'
  | 'Broker'
  | 'Developer'

export interface ContactItem {
  id: string
  name: string
  email: string
  company: string
  role: ContactRole
  phone: string
  dealStage: string
  status: ContactStatus
  assignedTo: string
  city: string
  leadSource: string
  createdDate: string
  location: string
  preferredContact: string
}

export interface ContactFilterState {
  searchQuery: string
  statuses: string[]
  roles: string[]
  assignedTo: string[]
  cities: string[]
  leadSources: string[]
}

export interface ContactDealItem {
  id: string
  dealName: string
  developmentName: string
  unitType: string
  dealValue: string
  status: string
  followUpDate: string
}
