import React from 'react'
import ReportItem from './Reportitem.jsx'

/**
 * RecentReports
 *
 * Props:
 * - reports: [{ id, title, date, score, status }]
 * - onViewAll: () => void
 * - onViewReport: (report) => void
 */

const RecentReports = ({
  reports = [],
  onViewAll = () => {},
  onViewReport = () => {},
}) => {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#12151C]/90 backdrop-blur-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/[0.06]">
        <h2 className="text-sm font-semibold text-slate-100">Recent Reports</h2>
        <button onClick={onViewAll} className="text-xs text-teal-400 hover:text-teal-300 transition-colors">
          View all
        </button>
      </div>

      {reports.length === 0 ? (
        <p className="px-6 py-10 text-center text-sm text-slate-500">No reports yet. Generate your first one above.</p>
      ) : (
        <div className="divide-y divide-white/[0.05]">
          {reports.map((report) => (
            <ReportItem key={report._id} report={report} onView={() => onViewReport(report)} />
          ))}
        </div>
      )}
    </div>
  )
}

export default RecentReports