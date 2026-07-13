import React from 'react'

export const PageLoader = ({ label = 'Loading…' }) => (
  <main className="relative min-h-screen w-full bg-[#0B0D12] flex items-center justify-center px-4 overflow-hidden">
    {/* ambient dot grid, consistent with auth pages */}
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.25] sm:opacity-[0.35]"
      style={{
        backgroundImage:
          'radial-gradient(circle, rgba(94,234,212,0.10) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    />
    <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-64 w-80 sm:h-80 sm:w-[36rem] rounded-full bg-teal-400/10 blur-[90px] sm:blur-[100px]" />

    <div className="relative flex flex-col items-center gap-4">
      <Spinner size={36} />
      <span className="font-mono text-[11px] tracking-[0.24em] text-slate-500 uppercase">
        {label}
      </span>
    </div>
  </main>
)

/**
 * Inline spinner — drop anywhere: buttons, cards, small sections.
 * <Spinner size={20} />
 */
export const Spinner = ({ size = 20, className = '' }) => (
  <svg
    className={`animate-spin text-teal-400 ${className}`}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      className="opacity-20"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-90"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
)

/**
 * Inline block loader — for loading states inside a section/card
 * without taking over the full screen.
 */
export const SectionLoader = ({ label = 'Loading…' }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-16">
    <Spinner size={28} />
    <span className="text-xs text-slate-500">{label}</span>
  </div>
)

export default PageLoader