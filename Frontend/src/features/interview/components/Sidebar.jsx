import React from 'react'
import { XIcon, LogoutIcon } from './Icons.jsx'
import { defaultNavItems } from '../Data.js'
import { Link } from 'react-router'


/**
 * Sidebar
 *
 * Props:
 * - open: boolean — whether the mobile drawer is visible
 * - onClose: () => void — close the mobile drawer
 * - items: [{ label, icon, href }] — nav items, defaults to defaultNavItems
 * - activeLabel: string — label of the currently active nav item
 * - onNavigate: (label) => void — called when a nav item is clicked
 * - user: { name, email, initials }
 * - onLogout: () => void
 */
const Sidebar = ({
  open = false,
  onClose = () => {},
  items = defaultNavItems,
  activeLabel = items[0]?.label,
  onNavigate = () => {},
  user = { name, email, initials },
  onLogout = () => {},
}) => {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed z-50 inset-y-0 left-0 w-72 sm:w-64 border-r border-white/[0.08] bg-[#0D1017]/95 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 flex flex-col ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center justify-between px-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-50">
              PrepPilot<span className="text-teal-400">-AI</span>
            </span>
          </div>
          <button className="lg:hidden text-slate-500 hover:text-slate-300" onClick={onClose} aria-label="Close sidebar">
            <XIcon />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-1">
          {items.map(({ label, icon: Icon, href }) => {
            const active = label === activeLabel
            return (
              <Link
                key={label}
                to={href}
                onClick={() => onNavigate(label)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? 'bg-teal-400/10 text-teal-300 border border-teal-400/20'
                    : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200 border border-transparent'
                }`}
              >
                <Icon className={active ? 'text-teal-400 shrink-0' : 'shrink-0'} />
                <span className="truncate">{label}</span>
              </Link>
            )
          })}
        </nav>

        {/* User profile + logout */}
        <div className="shrink-0 border-t border-white/[0.06] p-3 space-y-2">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-teal-400 text-2xl font-bold text-[#0B0D12]">
              {user.initials}
            </span>
            <div className="min-w-0">
              <p className="text-sm text-slate-200 truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-white/[0.04] hover:text-red-300 transition-colors"
          >
            <LogoutIcon />
            Log out
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar