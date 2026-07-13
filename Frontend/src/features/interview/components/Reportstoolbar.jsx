import React from 'react'
import { SearchIcon } from './Icons'

const filters = ['All', 'Ready', 'Needs review']

/**
 * ReportsToolbar
 *
 * Props:
 * - searchValue: string
 * - onSearchChange: (value: string) => void
 * - statusFilter: 'All' | 'Ready' | 'Needs review'
 * - onStatusFilterChange: (value: string) => void
 */
const ReportsToolbar = ({
  statusFilter,
  onStatusFilterChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">

      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 sm:mx-0 sm:px-0">
        {filters.map((f) => {
          const active = statusFilter === f
          return (
            <button
              key={f}
              onClick={() => onStatusFilterChange(f)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                active
                  ? 'bg-teal-400/10 text-teal-300 border-teal-400/30'
                  : 'bg-white/[0.02] text-slate-400 border-white/[0.08] hover:bg-white/[0.04] hover:text-slate-200'
              }`}
            >
              {f}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ReportsToolbar