import React from 'react'
import { AlertTriangleIcon } from '../Icons'

const severityStyles = {
  high: 'bg-orange-400/10 text-orange-300 border-orange-400/25',
  medium: 'bg-amber-400/10 text-amber-300 border-amber-400/25',
  low: 'bg-teal-400/10 text-teal-300 border-teal-400/20',
}

const severityDot = {
  high: 'bg-orange-400',
  medium: 'bg-amber-400',
  low: 'bg-teal-400',
}

/**
 * SkillGapsPanel
 *
 * Props:
 * - matchScore: number
 * - skillsGaps: [{ skill, severity: 'low' | 'medium' | 'high' }]
 */
const SkillGapsPanel = ({ matchScore, skillsGaps }) => {
  const radius = 42
  const circumference = 2 * Math.PI * radius

  const scoreColor =
  matchScore >= 80
    ? "#2dd4bf" // Teal
    : matchScore >= 60
    ? "#f59e0b" // Amber
    : "#f97316"; // Orange

const scoreTextColor =
  matchScore >= 80
    ? "text-teal-400"
    : matchScore >= 60
    ? "text-amber-400"
    : "text-orange-400";

  return (
    <aside className="lg:sticky lg:top-24 space-y-4">
      {/* Match score */}
      <div className="rounded-xl border border-white/[0.08] bg-[#12151C]/90 backdrop-blur-xl p-5 sm:p-6">
        <h3 className="text-sm font-semibold text-slate-100">Match Score</h3>
        <div className="mt-4 flex items-center justify-center">
          <div className="relative h-24 w-24">
            <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
              <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={scoreColor}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - matchScore / 100)}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-xl font-semibold ${scoreTextColor}`}>{matchScore}%</span>
            </div>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-slate-500">
          How closely your resume and background match this role.
        </p>
      </div>

      {/* Skill gaps */}
      <div className="rounded-xl border border-white/[0.08] bg-[#12151C]/90 backdrop-blur-xl p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <AlertTriangleIcon className="text-amber-400" />
          <h3 className="text-sm font-semibold text-slate-100">Skill Gaps</h3>
        </div>
        <p className="mt-1 text-xs text-slate-500">Areas to strengthen before the interview.</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {skillsGaps.map(({ skill, severity }) => (
            <span
              key={skill}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium ${
                severityStyles[severity] || severityStyles.low
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${severityDot[severity] || severityDot.low}`} />
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-4 pt-3 border-t border-white/[0.06] text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" /> High
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Medium
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400" /> Low
          </span>
        </div>
      </div>
    </aside>
  )
}

export default SkillGapsPanel