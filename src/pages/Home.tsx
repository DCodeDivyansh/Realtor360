import React, { useState } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { MetricCards } from '../components/dashboard/MetricCards'
import { DealsByLeadSource } from '../components/dashboard/DealsByLeadSource'
import { DealsByStages } from '../components/dashboard/DealsByStages'
import { DealsBySalesPeople } from '../components/dashboard/DealsBySalesPeople'
import { TotalDealsClosed } from '../components/dashboard/TotalDealsClosed'
import { DealsInPipeline } from '../components/dashboard/DealsInPipeline'
import { ActiveListingsTable } from '../components/dashboard/ActiveListingsTable'
import { LeadsContacts } from '../components/dashboard/LeadsContacts'
import { RemindersCard } from '../components/sidebar/RemindersCard'
import { CalendarCard } from '../components/sidebar/CalendarCard'
import { ScheduleCard } from '../components/sidebar/ScheduleCard'

// Developments components
import { DevelopmentsFilterSidebar } from '../components/developments/DevelopmentsFilterSidebar'
import { DevelopmentsList } from '../components/developments/DevelopmentsList'
import { DevelopmentDetails } from '../components/developments/DevelopmentDetails'
import { StackingPlanReports } from '../components/reports/StackingPlanReports'
import { DEVELOPMENTS_DATA } from '../data/developmentsData'
import type { DevelopmentFilterState, DevelopmentItem } from '../types/developments'

// Attorney components
import { AttorneyFilterSidebar } from '../components/attorney/AttorneyFilterSidebar'
import { AttorneyList } from '../components/attorney/AttorneyList'
import { AttorneyDetails } from '../components/attorney/AttorneyDetails'
import { ATTORNEY_FIRMS_DATA } from '../data/attorneyData'
import type { AttorneyFilterState, AttorneyFirmItem } from '../types/attorney'

// Buildings components
import { BuildingsFilterSidebar } from '../components/buildings/BuildingsFilterSidebar'
import { BuildingsList } from '../components/buildings/BuildingsList'
import { BuildingDetails } from '../components/buildings/BuildingDetails'
import { BUILDINGS_DATA } from '../data/buildingsData'
import type { BuildingFilterState, BuildingItem } from '../types/building'

// Contacts components
import { ContactsFilterSidebar } from '../components/contacts/ContactsFilterSidebar'
import { ContactsList } from '../components/contacts/ContactsList'
import { ContactDetails } from '../components/contacts/ContactDetails'
import { CONTACTS_DATA } from '../data/contactsData'
import type { ContactFilterState, ContactItem } from '../types/contact'

// Leads components
import { LeadsFilterSidebar } from '../components/leads/LeadsFilterSidebar'
import { LeadsList } from '../components/leads/LeadsList'
import { LeadDetails } from '../components/leads/LeadDetails'
import { LEADS_DATA } from '../data/leadsData'
import type { LeadFilterState, LeadItem } from '../types/lead'

// Companies components
import { CompaniesFilterSidebar } from '../components/companies/CompaniesFilterSidebar'
import { CompaniesList } from '../components/companies/CompaniesList'
import { CompanyDetails } from '../components/companies/CompanyDetails'
import { COMPANIES_DATA } from '../data/companiesData'
import type { CompanyFilterState, CompanyItem } from '../types/company'

// Deals components
import { DealsFilterSidebar } from '../components/deals/DealsFilterSidebar'
import { DealsList } from '../components/deals/DealsList'
import { DealDetails } from '../components/deals/DealDetails'
import { OfferFormView } from '../components/deals/OfferFormView'
import { DealSheetView } from '../components/deals/DealSheetView'
import { DEALS_DATA } from '../data/dealsData'
import type { DealFilterState, DealItem } from '../types/deal'

const INITIAL_DEV_FILTERS: DevelopmentFilterState = {
  searchQuery: '',
  cities: [],
  types: [],
  tags: [],
  attorneyFirms: [],
  noOfBuildings: [],
  priceRanges: [],
}

const INITIAL_ATTORNEY_FILTERS: AttorneyFilterState = {
  searchQuery: '',
  cities: [],
  statuses: [],
  assignedDevelopments: [],
  services: [],
  clientsHandled: [],
}

const INITIAL_BUILDING_FILTERS: BuildingFilterState = {
  searchQuery: '',
  developments: [],
  statuses: [],
  cities: [],
  unitRanges: [],
}

const INITIAL_CONTACT_FILTERS: ContactFilterState = {
  searchQuery: '',
  statuses: [],
  roles: [],
  assignedTo: [],
  cities: [],
  leadSources: [],
}

const INITIAL_LEAD_FILTERS: LeadFilterState = {
  searchQuery: '',
  sources: [],
  statuses: [],
  categories: [],
  owners: [],
}

const INITIAL_COMPANY_FILTERS: CompanyFilterState = {
  searchQuery: '',
  companyTypes: [],
  cities: [],
  ownerNames: [],
  projectRanges: [],
}

const INITIAL_DEAL_FILTERS: DealFilterState = {
  searchQuery: '',
  owners: [],
  statuses: [],
  developments: [],
  leadSources: [],
  minValue: 0,
  maxValue: 5,
}

export const Home: React.FC = () => {
  const [activeNav, setActiveNav] = useState('Home')

  // Developments state
  const [selectedDevelopment, setSelectedDevelopment] = useState<DevelopmentItem | null>(null)
  const [devFilters, setDevFilters] = useState<DevelopmentFilterState>(INITIAL_DEV_FILTERS)
  const [mobileDevFilterOpen, setMobileDevFilterOpen] = useState(false)

  // Attorney state
  const [selectedAttorney, setSelectedAttorney] = useState<AttorneyFirmItem | null>(null)
  const [attorneyFilters, setAttorneyFilters] = useState<AttorneyFilterState>(INITIAL_ATTORNEY_FILTERS)
  const [mobileAttorneyFilterOpen, setMobileAttorneyFilterOpen] = useState(false)

  // Buildings state
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingItem | null>(null)
  const [buildingFilters, setBuildingFilters] = useState<BuildingFilterState>(INITIAL_BUILDING_FILTERS)
  const [mobileBuildingFilterOpen, setMobileBuildingFilterOpen] = useState(false)

  // Contacts state
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null)
  const [contactFilters, setContactFilters] = useState<ContactFilterState>(INITIAL_CONTACT_FILTERS)
  const [mobileContactFilterOpen, setMobileContactFilterOpen] = useState(false)

  // Leads state
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null)
  const [leadFilters, setLeadFilters] = useState<LeadFilterState>(INITIAL_LEAD_FILTERS)
  const [mobileLeadFilterOpen, setMobileLeadFilterOpen] = useState(false)

  // Companies state
  const [selectedCompany, setSelectedCompany] = useState<CompanyItem | null>(null)
  const [companyFilters, setCompanyFilters] = useState<CompanyFilterState>(INITIAL_COMPANY_FILTERS)
  const [mobileCompanyFilterOpen, setMobileCompanyFilterOpen] = useState(false)

  // Deals state
  const [selectedDeal, setSelectedDeal] = useState<DealItem | null>(null)
  const [dealSubView, setDealSubView] = useState<'details' | 'offer-form' | 'deal-sheet'>('details')
  const [dealFilters, setDealFilters] = useState<DealFilterState>(INITIAL_DEAL_FILTERS)
  const [mobileDealFilterOpen, setMobileDealFilterOpen] = useState(false)

  // Handle switching navigation tabs
  const handleNavSelect = (item: string) => {
    setActiveNav(item)
    if (item === 'Developments' && !selectedDevelopment) setSelectedDevelopment(null)
    if (item === 'Attorney Firms' && !selectedAttorney) setSelectedAttorney(null)
    if (item === 'Buildings' && !selectedBuilding) setSelectedBuilding(null)
    if (item === 'Contacts' && !selectedContact) setSelectedContact(null)
    if (item === 'Leads' && !selectedLead) setSelectedLead(null)
    if (item === 'Companies' && !selectedCompany) setSelectedCompany(null)
    if (item === 'Deals' && !selectedDeal) {
      setSelectedDeal(null)
      setDealSubView('details')
    }
  }

  // Filter developments
  const filteredDevelopments = DEVELOPMENTS_DATA.filter((dev) => {
    if (devFilters.cities.length > 0 && !devFilters.cities.includes(dev.city)) return false
    if (devFilters.types.length > 0 && !devFilters.types.includes(dev.type)) return false
    if (devFilters.attorneyFirms.length > 0 && !devFilters.attorneyFirms.includes(dev.attorneyFirm)) return false
    if (devFilters.noOfBuildings.length > 0) {
      const match = devFilters.noOfBuildings.some((b) => {
        if (b === '4+') return dev.noOfBuildings >= 4
        return dev.noOfBuildings === parseInt(b, 10)
      })
      if (!match) return false
    }
    if (devFilters.tags.length > 0 && !dev.tags.some((t) => devFilters.tags.includes(t))) return false
    return true
  })

  // Filter attorney firms
  const filteredAttorneyFirms = ATTORNEY_FIRMS_DATA.filter((firm) => {
    if (attorneyFilters.cities.length > 0 && !attorneyFilters.cities.includes(firm.city)) return false
    if (attorneyFilters.statuses.length > 0 && !attorneyFilters.statuses.includes(firm.status)) return false
    if (attorneyFilters.assignedDevelopments.length > 0) {
      const match = firm.assignedDevelopments.some((d) => attorneyFilters.assignedDevelopments.includes(d))
      if (!match) return false
    }
    if (attorneyFilters.services.length > 0) {
      const match = firm.services.some((s) => attorneyFilters.services.includes(s))
      if (!match) return false
    }
    if (attorneyFilters.clientsHandled.length > 0 && !attorneyFilters.clientsHandled.includes(firm.clientsHandled)) return false
    return true
  })

  // Filter buildings
  const filteredBuildings = BUILDINGS_DATA.filter((bld) => {
    if (buildingFilters.developments.length > 0 && !buildingFilters.developments.includes(bld.developmentName)) return false
    if (buildingFilters.statuses.length > 0 && !buildingFilters.statuses.includes(bld.status)) return false
    if (buildingFilters.cities.length > 0 && !buildingFilters.cities.includes(bld.city)) return false
    if (buildingFilters.unitRanges.length > 0) {
      const match = buildingFilters.unitRanges.some((r) => {
        if (r === '0-10') return bld.units <= 10
        if (r === '11-20') return bld.units >= 11 && bld.units <= 20
        if (r === '21-30') return bld.units >= 21 && bld.units <= 30
        if (r === '31+') return bld.units >= 31
        return true
      })
      if (!match) return false
    }
    return true
  })

  // Filter contacts
  const filteredContacts = CONTACTS_DATA.filter((c) => {
    if (contactFilters.statuses.length > 0 && !contactFilters.statuses.includes(c.status)) return false
    if (contactFilters.roles.length > 0 && !contactFilters.roles.includes(c.role)) return false
    if (contactFilters.assignedTo.length > 0 && !contactFilters.assignedTo.some((a) => c.assignedTo.includes(a))) return false
    if (contactFilters.cities.length > 0 && !contactFilters.cities.includes(c.city)) return false
    if (contactFilters.leadSources.length > 0 && !contactFilters.leadSources.includes(c.leadSource)) return false
    return true
  })

  // Filter leads
  const filteredLeads = LEADS_DATA.filter((l) => {
    if (leadFilters.sources.length > 0 && !leadFilters.sources.includes(l.source)) return false
    if (leadFilters.statuses.length > 0 && !leadFilters.statuses.includes(l.status)) return false
    if (leadFilters.categories.length > 0 && !leadFilters.categories.includes(l.category)) return false
    if (leadFilters.owners.length > 0 && !leadFilters.owners.includes(l.owner)) return false
    if (leadFilters.searchQuery && !l.name.toLowerCase().includes(leadFilters.searchQuery.toLowerCase())) return false
    return true
  })

  // Filter companies
  const filteredCompanies = COMPANIES_DATA.filter((comp) => {
    if (companyFilters.companyTypes.length > 0 && !companyFilters.companyTypes.includes(comp.type)) return false
    if (companyFilters.cities.length > 0 && !companyFilters.cities.includes(comp.city)) return false
    if (companyFilters.ownerNames.length > 0 && !companyFilters.ownerNames.includes(comp.ownerName)) return false
    if (companyFilters.projectRanges.length > 0) {
      const match = companyFilters.projectRanges.some((r) => {
        if (r === '0-5') return comp.noOfProjects <= 5
        if (r === '6-10') return comp.noOfProjects >= 6 && comp.noOfProjects <= 10
        if (r === '11-20') return comp.noOfProjects >= 11 && comp.noOfProjects <= 20
        if (r === '21+') return comp.noOfProjects >= 21
        return true
      })
      if (!match) return false
    }
    if (companyFilters.searchQuery && !comp.name.toLowerCase().includes(companyFilters.searchQuery.toLowerCase())) return false
    return true
  })

  // Filter deals
  const filteredDeals = DEALS_DATA.filter((deal) => {
    if (dealFilters.owners.length > 0 && !dealFilters.owners.includes(deal.owner)) return false
    if (dealFilters.statuses.length > 0 && !dealFilters.statuses.includes(deal.status)) return false
    if (dealFilters.developments.length > 0 && !dealFilters.developments.includes(deal.development)) return false
    if (dealFilters.searchQuery && !deal.name.toLowerCase().includes(dealFilters.searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen bg-[#F4F5F8] flex flex-col font-sans text-slate-800">
      {/* Top Navbar */}
      <Navbar activeItem={activeNav} onSelectItem={handleNavSelect} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto p-3 sm:p-4 md:p-5 lg:p-6">
        {/* VIEW: LEADS */}
        {activeNav === 'Leads' && (
          <div>
            {selectedLead ? (
              /* Lead Details View */
              <LeadDetails
                lead={selectedLead}
                onBack={() => setSelectedLead(null)}
              />
            ) : (
              /* Leads List with Filter Sidebar */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
                {/* Desktop Left Sidebar */}
                <div className="hidden lg:block lg:col-span-3">
                  <LeadsFilterSidebar
                    filters={leadFilters}
                    onFilterChange={setLeadFilters}
                    onApplyFilters={() => {}}
                    onResetFilters={() => setLeadFilters(INITIAL_LEAD_FILTERS)}
                  />
                </div>

                {/* Mobile Filter Drawer */}
                {mobileLeadFilterOpen && (
                  <div className="lg:hidden col-span-12">
                    <LeadsFilterSidebar
                      filters={leadFilters}
                      onFilterChange={setLeadFilters}
                      onApplyFilters={() => setMobileLeadFilterOpen(false)}
                      onResetFilters={() => {
                        setLeadFilters(INITIAL_LEAD_FILTERS)
                        setMobileLeadFilterOpen(false)
                      }}
                    />
                  </div>
                )}

                {/* Main List */}
                <div className="lg:col-span-9">
                  <LeadsList
                    leads={filteredLeads}
                    onSelectLead={(l) => setSelectedLead(l)}
                    onToggleMobileFilter={() => setMobileLeadFilterOpen(!mobileLeadFilterOpen)}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW: COMPANIES */}
        {activeNav === 'Companies' && (
          <div>
            {selectedCompany ? (
              /* Company Details View */
              <CompanyDetails
                company={selectedCompany}
                onBack={() => setSelectedCompany(null)}
              />
            ) : (
              /* Companies List with Filter Sidebar */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
                {/* Desktop Left Sidebar */}
                <div className="hidden lg:block lg:col-span-3">
                  <CompaniesFilterSidebar
                    filters={companyFilters}
                    onFilterChange={setCompanyFilters}
                    onApplyFilters={() => {}}
                    onResetFilters={() => setCompanyFilters(INITIAL_COMPANY_FILTERS)}
                  />
                </div>

                {/* Mobile Filter Drawer */}
                {mobileCompanyFilterOpen && (
                  <div className="lg:hidden col-span-12">
                    <CompaniesFilterSidebar
                      filters={companyFilters}
                      onFilterChange={setCompanyFilters}
                      onApplyFilters={() => setMobileCompanyFilterOpen(false)}
                      onResetFilters={() => {
                        setCompanyFilters(INITIAL_COMPANY_FILTERS)
                        setMobileCompanyFilterOpen(false)
                      }}
                    />
                  </div>
                )}

                {/* Main List */}
                <div className="lg:col-span-9">
                  <CompaniesList
                    companies={filteredCompanies}
                    onSelectCompany={(c) => setSelectedCompany(c)}
                    onToggleMobileFilter={() => setMobileCompanyFilterOpen(!mobileCompanyFilterOpen)}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW: CONTACTS */}
        {activeNav === 'Contacts' && (
          <div>
            {selectedContact ? (
              /* Contact Details View */
              <ContactDetails
                contact={selectedContact}
                onBack={() => setSelectedContact(null)}
              />
            ) : (
              /* Contacts List with Filter Sidebar */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
                {/* Desktop Left Sidebar */}
                <div className="hidden lg:block lg:col-span-3">
                  <ContactsFilterSidebar
                    filters={contactFilters}
                    onFilterChange={setContactFilters}
                    onApplyFilters={() => {}}
                    onResetFilters={() => setContactFilters(INITIAL_CONTACT_FILTERS)}
                  />
                </div>

                {/* Mobile Filter Drawer */}
                {mobileContactFilterOpen && (
                  <div className="lg:hidden col-span-12">
                    <ContactsFilterSidebar
                      filters={contactFilters}
                      onFilterChange={setContactFilters}
                      onApplyFilters={() => setMobileContactFilterOpen(false)}
                      onResetFilters={() => {
                        setContactFilters(INITIAL_CONTACT_FILTERS)
                        setMobileContactFilterOpen(false)
                      }}
                    />
                  </div>
                )}

                {/* Main List */}
                <div className="lg:col-span-9">
                  <ContactsList
                    contacts={filteredContacts}
                    onSelectContact={(c) => setSelectedContact(c)}
                    onToggleMobileFilter={() => setMobileContactFilterOpen(!mobileContactFilterOpen)}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW: DEALS */}
        {activeNav === 'Deals' && (
          <div>
            {selectedDeal ? (
              dealSubView === 'offer-form' ? (
                /* Offer Form Document View */
                <OfferFormView
                  deal={selectedDeal}
                  onBack={() => setDealSubView('details')}
                />
              ) : dealSubView === 'deal-sheet' ? (
                /* Deal Sheet Document View */
                <DealSheetView
                  deal={selectedDeal}
                  onBack={() => setDealSubView('details')}
                />
              ) : (
                /* Deal Details View */
                <DealDetails
                  deal={selectedDeal}
                  onBack={() => setSelectedDeal(null)}
                  onOpenOfferForm={() => setDealSubView('offer-form')}
                  onOpenDealSheet={() => setDealSubView('deal-sheet')}
                />
              )
            ) : (
              /* Deals List with Filter Sidebar */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
                {/* Desktop Left Sidebar */}
                <div className="hidden lg:block lg:col-span-3">
                  <DealsFilterSidebar
                    filters={dealFilters}
                    onFilterChange={setDealFilters}
                    onApplyFilters={() => {}}
                    onResetFilters={() => setDealFilters(INITIAL_DEAL_FILTERS)}
                  />
                </div>

                {/* Mobile Filter Drawer */}
                {mobileDealFilterOpen && (
                  <div className="lg:hidden col-span-12">
                    <DealsFilterSidebar
                      filters={dealFilters}
                      onFilterChange={setDealFilters}
                      onApplyFilters={() => setMobileDealFilterOpen(false)}
                      onResetFilters={() => {
                        setDealFilters(INITIAL_DEAL_FILTERS)
                        setMobileDealFilterOpen(false)
                      }}
                    />
                  </div>
                )}

                {/* Main List */}
                <div className="lg:col-span-9">
                  <DealsList
                    deals={filteredDeals}
                    onSelectDeal={(d) => {
                      setSelectedDeal(d)
                      setDealSubView('details')
                    }}
                    onToggleMobileFilter={() => setMobileDealFilterOpen(!mobileDealFilterOpen)}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW: BUILDINGS */}
        {activeNav === 'Buildings' && (
          <div>
            {selectedBuilding ? (
              /* Building Details View */
              <BuildingDetails
                building={selectedBuilding}
                onBack={() => setSelectedBuilding(null)}
                onSwitchBuilding={(b) => setSelectedBuilding(b)}
              />
            ) : (
              /* Buildings List with Filter Sidebar */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
                {/* Desktop Left Sidebar */}
                <div className="hidden lg:block lg:col-span-3">
                  <BuildingsFilterSidebar
                    filters={buildingFilters}
                    onFilterChange={setBuildingFilters}
                    onApplyFilters={() => {}}
                    onResetFilters={() => setBuildingFilters(INITIAL_BUILDING_FILTERS)}
                  />
                </div>

                {/* Mobile Filter Drawer */}
                {mobileBuildingFilterOpen && (
                  <div className="lg:hidden col-span-12">
                    <BuildingsFilterSidebar
                      filters={buildingFilters}
                      onFilterChange={setBuildingFilters}
                      onApplyFilters={() => setMobileBuildingFilterOpen(false)}
                      onResetFilters={() => {
                        setBuildingFilters(INITIAL_BUILDING_FILTERS)
                        setMobileBuildingFilterOpen(false)
                      }}
                    />
                  </div>
                )}

                {/* Main List */}
                <div className="lg:col-span-9">
                  <BuildingsList
                    buildings={filteredBuildings}
                    onSelectBuilding={(b) => setSelectedBuilding(b)}
                    onToggleMobileFilter={() => setMobileBuildingFilterOpen(!mobileBuildingFilterOpen)}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW: ATTORNEY FIRMS */}
        {activeNav === 'Attorney Firms' && (
          <div>
            {selectedAttorney ? (
              /* Attorney Details View */
              <AttorneyDetails
                firm={selectedAttorney}
                onBack={() => setSelectedAttorney(null)}
              />
            ) : (
              /* Attorney List with Filter Sidebar */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
                {/* Desktop Left Sidebar */}
                <div className="hidden lg:block lg:col-span-3">
                  <AttorneyFilterSidebar
                    filters={attorneyFilters}
                    onFilterChange={setAttorneyFilters}
                    onApplyFilters={() => {}}
                    onResetFilters={() => setAttorneyFilters(INITIAL_ATTORNEY_FILTERS)}
                  />
                </div>

                {/* Mobile Filter Drawer */}
                {mobileAttorneyFilterOpen && (
                  <div className="lg:hidden col-span-12">
                    <AttorneyFilterSidebar
                      filters={attorneyFilters}
                      onFilterChange={setAttorneyFilters}
                      onApplyFilters={() => setMobileAttorneyFilterOpen(false)}
                      onResetFilters={() => {
                        setAttorneyFilters(INITIAL_ATTORNEY_FILTERS)
                        setMobileAttorneyFilterOpen(false)
                      }}
                    />
                  </div>
                )}

                {/* Main List */}
                <div className="lg:col-span-9">
                  <AttorneyList
                    firms={filteredAttorneyFirms}
                    onSelectFirm={(firm) => setSelectedAttorney(firm)}
                    onToggleMobileFilter={() => setMobileAttorneyFilterOpen(!mobileAttorneyFilterOpen)}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW: DEVELOPMENTS */}
        {activeNav === 'Developments' && (
          <div>
            {selectedDevelopment ? (
              /* Development Details */
              <DevelopmentDetails
                development={selectedDevelopment}
                onBack={() => setSelectedDevelopment(null)}
              />
            ) : (
              /* Developments List with Filter Sidebar */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
                {/* Desktop Left Sidebar: Filters */}
                <div className="hidden lg:block lg:col-span-3">
                  <DevelopmentsFilterSidebar
                    filters={devFilters}
                    onFilterChange={setDevFilters}
                    onApplyFilters={() => {}}
                    onResetFilters={() => setDevFilters(INITIAL_DEV_FILTERS)}
                  />
                </div>

                {/* Mobile Filter Drawer */}
                {mobileDevFilterOpen && (
                  <div className="lg:hidden col-span-12">
                    <DevelopmentsFilterSidebar
                      filters={devFilters}
                      onFilterChange={setDevFilters}
                      onApplyFilters={() => setMobileDevFilterOpen(false)}
                      onResetFilters={() => {
                        setDevFilters(INITIAL_DEV_FILTERS)
                        setMobileDevFilterOpen(false)
                      }}
                    />
                  </div>
                )}

                {/* Main List */}
                <div className="lg:col-span-9">
                  <DevelopmentsList
                    developments={filteredDevelopments}
                    onSelectDevelopment={(dev) => setSelectedDevelopment(dev)}
                    onToggleMobileFilter={() => setMobileDevFilterOpen(!mobileDevFilterOpen)}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW: REPORTS / STACKING PLAN REPORTS */}
        {(activeNav === 'Reports' || activeNav === 'Units') && (
          <StackingPlanReports onBack={() => setActiveNav('Home')} />
        )}

        {/* SCREEN 1: EXECUTIVE DASHBOARD (DEFAULT / HOME) */}
        {activeNav === 'Home' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
            {/* Left / Center Main Area (lg:col-span-9) */}
            <div className="lg:col-span-9 flex flex-col gap-4 lg:gap-5">
              {/* Row 1: KPI Metrics Cards */}
              <MetricCards />

              {/* Row 2: Charts (Deals by Lead Source + Deals by Stages) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
                <DealsByLeadSource />
                <DealsByStages />
              </div>

              {/* Row 3: Pipeline & Sales People */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
                {/* Left Column: Deals by Sales People + Total Deals Closed */}
                <div className="flex flex-col gap-4 lg:gap-5">
                  <DealsBySalesPeople />
                  <TotalDealsClosed />
                </div>

                {/* Right Column: Deals in Pipeline by Development */}
                <div>
                  <DealsInPipeline />
                </div>
              </div>

              {/* Row 4: Tables (Active Listing + Leads Contacts) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5">
                <div className="md:col-span-8 lg:col-span-8">
                  <ActiveListingsTable />
                </div>
                <div className="md:col-span-4 lg:col-span-4">
                  <LeadsContacts />
                </div>
              </div>
            </div>

            {/* Right Sidebar (lg:col-span-3) */}
            <div className="lg:col-span-3 flex flex-col gap-4 lg:gap-5">
              <RemindersCard />
              <CalendarCard />
              <ScheduleCard />
            </div>
          </div>
        )}

        {/* Fallback for other tabs */}
        {activeNav !== 'Home' &&
          activeNav !== 'Developments' &&
          activeNav !== 'Buildings' &&
          activeNav !== 'Attorney Firms' &&
          activeNav !== 'Contacts' &&
          activeNav !== 'Leads' &&
          activeNav !== 'Companies' &&
          activeNav !== 'Deals' &&
          activeNav !== 'Reports' &&
          activeNav !== 'Units' && (
            <div className="bg-white rounded-2xl p-8 border border-slate-100 text-center space-y-3">
              <h3 className="text-lg font-bold text-slate-800">{activeNav}</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Module connected to Realtor360 enterprise backend. You can access Leads, Contacts, Buildings, Attorney Firms, Developments, Reports, or return to Home.
              </p>
              <div className="flex justify-center gap-2 pt-2">
                <button
                  onClick={() => setActiveNav('Leads')}
                  className="px-4 py-2 rounded-lg bg-[#C99B30] text-white text-xs font-semibold hover:bg-[#b58928] cursor-pointer transition-colors"
                >
                  Explore Leads
                </button>
                <button
                  onClick={() => setActiveNav('Contacts')}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  Explore Contacts
                </button>
              </div>
            </div>
          )}
      </main>
    </div>
  )
}
