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

// New screens components
import { DevelopmentsFilterSidebar } from '../components/developments/DevelopmentsFilterSidebar'
import { DevelopmentsList } from '../components/developments/DevelopmentsList'
import { DevelopmentDetails } from '../components/developments/DevelopmentDetails'
import { StackingPlanReports } from '../components/reports/StackingPlanReports'
import { DEVELOPMENTS_DATA } from '../data/developmentsData'
import type { DevelopmentFilterState, DevelopmentItem } from '../types/developments'

const INITIAL_FILTERS: DevelopmentFilterState = {
  searchQuery: '',
  cities: [],
  types: [],
  tags: [],
  attorneyFirms: [],
  noOfBuildings: [],
  priceRanges: [],
}

export const Home: React.FC = () => {
  const [activeNav, setActiveNav] = useState('Home')
  const [selectedDevelopment, setSelectedDevelopment] = useState<DevelopmentItem | null>(null)
  const [filters, setFilters] = useState<DevelopmentFilterState>(INITIAL_FILTERS)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  // Handle switching navigation tabs
  const handleNavSelect = (item: string) => {
    setActiveNav(item)
    // If user clicked developments, keep or clear selection appropriately
    if (item === 'Developments' && !selectedDevelopment) {
      setSelectedDevelopment(null)
    }
  }

  // Filter developments based on sidebar filters
  const filteredDevelopments = DEVELOPMENTS_DATA.filter((dev) => {
    if (filters.cities.length > 0 && !filters.cities.includes(dev.city)) return false
    if (filters.types.length > 0 && !filters.types.includes(dev.type)) return false
    if (filters.attorneyFirms.length > 0 && !filters.attorneyFirms.includes(dev.attorneyFirm)) return false
    if (filters.noOfBuildings.length > 0) {
      const match = filters.noOfBuildings.some((b) => {
        if (b === '4+') return dev.noOfBuildings >= 4
        return dev.noOfBuildings === parseInt(b, 10)
      })
      if (!match) return false
    }
    if (filters.tags.length > 0 && !dev.tags.some((t) => filters.tags.includes(t))) return false
    return true
  })

  return (
    <div className="min-h-screen bg-[#F4F5F8] flex flex-col font-sans text-slate-800">
      {/* Top Navbar */}
      <Navbar activeItem={activeNav} onSelectItem={handleNavSelect} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto p-3 sm:p-4 md:p-5 lg:p-6">
        {/* VIEW 1 & 2 & 3: DEVELOPMENTS */}
        {activeNav === 'Developments' && (
          <div>
            {selectedDevelopment ? (
              /* View 2 & View 3: Development Details */
              <DevelopmentDetails
                development={selectedDevelopment}
                onBack={() => setSelectedDevelopment(null)}
              />
            ) : (
              /* View 1: Developments List with Filter Sidebar */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
                {/* Desktop Left Sidebar: Filters */}
                <div className="hidden lg:block lg:col-span-3">
                  <DevelopmentsFilterSidebar
                    filters={filters}
                    onFilterChange={setFilters}
                    onApplyFilters={() => {}}
                    onResetFilters={() => setFilters(INITIAL_FILTERS)}
                  />
                </div>

                {/* Mobile Filter Drawer */}
                {mobileFilterOpen && (
                  <div className="lg:hidden col-span-12">
                    <DevelopmentsFilterSidebar
                      filters={filters}
                      onFilterChange={setFilters}
                      onApplyFilters={() => setMobileFilterOpen(false)}
                      onResetFilters={() => {
                        setFilters(INITIAL_FILTERS)
                        setMobileFilterOpen(false)
                      }}
                    />
                  </div>
                )}

                {/* Main List */}
                <div className="lg:col-span-9">
                  <DevelopmentsList
                    developments={filteredDevelopments}
                    onSelectDevelopment={(dev) => setSelectedDevelopment(dev)}
                    onToggleMobileFilter={() => setMobileFilterOpen(!mobileFilterOpen)}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: REPORTS / STACKING PLAN REPORTS */}
        {(activeNav === 'Reports' || activeNav === 'Units' || activeNav === 'Buildings') && (
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

        {/* Fallback for other tabs: Leads, Companies, Contacts, Deals, Activities */}
        {activeNav !== 'Home' && activeNav !== 'Developments' && activeNav !== 'Reports' && activeNav !== 'Units' && activeNav !== 'Buildings' && (
          <div className="bg-white rounded-2xl p-8 border border-slate-100 text-center space-y-3">
            <h3 className="text-lg font-bold text-slate-800">{activeNav}</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Module currently connected to Realtor360 enterprise backend. You can access Developments, Reports, or return to Home.
            </p>
            <button
              onClick={() => setActiveNav('Developments')}
              className="px-4 py-2 rounded-lg bg-[#C99B30] text-white text-xs font-semibold hover:bg-[#b58928] transition-colors"
            >
              Explore Developments
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
