export interface LeadItem {
  id: string
  name: string
  email: string
  avatar: string
  source: string
  status: string
  category: string
  owner: string
  mobile: string
  lastContacted: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  requirements: {
    propertyType: string
    budget: string
    preferredLocation: string
    notes: string
  }
  visitSummary: {
    daysVisited: string
    mostRecentVisit: string
    numberOfChats: string
    referrer: string
    firstVisit: string
    nextTask: string
  }
}

export interface LeadFilterState {
  searchQuery: string
  sources: string[]
  statuses: string[]
  categories: string[]
  owners: string[]
}
