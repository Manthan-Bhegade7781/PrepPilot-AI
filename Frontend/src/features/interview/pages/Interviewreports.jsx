import React, { useMemo, useState, useEffect } from 'react'
import { useNavigate, useParams} from 'react-router'
import AppLayout from '../layouts/AppLayout.jsx'
import ReportsToolbar from '../components/Reportstoolbar.jsx'
import { SparklesIcon } from '../components/Icons.jsx'
import { useInterview } from '../hooks/useInterview.js'
import HistoryReport from '../components/HistoryReport.jsx'
import { Spinner } from '../../auth/components/LoadingPage.jsx'

/**
 * InterviewReports
 *
 * Full history of generated reports, sourced from `useReports()` —
 * mirrors the same { data, loading } pattern as `useInterview()` on the
 * single report page.
 */
const InterviewReports = () => {
  const navigate = useNavigate()
  const { reportList, loading,getAllReport } = useInterview()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

    const {reportId} = useParams();
      useEffect(()=>{
          if(reportId){
              getReportById(reportId)
          }else{
              getAllReport();
          }
      },[reportId])

 const filteredReports = useMemo(() => {
    return reportList.filter((r) => {
      const matchesSearch = r.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const status = r.matchscore >= 80 ? "Ready" : "Needs review";

      const matchesStatus =
        statusFilter === "All" || status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [reportList, search, statusFilter]);

  if (loading) {
  return (
    <AppLayout activeNav="Interview Reports">
      <div className="flex flex-col items-center justify-center py-32">
        <Spinner size={36} />

        <p className="mt-5 text-sm text-slate-400">
          Loading interview reports...
        </p>
      </div>
    </AppLayout>
  );
}

  return (
    <AppLayout activeNav="Interview Reports">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.24em] text-slate-500 uppercase">
            History
          </span>
          <h1 className="mt-1 text-xl sm:text-2xl font-semibold text-slate-50 tracking-tight">
            Interview Reports
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {reportList.length} report{reportList.length === 1 ? '' : 's'} generated so far.
          </p>
        </div>

        <button
          onClick={() => navigate('/generate-report')}
          className="flex items-center justify-center gap-2 rounded-lg bg-teal-400 px-4 py-2.5 text-sm font-semibold text-[#0B0D12] hover:bg-teal-300 active:scale-[0.99] transition-all"
        >
          <SparklesIcon width={16} height={16} />
          Generate Report
        </button>
      </div>

      <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
        <ReportsToolbar
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        {reportList.length === 0 ? (
          <div className="rounded-xl border border-white/[0.08] bg-[#12151C]/90 backdrop-blur-xl px-6 py-16 flex flex-col items-center text-center">
            <h2 className="text-lg font-semibold text-slate-100">No interview reports yet</h2>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
              Generate your first AI interview report to see it show up here.
            </p>
          </div>
        ) : (
          <HistoryReport
            reports={filteredReports}
            title={`Showing ${filteredReports.length} of ${reportList.length}`}
            showViewAll={false}
            onViewReport={(report) => navigate(`/report/${report._id}`)}
            emptyMessage="No reports match your search or filter."
          />
        )}
      </div>
    </AppLayout>
  )
}

export default InterviewReports