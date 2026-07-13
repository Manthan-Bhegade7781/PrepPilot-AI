import React ,{useState} from 'react'
import { MenuIcon, SearchIcon, BellIcon, SunIcon, MoonIcon, ChevronDownIcon } from './Icons'
import { useInterview } from '../hooks/useInterview'

/**
 * Topbar
 *
 * Props:
 * - onMenuClick: () => void — opens the mobile sidebar drawer
 * - searchPlaceholder: string
 * - onSearchChange: (value: string) => void
 * - hasNotifications: boolean — show/hide the notification dot
 * - darkMode: boolean
 * - onToggleDarkMode: () => void
 * - user: { name, initials }
 */
const Topbar = ({
  onMenuClick = () => {},
  searchPlaceholder = 'Search reports, sessions…',
  onSearchChange = () => {},
  hasNotifications = true,
  darkMode = true,
  onToggleDarkMode = () => {},
  user = { name, initials },
}) => {

  const {search, setSearch} = useInterview();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <>
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-white/[0.06] bg-[#0B0D12]/80 backdrop-blur-xl px-4 sm:px-6">
      <div className="flex items-center gap-3 min-w-0">
        <button
          className="lg:hidden text-slate-400 hover:text-slate-200 shrink-0"
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          <MenuIcon />
        </button>
        <div className="hidden sm:flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 w-56 md:w-72">
          <SearchIcon className="text-slate-500 shrink-0" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-600 outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          className="sm:hidden text-slate-400 hover:text-slate-200"
          onClick={() => setShowMobileSearch(!showMobileSearch)}
        >
          <SearchIcon width={18} height={18} />
        </button>

        {/* Dark mode toggle
        <button
          onClick={onToggleDarkMode}
          aria-label="Toggle dark mode"
          className="relative flex h-8 w-14 items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-1 transition-colors"
        >
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full bg-teal-400 text-[#0B0D12] transition-transform duration-300 ${
              darkMode ? 'translate-x-6' : 'translate-x-0'
            }`}
          >
            {darkMode ? <MoonIcon width={13} height={13} /> : <SunIcon width={13} height={13} />}
          </span>
        </button> */}

        <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] pl-1.5 pr-2.5 py-1.5 hover:bg-white/[0.05] transition-colors">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-teal-400 text-xs font-semibold text-[#0B0D12]">
            {user.initials}
          </span>
          <span className="hidden md:block text-sm text-slate-200">{user.name}</span>
        </button>
      </div>
    </header>

    {showMobileSearch && (
      <div className="sm:hidden border-b border-white/[0.06] bg-[#0B0D12] px-4 py-3">
        <div className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2">
          <SearchIcon className="text-slate-500" />

          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-600 outline-none"
          />
        </div>
      </div>
    )}
    </>
  )
}

export default Topbar