import React from 'react'
import { ReportIcon, ArrowRightIcon } from '../Icons'
import { useInterview } from '../../hooks/useInterview'
import { useState } from 'react'

/**
 * ReportItem
 *
 * Props:
 * - report: { title, date, score, status }
 * - onView: () => void
 */
const Resumeitem = ({ report, onView = () => {} }) => {

  const { title, createdAt, matchscore } = report
  const {getResumePdf} = useInterview();
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      await getResumePdf(report._id);
    } finally {
      setDownloading(false);
    }
  };
   
    const date = new Date(createdAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-5 sm:px-6 py-4 hover:bg-white/[0.02] transition-colors">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-teal-400/10 text-teal-400">
        <ReportIcon width={16} height={16} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-sm text-slate-100 truncate">{title}</p>
        <p className="text-xs text-slate-500">{date}</p>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center justify-center gap-2 rounded-lg bg-teal-400 px-4 py-2.5 text-sm font-semibold text-[#0B0D12]"
            >
              {downloading && (
                <span className="h-4 w-4 border-2 border-slate-300 border-t-transparent rounded-full animate-spin" />
              )}

              <span>{downloading ? "Downloading..." : "Download"}</span>
            </button>
      </div>
    </div>
  )
}

export default Resumeitem