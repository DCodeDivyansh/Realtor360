import React from 'react'
import { ArrowLeft, Printer, Download } from 'lucide-react'
import { Card } from '../ui/Card'
import type { DealItem } from '../../types/deal'

interface OfferFormViewProps {
  deal: DealItem
  onBack: () => void
}

export const OfferFormView: React.FC<OfferFormViewProps> = ({ deal, onBack }) => {
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
            Offer Form
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Form</span>
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

      {/* Offer Form Paper Sheet */}
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
            Offer Form
          </h1>
        </div>

        {/* Section 1: Buyer Details & Property Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 text-xs border-b border-slate-100">
          {/* Left Column: Buyer's Details */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-800 mb-3">
              Buyer's Details
            </h3>
            <div className="flex items-baseline">
              <span className="w-32 text-slate-500 font-normal">Full Name:</span>
              <span className="font-semibold text-slate-900">{deal.buyerInfo.name}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-32 text-slate-500 font-normal">Phone Number:</span>
              <span className="font-semibold text-slate-900">{deal.buyerInfo.phone}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-32 text-slate-500 font-normal">Email Address:</span>
              <span className="font-semibold text-slate-900">{deal.buyerInfo.email}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-32 text-slate-500 font-normal">Address:</span>
              <span className="font-semibold text-slate-900">{deal.buyerInfo.address}</span>
            </div>
          </div>

          {/* Right Column: Property Information */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-800 mb-3">
              Property Information
            </h3>
            <div className="flex items-baseline">
              <span className="w-40 text-slate-500 font-normal">Unit ID:</span>
              <span className="font-semibold text-slate-900">{deal.propertyInfo.unitId}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-40 text-slate-500 font-normal">Development Name:</span>
              <span className="font-semibold text-slate-900">{deal.propertyInfo.developmentName}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-40 text-slate-500 font-normal">Building Name:</span>
              <span className="font-semibold text-slate-900">{deal.propertyInfo.buildingName}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-40 text-slate-500 font-normal">Unit Number:</span>
              <span className="font-semibold text-slate-900">{deal.propertyInfo.unitNumber}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-40 text-slate-500 font-normal">Unit Type:</span>
              <span className="font-semibold text-slate-900">{deal.propertyInfo.unitType}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-40 text-slate-500 font-normal">Super Built-up Area:</span>
              <span className="font-semibold text-slate-900">{deal.propertyInfo.superBuiltUpArea}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-40 text-slate-500 font-normal">Floor No.:</span>
              <span className="font-semibold text-slate-900">{deal.propertyInfo.floorNo}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Gold Banner - Offer Details */}
        <div className="mt-6 mb-4 px-4 py-2 bg-[#C99B30] text-white font-bold text-sm tracking-wide rounded-sm">
          Offer Details
        </div>

        {/* Section 2 Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-3 text-xs">
          {/* Left Column: Commercials */}
          <div className="space-y-3">
            <div className="flex items-baseline">
              <span className="w-44 text-slate-500 font-normal">Offer Price ($):</span>
              <span className="font-bold text-slate-900 text-sm">{deal.offerDetails.offerPrice}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-44 text-slate-500 font-normal">Booking Amount ($):</span>
              <span className="font-semibold text-slate-900">{deal.offerDetails.bookingAmount}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-44 text-slate-500 font-normal">Payment Terms:</span>
              <span className="font-semibold text-slate-900">{deal.offerDetails.paymentTerms}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-44 text-slate-500 font-normal">Loan Sanction Required:</span>
              <span className="font-semibold text-slate-900">{deal.offerDetails.loanSanctionRequired}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-44 text-slate-500 font-normal">Possession Date Expected:</span>
              <span className="font-semibold text-slate-900">{deal.offerDetails.possessionDateExpected}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-44 text-slate-500 font-normal">Preferred Payment Method:</span>
              <span className="font-semibold text-slate-900">{deal.offerDetails.preferredPaymentMethod}</span>
            </div>
          </div>

          {/* Right Column: Broker Information */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-800 mb-2">
              Broker / Sales Agent Info
            </h3>
            <div className="flex items-baseline">
              <span className="w-36 text-slate-500 font-normal">Broker Name:</span>
              <span className="font-semibold text-slate-900">{deal.offerDetails.brokerName}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-36 text-slate-500 font-normal">Contact Number:</span>
              <span className="font-semibold text-slate-900">{deal.offerDetails.brokerPhone}</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-36 text-slate-500 font-normal">Agency/Firm Name:</span>
              <span className="font-semibold text-slate-900">{deal.offerDetails.agencyName}</span>
            </div>
          </div>
        </div>

        {/* Section 3: Signatures Footer */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider mb-6">
            Signatures
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs text-slate-600">
            <div>
              <div className="border-b border-slate-400 pb-1 mb-2 font-serif italic text-slate-800 text-sm">
                {deal.buyerInfo.name}
              </div>
              <span className="text-slate-500">Buyer Signature: {deal.buyerInfo.name}</span>
            </div>

            <div>
              <div className="border-b border-slate-400 pb-1 mb-2 font-serif italic text-slate-800 text-sm">
                {deal.offerDetails.brokerName}
              </div>
              <span className="text-slate-500">Authorized Broker: {deal.offerDetails.brokerName}</span>
            </div>

            <div>
              <div className="border-b border-slate-400 pb-1 mb-2 font-mono text-slate-800 text-xs">
                05/02/2025
              </div>
              <span className="text-slate-500">Date of Execution</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
