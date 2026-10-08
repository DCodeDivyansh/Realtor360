import React from 'react'
import { ArrowLeft, Printer, Download } from 'lucide-react'
import { Card } from '../ui/Card'
import type { DealItem } from '../../types/deal'

interface DealSheetViewProps {
  deal: DealItem
  onBack: () => void
}

export const DealSheetView: React.FC<DealSheetViewProps> = ({ deal, onBack }) => {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
            title="Back to Deal"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h2 className="text-base sm:text-lg font-bold text-slate-800">
            Deal Sheet
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Sheet</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#C99B30] text-white text-xs font-semibold hover:bg-[#b58928] transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Deal Sheet Document */}
      <Card className="p-6 sm:p-10 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-800 print:shadow-none print:border-none">
        {/* Document Header with Logo & Title */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
              <path
                d="M6 22V12C6 8.68629 8.68629 6 12 6"
                stroke="#C99B30"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <path
                d="M12 26V16C12 12.6863 14.6863 10 18 10"
                stroke="#C99B30"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <path
                d="M18 26V18C18 15.7909 19.7909 14 22 14"
                stroke="#C99B30"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-sm font-bold tracking-wider text-slate-900">
              REALTOR360
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#C99B30] tracking-wide">
            Deal Sheet
          </h1>
        </div>

        {/* 3 Main Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6 text-xs">
          {/* Column 1: Deal Information */}
          <div className="space-y-2.5 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
            <h3 className="font-bold text-sm text-slate-900 mb-3">
              Deal Information
            </h3>
            <div className="flex items-baseline justify-between">
              <span className="text-slate-500 font-normal">Deal Name:</span>
              <span className="font-semibold text-slate-900">{deal.name}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-slate-500 font-normal">Customer:</span>
              <span className="font-semibold text-slate-900">{deal.customerName}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-slate-500 font-normal">Development:</span>
              <span className="font-semibold text-slate-900">{deal.development}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-slate-500 font-normal">Building:</span>
              <span className="font-semibold text-slate-900">{deal.propertyInfo.buildingName}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-slate-500 font-normal">Unit Number:</span>
              <span className="font-semibold text-slate-900">{deal.propertyInfo.unitNumber}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-slate-500 font-normal">Unit Type:</span>
              <span className="font-semibold text-slate-900">{deal.propertyInfo.unitType}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-slate-500 font-normal">Unit Size:</span>
              <span className="font-semibold text-slate-900">{deal.propertyInfo.superBuiltUpArea}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-slate-500 font-normal">Deal Status:</span>
              <span className="font-semibold text-emerald-600 px-2 py-0.5 rounded bg-emerald-50 text-[10px]">
                {deal.status}
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-slate-500 font-normal">Deal Value:</span>
              <span className="font-bold text-slate-900">{deal.dealValue}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-slate-500 font-normal">Deal Owner:</span>
              <span className="font-semibold text-slate-900">{deal.owner}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-slate-500 font-normal">Transaction Date:</span>
              <span className="font-semibold text-slate-900">10/02/2025</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-slate-500 font-normal">Offer Date:</span>
              <span className="font-semibold text-slate-900">05/02/2025</span>
            </div>
          </div>

          {/* Column 2: Buyer & Attorney Information */}
          <div className="space-y-6 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
            <div className="space-y-2.5">
              <h3 className="font-bold text-sm text-slate-900 mb-3">
                Buyer Information
              </h3>
              <div className="flex items-baseline justify-between">
                <span className="text-slate-500 font-normal">Buyer Name:</span>
                <span className="font-semibold text-slate-900">{deal.buyerInfo.name}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-slate-500 font-normal">Phone:</span>
                <span className="font-semibold text-slate-900">{deal.buyerInfo.phone}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-slate-500 font-normal">Email:</span>
                <span className="font-semibold text-slate-900 truncate max-w-[150px]">{deal.buyerInfo.email}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-slate-500 font-normal">Address:</span>
                <span className="font-semibold text-slate-900 text-right max-w-[160px]">{deal.buyerInfo.address}</span>
              </div>
            </div>

            {/* Buyer Attorney Sub-Section */}
            <div className="space-y-2.5 pt-3 border-t border-slate-100">
              <h3 className="font-bold text-sm text-slate-900 mb-3">
                Buyer Attorney Information
              </h3>
              <div className="flex items-baseline justify-between">
                <span className="text-slate-500 font-normal">Name:</span>
                <span className="font-semibold text-slate-900">{deal.buyerInfo.attorneyName || 'Adv. Rajesh Kumar'}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-slate-500 font-normal">Firm:</span>
                <span className="font-semibold text-slate-900">{deal.buyerInfo.attorneyFirm || 'Lex Associates'}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-slate-500 font-normal">Phone:</span>
                <span className="font-semibold text-slate-900">{deal.buyerInfo.attorneyPhone || '+91 98765 11122'}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-slate-500 font-normal">Email:</span>
                <span className="font-semibold text-slate-900 truncate max-w-[150px]">{deal.buyerInfo.attorneyEmail || 'rajesh@lexassociates.com'}</span>
              </div>
            </div>
          </div>

          {/* Column 3: Deal Financials */}
          <div className="space-y-2.5">
            <h3 className="font-bold text-sm text-slate-900 mb-3">
              Deal Financials
            </h3>
            <div className="flex items-baseline justify-between">
              <span className="text-slate-500 font-normal">Unit Area:</span>
              <span className="font-semibold text-slate-900">{deal.dealFinancials.unitArea}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-slate-500 font-normal">Base Price:</span>
              <span className="font-semibold text-slate-900">{deal.dealFinancials.basePrice}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-slate-500 font-normal">Additional Charges:</span>
              <span className="font-semibold text-slate-900">{deal.dealFinancials.additionalCharges}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-slate-500 font-normal">Agreement Value:</span>
              <span className="font-bold text-slate-900 text-sm">{deal.dealFinancials.agreementValue}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-slate-500 font-normal">Registration Date:</span>
              <span className="font-semibold text-slate-900">{deal.dealFinancials.registrationDate}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-slate-500 font-normal">Payment Terms:</span>
              <span className="font-semibold text-slate-900 text-right">{deal.dealFinancials.paymentTerms}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
