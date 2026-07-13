import React from 'react'
import { SparklesIcon } from '../Icons'

/**
 * HeroCard
 *
 * Props:
 * - eyebrow: string
 * - title: string
 * - subtitle: string
 * - ctaLabel: string
 * - onCtaClick: () => void
 * - stat: { label, value, caption } | null — optional side stat block (hidden on mobile)
 */
const HeroCard = ({
  eyebrow = 'Overview',
  title = 'Welcome back',
  subtitle = 'Generate AI-powered interview reports and create your plan.',
  ctaLabel = 'Generate Interview Report',
  onCtaClick = () => {},
  stat = { label , value, caption },
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#12151C]/90 backdrop-blur-xl p-6 sm:p-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/70 to-transparent" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-teal-400/10 blur-[80px]" />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.24em] text-slate-500 uppercase">
            {eyebrow}
          </span>
          <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-50 tracking-tight">
            {title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-400">{subtitle}</p>
          <button
            onClick={onCtaClick}
            className="mt-6 flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-teal-400 px-5 py-3 text-sm font-semibold text-[#0B0D12] hover:bg-teal-300 active:scale-[0.99] transition-all"
          >
            <SparklesIcon width={17} height={17} />
            {ctaLabel}
          </button>
        </div>

        {stat && (
          <div className="hidden sm:flex flex-col gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 shrink-0">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
              </span>
              {stat.label}
            </div>
            <p className="text-3xl font-bold text-slate-50 text-center">{stat.value}</p>
            <p className="text-xs text-teal-400/80">{stat.caption}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default HeroCard