import React from 'react'
import { ArrowLeft, ChevronDown, Download, BarChart3, FileSpreadsheet } from 'lucide-react'
import { Card } from '../ui/Card'
import type { LeadReportRow, ReportItem } from '../../types/report'

interface ReportViewerProps {
  report: ReportItem
  rows: LeadReportRow[]
  onBack: () => void
  onOpenCreateChart: () => void
}

export const ReportViewer: React.FC<ReportViewerProps> = ({
  report,
  rows,
  onBack,
  onOpenCreateChart,
}) => {
  const handleExportCSV = () => {
    const headers = ['Lead Source', 'Lead Owner', 'Full Name', 'Company', 'Email', 'Mobile', 'Requirement Type', 'Lead Status', 'Budget']
    const csvContent = [
      headers.join(','),
      ...rows.map((r) =>
        [r.source, r.owner, `"${r.name}"`, `"${r.company}"`, r.email, r.mobile, `"${r.requirementType}"`, r.status, `"${r.budget}"`].join(',')
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${report.name.replace(/\s+/g, '_')}_Report.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card className="p-4 sm:p-5 flex flex-col justify-between h-full bg-white border border-slate-100 rounded-xl shadow-xs space-y-4">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="Back to Reports"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {report.name}
            </h2>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Top-Right Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={onOpenCreateChart}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#C99B30] text-white text-xs font-semibold hover:bg-[#b58928] transition-colors shadow-2xs cursor-pointer"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Create Chart</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <span>Actions</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>
        </div>
      </div>

      {/* Tabular Data View */}
      <div className="overflow-x-auto no-scrollbar flex-1">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-y border-slate-200 text-slate-700 font-semibold">
              <th className="py-2.5 px-3 font-semibold">Lead Source</th>
              <th className="py-2.5 px-3 font-semibold">Lead Owner</th>
              <th className="py-2.5 px-3 font-semibold">Full Name</th>
              <th className="py-2.5 px-3 font-semibold">Company</th>
              <th className="py-2.5 px-3 font-semibold">Email</th>
              <th className="py-2.5 px-3 font-semibold">Mobile</th>
              <th className="py-2.5 px-3 font-semibold">Requirement Type</th>
              <th className="py-2.5 px-3 font-semibold">Lead Status</th>
              <th className="py-2.5 px-3 font-semibold">Budget</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-3 font-medium text-slate-700 whitespace-nowrap">
                  {row.source}
                </td>
                <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
                  {row.owner}
                </td>
                <td className="py-3 px-3 font-semibold text-slate-800 whitespace-nowrap">
                  {row.name}
                </td>
                <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                  {row.company || '—'}
                </td>
                <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                  {row.email}
                </td>
                <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                  {row.mobile}
                </td>
                <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
                  {row.requirementType}
                </td>
                <td className="py-3 px-3 whitespace-nowrap">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700">
                    {row.status}
                  </span>
                </td>
                <td className="py-3 px-3 font-semibold text-slate-800 whitespace-nowrap">
                  {row.budget}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="font-medium text-slate-600">
          Total Records in this Report: {rows.length * 6} Records
        </span>
        <div className="flex items-center gap-1.5 text-slate-400">
          <FileSpreadsheet className="w-4 h-4 text-[#C99B30]" />
          <span>Live Synced with CRM Database</span>
        </div>
      </div>
    </Card>
  )
}
