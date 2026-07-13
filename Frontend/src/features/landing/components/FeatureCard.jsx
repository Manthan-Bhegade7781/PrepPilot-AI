import React from 'react'
import { motion } from 'framer-motion'

/**
 * FeatureCard
 *
 * Props:
 * - icon: component
 * - title: string
 * - description: string
 * - index: number — used for stagger delay
 */
const FeatureCard = ({ icon: Icon, title, description, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl border border-white/[0.08] bg-[#12151C]/80 backdrop-blur-xl p-6 sm:p-7 transition-all duration-300 hover:border-teal-400/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(45,212,191,0.15)]"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-400/10 text-teal-400 group-hover:bg-teal-400/15 transition-colors">
        <Icon />
      </div>
      <h3 className="mt-5 text-base font-semibold text-slate-50">{title}</h3>
      <p className="mt-2 text-sm text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  )
}

export default FeatureCard