export interface BuildingItem {
  id: string
  name: string
  developmentName: string
  city: string
  status: string
  units: number
  sold: number
  image: string
  email: string
  floors: number
  owner: string
  scheme: string
  parkingStatus: string
  website: string
}

export interface BuildingFilterState {
  searchQuery: string
  developments: string[]
  statuses: string[]
  cities: string[]
  unitRanges: string[]
}

export interface BuildingUnitItem {
  id: string
  unitId: string
  developmentName: string
  buildingName: string
  unitPrice: string
  status: string
  createdTime: string
}
