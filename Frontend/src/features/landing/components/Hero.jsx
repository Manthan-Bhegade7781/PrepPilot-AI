import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { ArrowRightIcon, SparklesIcon } from '../Icons'

const DashboardMockup = () => (
  <div className="relative">
    <div className="absolute -inset-6 rounded-3xl bg-teal-400/10 blur-[60px]" />
    <div className="relative rounded-2xl border border-white/[0.08] bg-[#12151C]/90 backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] p-4 sm:p-5">
      {/* window controls */}
      <div className="flex items-center gap-1.5 pb-3 border-b border-white/[0.06] mb-4">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-teal-400/60" />
      </div>

      <div className="flex gap-4">
        {/* fake sidebar */}
        <div className="hidden sm:flex w-16 shrink-0 flex-col gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`h-8 rounded-md ${i === 0 ? 'bg-teal-400/20 border border-teal-400/30' : 'bg-white/[0.04]'}`} />
          ))}
        </div>

        <div className="flex-1 space-y-4">
          {/* fake topbar */}
          <div className="flex items-center justify-between">
            <div className="h-7 w-28 rounded-md bg-white/[0.04]" />
            <div className="h-7 w-7 rounded-full bg-teal-400/30" />
          </div>

          {/* fake stat cards */}
          <div className="grid grid-cols-3 gap-2">
            {['92%', '24', '9d'].map((v, i) => (
              <div key={i} className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2.5">
                <div className="h-1.5 w-8 rounded bg-white/[0.08] mb-2" />
                <p className="text-sm font-semibold text-teal-400">{v}</p>
              </div>
            ))}
          </div>

          {/* fake chart bars */}
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
            <div className="flex items-end justify-between h-20 gap-1.5">
              {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-teal-500/30 to-teal-400/80" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32 px-4 sm:px-6 lg:px-8">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-teal-400/10 blur-[100px]" />
      <div className="pointer-events-none absolute top-40 right-0 h-96 w-96 rounded-full bg-teal-400/5 blur-[120px]" />

      {/* floating decorative shapes */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute top-28 right-[15%] h-16 w-16 rounded-2xl border border-teal-400/20 bg-teal-400/[0.04] hidden lg:block"
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        aria-hidden
        className="pointer-events-none absolute bottom-16 left-[8%] h-10 w-10 rounded-full border border-teal-400/20 bg-teal-400/[0.04] hidden lg:block"
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      <div className="relative mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/[0.06] px-3.5 py-1.5 text-xs font-medium text-teal-300">
            <SparklesIcon width={14} height={14} />
            AI-Powered Interview Prep
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold tracking-tight leading-[1.1] text-slate-50">
            Prepare Smarter.{' '}
            <span className="bg-gradient-to-r from-teal-300 to-teal-500 bg-clip-text text-transparent">
              Interview Better.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
            PrepPilot-AI helps students and professionals generate personalized interview reports, ATS-friendly
            resumes, identify skill gaps, and create customized preparation roadmaps using AI.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/register"
              className="flex items-center justify-center gap-2 rounded-lg bg-teal-400 px-6 py-3.5 text-sm font-semibold text-[#0B0D12] hover:bg-teal-300 active:scale-[0.99] transition-all"
            >
              Get Started
              <ArrowRightIcon />
            </Link>
            <a
              href="#features"
              className="flex items-center justify-center gap-2 rounded-lg border border-white/[0.12] px-6 py-3.5 text-sm font-medium text-slate-200 hover:bg-white/[0.05] transition-colors"
            >
              Learn More
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400" /> Free to start
            </span>
          </div>
        </motion.div>

        {/* Right: mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:pl-6"
        >
          <DashboardMockup />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero