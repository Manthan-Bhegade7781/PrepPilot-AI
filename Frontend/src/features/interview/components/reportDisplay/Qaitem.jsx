import React, { useState } from 'react'
import { ChevronDownIcon } from '../Icons'

/**
 * QAItem
 *
 * Props:
 * - index: number — display order (1-based)
 * - question: string
 * - intention: string
 * - answer: string
 * - defaultOpen: boolean
 */
const QAItem = ({ index, question, intention, answer, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#12151C]/90 backdrop-blur-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start gap-3 px-5 sm:px-6 py-4 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-teal-400/10 text-xs font-semibold text-teal-400">
          {index}
        </span>
        <span className="flex-1 text-sm text-slate-100">{question}</span>
        <span className={`mt-0.5 shrink-0 text-slate-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <ChevronDownIcon />
        </span>
      </button>

      {open && (
        <div className="px-5 sm:px-6 pb-5 pl-[3.25rem] sm:pl-[3.75rem] space-y-3 border-t border-white/[0.06] pt-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Why it's asked</p>
            <p className="mt-1 text-sm text-slate-400">{intention}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Model answer</p>
            <p className="mt-1 text-sm text-slate-300 leading-relaxed">{answer}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default QAItem