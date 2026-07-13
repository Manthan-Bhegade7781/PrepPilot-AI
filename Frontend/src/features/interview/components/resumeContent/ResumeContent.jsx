import React from 'react'
import Resumeitem from './Resumeitem'

/**
 * RecentReports
 *
 * Props:
 * - reports: [{ id, title, date, score, status }]
 * - onViewAll: () => void
 * - onViewReport: (report) => void
 */

const ResumeContent = ({
  reports = [],
  onViewAll = () => {},
  onViewReport = () => {},
}) => {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#12151C]/90 backdrop-blur-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/[0.06]">
        <h2 className="text-sm font-semibold text-slate-100">Resume</h2>
      </div>

      {reports.length === 0 ? (
        <p className="px-6 py-10 text-center text-sm text-slate-500">Generate Report To Download Your Resume</p>
      ) : (
        <div className="divide-y divide-white/[0.05]">
          {reports.map((report) => (
            <Resumeitem key={report._id} report={report} onView={() => onViewReport(report)} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ResumeContent