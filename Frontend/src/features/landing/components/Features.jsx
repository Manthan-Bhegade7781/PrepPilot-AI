import React from 'react'
import { motion } from 'framer-motion'
import FeatureCard from './FeatureCard.jsx'
import { SparklesIcon, FileTextIcon, TargetIcon, MapIcon } from '../Icons.jsx'

const features = [
  {
    icon: SparklesIcon,
    title: 'AI Interview Reports',
    description:
      'Generate personalized technical and behavioral interview questions tailored to your resume and job description.',
  },
  {
    icon: FileTextIcon,
    title: 'ATS Resume Generator',
    description: 'Generate modern ATS-optimized resumes customized for every job application.',
  },
  {
    icon: TargetIcon,
    title: 'Skill Gap Analysis',
    description: 'Analyze missing skills between your resume and the target job role.',
  },
  {
    icon: MapIcon,
    title: 'AI Preparation Roadmap',
    description: 'Receive a personalized 7-day interview preparation roadmap.',
  },
]

const Features = () => {
  return (
    <section id="features" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="font-mono text-[11px] tracking-[0.24em] text-teal-400 uppercase">Features</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-50 tracking-tight">
            Everything you need to walk in ready
          </h2>
          <p className="mt-4 text-slate-400">
            From tailored questions to a full preparation roadmap — PrepPilot-AI covers the whole journey.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features