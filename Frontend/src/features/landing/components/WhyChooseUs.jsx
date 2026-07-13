import React from 'react'
import { motion } from 'framer-motion'
import { CheckIcon } from '../Icons'

const points = [
  'AI Powered Resume Analysis',
  'ATS Friendly Resume Generation',
  'Personalized Interview Questions',
  'Behavioral Interview Preparation',
  'Technical Question Generation',
  'Skill Gap Detection',
  'AI Roadmap Generation',
]

const WhyChooseUs = () => {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-64 bg-teal-400/[0.04] blur-[100px]" />

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="font-mono text-[11px] tracking-[0.24em] text-teal-400 uppercase">Why PrepPilot-AI</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-50 tracking-tight">
            Built to cover every angle of prep
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {points.map((point, i) => (
            <motion.div
              key={point}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 hover:bg-white/[0.04] hover:border-teal-400/20 transition-colors"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-400/10 text-teal-400">
                <CheckIcon />
              </span>
              <span className="text-sm text-slate-200">{point}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs