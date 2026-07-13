import React from 'react'
import { ArrowLeftIcon, ReportIcon, PlannerIcon, UserIcon } from '../Icons'

const tabs = [
  { key: 'technical', label: 'Technical Questions', icon: ReportIcon },
  { key: 'behavioral', label: 'Behavioral Questions', icon: UserIcon },
  { key: 'roadmap', label: 'Road Map', icon: PlannerIcon },
]

/**
 * ReportNav
 *
 * Props:
 * - activeTab: 'technical' | 'behavioral' | 'roadmap'
 * - onTabChange: (key: string) => void
 * - onBack: () => void
 *
 * Mobile (<lg): horizontal scrollable pill tabs, since the left rail sits
 * above the main content in the stacked layout and a vertical list would
 * eat too much vertical space before the user reaches the report itself.
 * Desktop (lg+): vertical stacked list, sitting in its own fixed rail.
 */
const ReportNav = ({ activeTab, onTabChange, onBack }) => {
  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-teal-400 transition-colors"
      >
        <ArrowLeftIcon />
        Back to DashBoard
      </button>

      {/* Mobile / tablet: horizontal scrollable pills */}
      <nav className="flex flex-col gap-2 lg:hidden">
        {tabs.map(({ key, label, icon: Icon }) => {
          const active = activeTab === key
          return (
            <button
              key={key}
              onClick={() => onTabChange(key)}
              className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors ${
                active
                  ? "bg-teal-400/10 text-teal-300 border-teal-400/30"
                  : "bg-white/[0.02] text-slate-400 border-white/[0.08] hover:bg-white/[0.04] hover:text-slate-200"
              }`}
            >
              <Icon
                className={active ? "text-teal-400 shrink-0" : "shrink-0"}
                width={16}
                height={16}
              />
              <span>{label}</span>
            </button>
          )
        })}
      </nav>

      {/* Desktop: vertical stacked list */}
      <nav className="hidden lg:block space-y-1.5">
        {tabs.map(({ key, label, icon: Icon }) => {
          const active = activeTab === key
          return (
            <button
              key={key}
              onClick={() => onTabChange(key)}
              className={`flex w-full items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-sm text-left transition-colors ${
                active
                  ? 'bg-teal-400/10 text-teal-300 border-teal-400/20'
                  : 'bg-white/[0.02] text-slate-400 border-white/[0.08] hover:bg-white/[0.04] hover:text-slate-200'
              }`}
            >
              <Icon className={active ? 'text-teal-400 shrink-0' : 'shrink-0'} />
              <span className="truncate">{label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default ReportNav