import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { MenuIcon, XIcon } from '../Icons'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About', href: '#about' },
  { label: 'Developer', href: '#developer' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4 bg-[#0B0D12]/80 backdrop-blur-xl border-b border-white/[0.06]' : 'py-6 bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
          </span>
          <span className="text-2xl font-bold tracking-tight text-slate-50">
            PrepPilot<span className="text-teal-400">-AI</span>
          </span>
        </Link>

        {/* Center links — desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-slate-400 hover:text-slate-100 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right buttons — desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-lg border bg-white/[0.20] border-white/[0.12] px-4 py-2 text-sm font-medium text-slate-200 hover:bg-white/[0.05] transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-teal-400 px-4 py-2 text-sm font-semibold text-[#0B0D12] hover:bg-teal-300 active:scale-[0.99] transition-all"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-300"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden mt-3 mx-4 rounded-xl border border-white/[0.08] bg-[#12151C]/95 backdrop-blur-xl p-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/[0.04] hover:text-slate-100 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 mt-2 border-t border-white/[0.06] flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg border border-white/[0.12] px-4 py-2.5 text-center text-sm font-medium text-slate-200 hover:bg-white/[0.05] transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg bg-teal-400 px-4 py-2.5 text-center text-sm font-semibold text-[#0B0D12] hover:bg-teal-300 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar