import React from 'react'
import { CheckIcon } from '../Icons'

/**
 * RoadmapDay
 *
 * Props:
 * - day: number
 * - focus: string
 * - tasks: string[]
 * - isLast: boolean — hides the connecting line after the last item
 */
const RoadmapDay = ({ day, focus, tasks, isLast }) => {
  return (
    <div className="flex gap-4">
      {/* timeline rail */}
      <div className="flex flex-col items-center">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-400/10 border border-teal-400/30 text-sm font-semibold text-teal-400">
          {day}
        </span>
        {!isLast && <span className="w-px flex-1 bg-white/[0.08] mt-2" />}
      </div>

      {/* content */}
      <div className={`flex-1 ${isLast ? '' : 'pb-6'}`}>
        <div className="rounded-xl border border-white/[0.08] bg-[#12151C]/90 backdrop-blur-xl p-5 sm:p-6">
          <p className="text-[11px] font-mono tracking-[0.2em] text-slate-500 uppercase">Day {day}</p>
          <h3 className="mt-1 text-sm font-semibold text-slate-100">{focus}</h3>
          <ul className="mt-3 space-y-2">
            {tasks.map((task) => (
              <li key={task} className="flex items-start gap-2.5 text-sm text-slate-400">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-teal-400">
                  <CheckIcon width={9} height={9} />
                </span>
                {task}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default RoadmapDay