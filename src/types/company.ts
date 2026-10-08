export type CompanyType = 
  | 'Developer'
  | 'Contractor'
  | 'Brokerage Firm'
  | 'Consultant'
  | 'Legal Partner'
  | 'Marketing Agency'

export type CompanyStatus = 'Active' | 'In Progress' | 'Inactive'

export interface DealStatusCounts {
  openDeals: number
  inProgress: number
  closedWon: number
  closedLost: number
}

export interface ProjectTypeBreakdown {
  type: string
  count: number
}

export interface CompanyItem {
  id: string
  name: string
  logo: string
  type: CompanyType
  noOfProjects: number
  city: string
  status: CompanyStatus
  ownerName: string
  email: string
  phone: string
  website: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  dealsInfo: {
    totalDeals: number
    dealValueRange: string
    dealTypes: string[]
    dealStatus: DealStatusCounts
  }
  projectsInfo: {
    totalProjects: number
    projectTypes: ProjectTypeBreakdown[]
  }
}

export interface CompanyFilterState {
  companyTypes: string[]
  cities: string[]
  ownerNames: string[]
  projectRanges: string[]
  searchQuery: string
}
