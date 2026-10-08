export type DealStatus = 'Closed Won' | 'In Progress' | 'Under Review' | 'Closed Lost'

export interface StageHistoryItem {
  stage: string
  date: string
  updatedBy: string
}

export interface BuyerInfo {
  name: string
  phone: string
  email: string
  address: string
  attorneyName?: string
  attorneyFirm?: string
  attorneyPhone?: string
  attorneyEmail?: string
}

export interface PropertyInfo {
  unitId: string
  developmentName: string
  buildingName: string
  unitNumber: string
  unitType: string
  superBuiltUpArea: string
  floorNo: string
}

export interface OfferDetails {
  offerPrice: string
  bookingAmount: string
  paymentTerms: string
  loanSanctionRequired: string
  possessionDateExpected: string
  preferredPaymentMethod: string
  brokerName: string
  brokerPhone: string
  agencyName: string
}

export interface DealFinancials {
  unitArea: string
  basePrice: string
  additionalCharges: string
  agreementValue: string
  registrationDate: string
  paymentTerms: string
}

export interface DealItem {
  id: string
  name: string
  owner: string
  development: string
  unit: string
  status: DealStatus
  dealValue: string
  phone: string
  email: string
  customerName: string
  dealStage: string
  stageHistory: StageHistoryItem[]
  buyerInfo: BuyerInfo
  propertyInfo: PropertyInfo
  offerDetails: OfferDetails
  dealFinancials: DealFinancials
}

export interface DealFilterState {
  owners: string[]
  statuses: string[]
  developments: string[]
  leadSources: string[]
  minValue: number
  maxValue: number
  searchQuery: string
}
