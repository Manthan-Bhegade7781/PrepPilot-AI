import React from 'react'
import { SparklesIcon, CheckIcon, LoaderIcon } from '../Icons'

/**
 * ReadinessPanel
 *
 * Props:
 * - steps: [{ label: string, done: boolean }]
 * - status: 'idle' | 'generating' | 'done'
 * - errorMessage: string | null
 * - onGenerate: () => void
 * - onReset: () => void
 * - onViewReports: () => void
 */
const ReadinessPanel = ({
  steps,
  status,
  errorMessage,
  onGenerate,
  onReset,
  onViewReports = () => {},
}) => {
  const completedCount = steps.filter((s) => s.done).length
  const progressPct = Math.round((completedCount / steps.length) * 100)
  const canGenerate = completedCount === steps.length && status !== 'generating'

  const radius = 52
  const circumference = 2 * Math.PI * radius

  return (
    <aside className="lg:sticky lg:top-24 space-y-4">
      <div className="rounded-xl border border-white/[0.08] bg-[#12151C]/90 backdrop-blur-xl p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-100">Readiness</h3>
          <span className="text-xs text-slate-500">
            {completedCount}/{steps.length} complete
          </span>
        </div>

        {/* progress ring */}
        <div className="mt-5 flex items-center justify-center">
          <div className="relative h-32 w-32">
            <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
              <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="#2dd4bf"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progressPct / 100)}
                style={{ transition: 'stroke-dashoffset 500ms ease' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-semibold text-slate-50">{progressPct}%</span>
              <span className="text-[10px] uppercase tracking-wide text-slate-500">ready</span>
            </div>
          </div>
        </div>

        {/* checklist */}
        <ul className="mt-6 space-y-2.5">
          {steps.map((s) => (
            <li key={s.label} className="flex items-center gap-2.5 text-sm">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  s.done ? 'bg-teal-400 border-teal-400 text-[#0B0D12]' : 'border-white/[0.15] text-transparent'
                }`}
              >
                <CheckIcon width={11} height={11} />
              </span>
              <span className={s.done ? 'text-slate-200' : 'text-slate-500'}>{s.label}</span>
            </li>
          ))}
        </ul>

        {errorMessage && (
          <p className="mt-4 rounded-md border border-red-400/20 bg-red-400/[0.06] px-3 py-2 text-xs text-red-300">
            {errorMessage}
          </p>
        )}

        <button
          onClick={onGenerate}
          disabled={!canGenerate}
          className={`mt-6 hidden lg:flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all ${
            canGenerate
              ? 'bg-teal-400 text-[#0B0D12] hover:bg-teal-300 active:scale-[0.99]'
              : 'bg-white/[0.04] text-slate-600 cursor-not-allowed'
          }`}
        >
          {status === 'generating' ? (
            <>
              <LoaderIcon className="animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <SparklesIcon width={16} height={16} />
              Generate Report
            </>
          )}
        </button>

        {status === 'done' && (
          <div className="mt-4 rounded-lg border border-teal-400/20 bg-teal-400/[0.06] px-4 py-3">
            <div className="flex items-center gap-2 text-teal-300 text-sm font-medium">
              <CheckIcon />
              Report ready
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Your interview report has been generated and saved to Interview Reports.
            </p>
            <div className="mt-3 flex items-center gap-4">
              <button onClick={onViewReports} className="text-xs text-teal-400 hover:text-teal-300 transition-colors">
                View reports
              </button>
              <button onClick={onReset} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                Start another session
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-white/[0.08] bg-[#12151C]/60 backdrop-blur-xl p-5 sm:p-6">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Good to know</h4>
        <p className="mt-2 text-xs text-slate-500 leading-relaxed">
          Reports typically take under a minute. We compare your resume and self description against the job
          description to surface skill gaps and generate mock interview questions tailored to the role.
        </p>
      </div>
    </aside>
  )
}

export default ReadinessPanel