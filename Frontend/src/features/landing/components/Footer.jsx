import React from 'react'

const techStack = ['React', 'Node.js', 'Express.js', 'MongoDB', 'Gemini AI', 'Puppeteer', 'Tailwind CSS']

const Footer = () => {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#12151C]/80 backdrop-blur-xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mx-auto max-w-7xl flex flex-col items-center text-center gap-6">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-teal-400" />
          <span className="text-base font-semibold tracking-tight text-slate-50">
            PrepPilot<span className="text-teal-400">-AI</span>
          </span>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Built using</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1.5 text-xs text-slate-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-600 pt-4 border-t border-white/[0.06]  w-full">
          © 2026 PrepPilot-AI. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer