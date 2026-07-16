import React,{useState} from 'react'
import { ReportIcon, ArrowRightIcon } from '../Icons'
import { useInterview } from '../../hooks/useInterview';
import { createPortal } from "react-dom";

/**
 * ReportItem
 *
 * Props:
 * - report: { title, date, score, status }
 * - onView: () => void
 */
const ReportItem = ({ report, onView = () => {} }) => {

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const { title, createdAt, matchscore } = report
   
    const date = new Date(createdAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const scoreColor =
    matchscore >= 80 ? 'text-teal-400' : matchscore >= 70 ? 'text-amber-400' : 'text-orange-400'

  const status =
  matchscore >= 80
    ? "Ready"
    : matchscore >= 60
    ? "Needs Improvement"
    : "Not Ready";

  const statusStyle =
  status === "Ready"
    ? "bg-teal-400/10 text-teal-300 border border-teal-400/20"
    : status === "Needs Improvement"
    ? "bg-amber-400/10 text-amber-300 border border-amber-400/20"
    : "bg-red-400/10 text-red-300 border border-red-400/20";
     
    const {deleteReport}= useInterview();

    const handleDelete = async () => {
      try {
        await deleteReport(selectedReport._id);

        setShowDeleteModal(false);
        setSelectedReport(null);
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <>
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-4 lg:px-5 py-4">

  {/* Left */}
  <div
    onClick={onView}
    className="flex items-center gap-4 flex-1 min-w-0 cursor-pointer"
  >
    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-teal-400/10 text-teal-400">
      <ReportIcon width={16} height={16} />
    </span>

    <div className="min-w-0">
      <p className="truncate text-xs sm:text-sm font-medium text-slate-100">
        {title}
      </p>
      <p className="text-[11px] sm:text-xs text-slate-500">{date}</p>
    </div>
  </div>

  {/* Right */}
 <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 lg:gap-3 w-full lg:w-auto">

    <div className="flex flex-wrap items-center gap-2">
      <span className={`text-sm font-semibold ${scoreColor}`}>
        {matchscore}%
      </span>

      <span className={`rounded-full px-2 lg:px-3 py-1 text-[11px] lg:text-xs ${statusStyle}`}>
        {status}
      </span>
    </div>

    <div className="flex flex-wrap gap-2 w-full lg:w-auto">
      <button
        onClick={onView}
        className="flex-1 lg:flex-none rounded-lg bg-teal-400 px-3 lg:px-4 py-2 text-sm font-medium text-[#0B0D12] hover:bg-teal-300"
      >
        View
      </button>

      <button
        onClick={()=>{
        setShowDeleteModal(true);
        setSelectedReport(report);
        }}
        className="flex-1 lg:flex-none rounded-lg border border-red-500/30 bg-red-500/10 px-3 lg:px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/20"
      >
        Delete
      </button>
    </div>

  </div>
</div>

  {showDeleteModal &&
  createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

  <div className="w-full max-w-sm rounded-xl border border-white/10 bg-[#12151C] p-5 shadow-2xl">

    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-xl">
      🗑️
    </div>

    <h2 className="mt-4 text-center text-lg font-semibold text-white">
      Delete Report?
    </h2>

    <p className="mt-2 text-center text-sm text-slate-400 leading-6">
      Are you sure you want to delete
    </p>

    <p className="mt-1 text-center text-sm font-medium text-slate-200 line-clamp-2">
      "{selectedReport?.title}"
    </p>

    <div className="mt-5 flex gap-2">
      <button
        onClick={() => {
          setShowDeleteModal(false);
          setSelectedReport(null);
        }}
        className="flex-1 rounded-lg border border-white/10 bg-white/5 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 transition"
      >
        Cancel
      </button>

      <button
        onClick={handleDelete}
        className="flex-1 rounded-lg bg-red-500 py-2 text-sm font-semibold text-white hover:bg-red-600 transition"
      >
        Delete
      </button>
    </div>

  </div>

</div>,
    document.body
  )}
</>
  )
}

export default ReportItem