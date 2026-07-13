import React from 'react'
import { motion } from 'framer-motion'
import { UploadIcon, UserIcon, BriefcaseIcon, AwardIcon, ArrowRightIcon } from '../Icons'

const steps = [
  { icon: UploadIcon, title: 'Upload Resume' },
  { icon: UserIcon, title: 'Describe Yourself' },
  { icon: BriefcaseIcon, title: 'Paste Job Description' },
  { icon: AwardIcon, title: 'Receive AI Interview Report & ATS Resume' },
]

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="font-mono text-[11px] tracking-[0.24em] text-teal-400 uppercase">How It Works</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-50 tracking-tight">
            From resume to ready in four steps
          </h2>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="mt-16 hidden lg:flex items-start justify-between relative">
          {steps.map((s, i) => (
            <React.Fragment key={s.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex flex-col items-center text-center w-48"
              >
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-teal-400/25 bg-teal-400/[0.06] text-teal-400">
                  <s.icon />
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-teal-400 text-[11px] font-bold text-[#0B0D12]">
                    {i + 1}
                  </span>
                </div>
                <p className="mt-4 text-sm font-medium text-slate-200">{s.title}</p>
              </motion.div>

              {i < steps.length - 1 && (
                <div className="flex-1 flex items-center justify-center pt-8">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.12 + 0.2 }}
                    className="h-px w-full bg-gradient-to-r from-teal-400/40 to-teal-400/10 origin-left"
                  />
                  <span className="text-teal-400/60 -ml-2">
                    <ArrowRightIcon />
                  </span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile / tablet: vertical timeline */}
        <div className="mt-14 lg:hidden space-y-0">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-teal-400/25 bg-teal-400/[0.06] text-teal-400">
                  <s.icon width={20} height={20} />
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-teal-400 text-[10px] font-bold text-[#0B0D12]">
                    {i + 1}
                  </span>
                </div>
                {i < steps.length - 1 && <span className="w-px flex-1 bg-white/[0.08] my-2" />}
              </div>
              <p className={`text-sm font-medium text-slate-200 ${i < steps.length - 1 ? 'pb-8' : ''} pt-3`}>
                {s.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks