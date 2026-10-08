export interface DevelopmentItem {
  id: string
  name: string
  type: string
  city: string
  attorneyFirm: string
  noOfBuildings: number
  startingPrice: string
  image: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  status: 'Active' | 'Upcoming' | 'Completed'
  developmentCode: string
  totalUnits: number
  description: string
  developmentScheme: string
  phone: string
  website: string
  brochureUrl: string
  tags: string[]
}

export interface DevelopmentFilterState {
  searchQuery: string
  cities: string[]
  types: string[]
  tags: string[]
  attorneyFirms: string[]
  noOfBuildings: string[]
  priceRanges: string[]
}

export interface NoteItem {
  id: string
  author: string
  avatar: string
  timestamp: string
  content: string
}

export type UnitStatus = 'available' | 'booked' | 'sold' | 'blocked' | 'under-construction'

export interface StackingUnit {
  id: string
  unitNumber: string
  type: string
  area: string
  price: string
  status: UnitStatus
}

export interface StackingFloor {
  level: string
  levelNumber: number
  units: StackingUnit[]
}

export interface StackingBuilding {
  id: string
  developmentName: string
  buildingName: string
  floors: StackingFloor[]
}
