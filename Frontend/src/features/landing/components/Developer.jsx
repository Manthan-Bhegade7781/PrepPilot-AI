import React from 'react'
import { motion } from 'framer-motion'
import { GithubIcon, LinkedinIcon, GlobeIcon, MailIcon } from '../Icons'

const socials = [
  { label: 'GitHub', icon: GithubIcon, href: 'https://github.com/Manthan-Bhegade7781' },
  { label: 'LinkedIn', icon: LinkedinIcon, href: 'https://www.linkedin.com/in/manthanbhegade/' },
  { label: 'Portfolio', icon: GlobeIcon, href: 'https://manthanbhegade-portfolio.vercel.app/' },
  { label: 'Email', icon: MailIcon, href: 'mailto:manthanbhegade407@gmail.com' },
]

const Developer = () => {
  return (
    <section id="developer" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-teal-400/[0.06] blur-[110px]" />

      <div className="relative mx-auto max-w-3xl text-center">
        <span className="font-mono text-[11px] tracking-[0.24em] text-teal-400 uppercase">Developer</span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-50 tracking-tight">
          Meet the Developer
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 rounded-2xl border border-white/[0.08] bg-[#12151C]/90 backdrop-blur-xl p-8 sm:p-10 text-left"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <span className="flex h-30 w-30 shrink-0 overflow-hidden rounded-2xl border-2 border-teal-400 shadow-lg shadow-teal-400/20">
              <img
                src="/manthan.jpeg"
                alt="Manthan Bhegade"
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </span>
            <div>
              <h3 className="text-xl font-semibold text-slate-50">Manthan Bhegade</h3>
              <p className="text-sm text-teal-400 mt-0.5">Full Stack Developer</p>
              <p className="text-xs text-slate-500 mt-1">B.Tech Computer Engineering</p>
              <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-xl">
                Passionate Full Stack Developer specializing in React.js, Node.js, Express.js, MongoDB, and
                AI-powered applications. Focused on building scalable web applications and solving real-world
                problems with modern technologies.
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap justify-center sm:justify-start gap-3">
            {socials.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.02] px-4 py-2 text-sm text-slate-300 hover:border-teal-400/30 hover:text-teal-300 hover:bg-teal-400/[0.05] transition-colors"
              >
                <Icon />
                {label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Developer