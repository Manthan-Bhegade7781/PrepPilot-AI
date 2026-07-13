import React from 'react'
import { motion } from 'framer-motion'
import { CheckIcon } from '../Icons'

const outputs = [
  'Match Score',
  'Technical Questions',
  'Behavioral Questions',
  'Skill Gap Analysis',
  'Personalized Preparation Roadmap',
  'ATS-Friendly Resume',
]

const MatchScoreRing = () => {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const score = 92

  return (
    <div className="relative rounded-2xl border border-white/[0.08] bg-[#12151C]/90 backdrop-blur-xl p-8 flex flex-col items-center">
      <div className="absolute -inset-4 rounded-3xl bg-teal-400/10 blur-[50px] -z-10" />
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#2dd4bf"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: circumference * (1 - score / 100) }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold text-slate-50">{score}%</span>
          <span className="text-[10px] uppercase tracking-wide text-slate-500">match</span>
        </div>
      </div>
      <p className="mt-4 text-xs text-slate-500 text-center">Sample match score from a generated report</p>
    </div>
  )
}

const About = () => {
  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-[11px] tracking-[0.24em] text-teal-400 uppercase">About</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-50 tracking-tight">
            About PrepPilot-AI
          </h2>
          <p className="mt-5 text-slate-400 leading-relaxed max-w-xl">
            PrepPilot-AI is an AI-powered interview preparation platform that helps students and professionals
            prepare for interviews by analyzing resumes against job descriptions.
          </p>
          <p className="mt-4 text-sm font-medium text-slate-300">The platform generates:</p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {outputs.map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-sm text-slate-300">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-400/10 text-teal-400">
                  <CheckIcon width={11} height={11} />
                </span>
                {item}
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-slate-500 leading-relaxed max-w-xl">
            The goal is to make interview preparation faster, smarter, and more personalized.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <MatchScoreRing />
        </motion.div>
      </div>
    </section>
  )
}

export default About