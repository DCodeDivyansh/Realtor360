export type UnitStatus = 'Active' | 'Sold' | 'Booked' | 'Under Construction' | 'Ready to Move'

export type UnitType = '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK' | 'Penthouse' | 'Studio' | 'Flat' | 'Duplex'

export interface UnitItem {
  id: string
  name: string
  thumbnail: string
  building: string
  development: string
  type: string
  status: UnitStatus
  price: string
  area: string
  floor: string
  balconies: number
  bathrooms: number
  facing: string
  furnishing: string
  buildingInfo: {
    name: string
    developmentName: string
    city: string
    floorsInBuilding: number
    buildingStatus: string
    website: string
  }
  agentInfo: {
    name: string
    role: string
    email: string
    phone: string
  }
}

export interface UnitFilterState {
  developments: string[]
  buildings: string[]
  statuses: string[]
  unitTypes: string[]
  areaRanges: string[]
  priceRanges: string[]
  facings: string[]
  searchQuery: string
}
