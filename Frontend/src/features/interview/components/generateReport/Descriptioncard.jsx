import React from 'react'

/**
 * DescriptionCard
 *
 * Generic icon-header + textarea card, reused for "About You" and
 * "Job Description" (and any future free-text input) so the styling
 * only lives in one place.
 *
 * Props:
 * - icon: component
 * - title: string
 * - subtitle: string
 * - value: string
 * - onChange: (value: string) => void
 * - placeholder: string
 * - rows: number
 * - maxLength: number
 * - helperText: string
 */
const DescriptionCard = ({
  icon: Icon,
  title,
  subtitle,
  value,
  onChange,
  placeholder,
  rows = 5,
  maxLength = 1000,
  helperText,
}) => {
  const nearLimit = value.length >= maxLength

  return (
    <section className="rounded-xl border border-white/[0.08] bg-[#12151C]/90 backdrop-blur-xl overflow-hidden">
      <div className="flex items-center gap-2 px-5 sm:px-6 py-4 border-b border-white/[0.06]">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-teal-400/10 text-teal-400">
          {Icon && <Icon />}
        </span>
        <h2 className="text-sm font-semibold text-slate-100">{title}</h2>
        <span className="text-xs text-slate-500">{subtitle}</span>
      </div>

      <div className="p-5 sm:p-6">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
          placeholder={placeholder}
          rows={rows}
          className="w-full resize-none rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-teal-400/50 focus:bg-white/[0.04] transition-colors"
        />
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xs text-slate-600">{helperText}</p>
          <p className={`text-xs ${nearLimit ? 'text-amber-400' : 'text-slate-600'}`}>
            {value.length}/{maxLength}
          </p>
        </div>
      </div>
    </section>
  )
}

export default DescriptionCard