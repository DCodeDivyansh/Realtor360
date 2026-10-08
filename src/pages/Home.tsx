import React from 'react'
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

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4F5F8] flex flex-col font-sans text-slate-800">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Dashboard Layout */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto p-3 sm:p-4 md:p-5 lg:p-6">
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
      </main>
    </div>
  )
}
