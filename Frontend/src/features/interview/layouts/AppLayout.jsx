import React, { useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import Topbar from '../components/Topbar.jsx'
import { useAuth } from '../../auth/hooks/useAuth.js'

/**
 * AppLayout
 *
 * Wraps any page with the sidebar + topbar. Owns sidebarOpen / darkMode
 * so individual pages don't need to re-implement that state.
 *
 * Props:
 * - activeNav: string — which sidebar item should be highlighted
 * - children: page content
 */
const AppLayout = ({ activeNav, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(true) // TODO: wire to real theme context

  const { user , handleLogout} = useAuth();

  return (
    <div className="min-h-screen w-full bg-[#0B0D12] text-slate-100 flex">
      {/* ambient dot grid */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[1]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(94,234,212,0.10) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      <div className="pointer-events-none fixed -top-40 left-1/3 h-72 w-[36rem] rounded-full bg-teal-400/10 blur-[110px]" />

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeLabel={activeNav}
        onLogout={async() => {
          await handleLogout();
          console.log('logout clicked')
        }}
        user ={{ name: user.username , email: user.email , initials: user.username[0].toUpperCase() }}
      />

      <div className="relative flex-1 flex flex-col min-w-0">
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode((d) => !d)}
          user ={{ name: user.username , initials: user.username[0].toUpperCase() }}
        />

        <main className="relative flex-1 px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppLayout