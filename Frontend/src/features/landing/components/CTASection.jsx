import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { ArrowRightIcon } from '../Icons'

const CTASection = () => {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-[40rem] rounded-full bg-teal-400/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-3xl text-center rounded-3xl border border-white/[0.08] bg-[#12151C]/70 backdrop-blur-xl px-6 py-16 sm:py-20"
      >
        <h2 className="text-3xl sm:text-4xl font-semibold text-slate-50 tracking-tight">
          Ready to Ace Your Next Interview?
        </h2>
        <div className="mt-8 flex justify-center">
          <Link
            to="/register"
            className="flex items-center gap-2 rounded-lg bg-teal-400 px-7 py-3.5 text-sm font-semibold text-[#0B0D12] hover:bg-teal-300 active:scale-[0.99] transition-all"
          >
            Get Started Free
            <ArrowRightIcon />
          </Link>
        </div>
        <p className="mt-5 text-sm text-slate-500">
          Generate your first AI-powered interview report in minutes.
        </p>
      </motion.div>
    </section>
  )
}

export default CTASection