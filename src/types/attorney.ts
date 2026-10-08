export type AttorneyStatus = 'Active' | 'Inactive'

export interface AttorneyFirmItem {
  id: string
  name: string
  email: string
  phone: string
  city: string
  status: AttorneyStatus
  services: string[]
  assignedDevelopments: string[]
  clientsHandled: string
}

export interface AttorneyFilterState {
  searchQuery: string
  cities: string[]
  statuses: string[]
  assignedDevelopments: string[]
  services: string[]
  clientsHandled: string[]
}

export interface AssignedDevelopment {
  id: string
  name: string
  city: string
  noOfBuildings: number
  startingPrice: string
}

export interface AssignedUnit {
  id: string
  unitId: string
  development: string
  buildingName: string
  status: string
  assignedDate: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  email: string
}
