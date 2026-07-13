import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import { GoogleLogin } from "@react-oauth/google";

const EyeIcon = ({ open }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    {open ? (
      <>
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a19.5 19.5 0 0 1 5.06-6.06M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a19.6 19.6 0 0 1-2.18 3.19" />
        <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
        <path d="M1 1l22 22" />
      </>
    )}
  </svg>
)

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21v-1a7 7 0 0 1 7-7h2a7 7 0 0 1 7 7v1" />
  </svg>
)

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
)

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

const scorePassword = (pwd) => {
  if (!pwd) return 0
  let score = 0
  if (pwd.length >= 8) score++
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++
  if (/\d/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  return score // 0-4
}

const strengthMeta = [
  { label: 'Very weak', color: 'bg-red-400' },
  { label: 'Weak', color: 'bg-orange-400' },
  { label: 'Fair', color: 'bg-amber-400' },
  { label: 'Good', color: 'bg-teal-500' },
  { label: 'Strong', color: 'bg-teal-400' },
]

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')
  const [values, setValues] = useState({ username: '', email: '', password: '' })

  const { handleRegister, logInLoading, handleGoogleLogin} = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
  }

  const strength = scorePassword(values.password)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!values.username || !values.email || !values.password) {
      setError('Fill in every field to create your account.')
      return
    }
    if (!agreed) {
      setError('Accept the terms to continue.')
      return
    }

    try {
      await handleRegister({
        username: values.username,
        email: values.email,
        password: values.password,
      })
      navigate('/home')
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Could not create your account.')
    }
  }

  return (
    <main className="relative min-h-screen w-full bg-[#0B0D12] flex items-center justify-center px-4 sm:px-6 py-10 overflow-hidden">
      {/* ambient dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[1] sm:opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(94,234,212,0.10) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      {/* soft glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-64 w-80 sm:h-80 sm:w-[36rem] rounded-full bg-teal-400/10 blur-[90px] sm:blur-[100px]" />

      <div className="relative w-full max-w-[400px] sm:max-w-[420px]">
        {/* eyebrow */}
        <div className="mb-5 sm:mb-6 flex items-center justify-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-400" />
          </span>
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.24em] sm:tracking-[0.28em] text-slate-500 uppercase">
            Create Account
          </span>
        </div>

        <div className="relative rounded-2xl border border-white/[0.08] bg-[#12151C]/90 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_-15px_rgba(0,0,0,0.7)] transition-all duration-300 hover:border-teal-400/20 hover:shadow-[0_0_0_1px_rgba(45,212,191,0.08),0_25px_70px_-15px_rgba(0,0,0,0.8),0_0_40px_-10px_rgba(45,212,191,0.15)] hover:-translate-y-0.5">

          {/* top accent line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/70 to-transparent" />

          <div className="px-5 pt-7 pb-6 sm:px-8 sm:pt-9 sm:pb-8">
            <h1 className="text-xl sm:text-[22px] font-semibold text-slate-50 tracking-tight">
              Get started
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Set up your account in a few seconds.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 sm:mt-7 space-y-4" noValidate>
              <div>
                <label htmlFor="username" className="mb-1.5 block text-xs font-medium text-slate-400">
                  Username
                </label>
                <div className="group relative flex items-center rounded-lg border border-white/[0.08] bg-white/[0.03] transition-colors focus-within:border-teal-400/50 focus-within:bg-white/[0.04]">
                  <span className="p-3 text-slate-500 group-focus-within:text-teal-400 transition-colors">
                    <UserIcon />
                  </span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    placeholder="Username"
                    value={values.username}
                    onChange={handleChange}
                    disabled={logInLoading}
                    className="w-full bg-transparent px-3 py-3 sm:py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none rounded disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-slate-400">
                  Email
                </label>
                <div className="group relative flex items-center rounded-lg border border-white/[0.08] bg-white/[0.03] transition-colors focus-within:border-teal-400/50 focus-within:bg-white/[0.04]">
                  <span className="p-3 text-slate-500 group-focus-within:text-teal-400 transition-colors">
                    <MailIcon />
                  </span>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    placeholder="example@gmail.com"
                    value={values.email}
                    onChange={handleChange}
                    disabled={logInLoading}
                    className="w-full bg-transparent px-3 py-3 sm:py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none rounded disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-slate-400">
                  Password
                </label>
                <div className="group relative flex items-center rounded-lg border border-white/[0.08] bg-white/[0.03] transition-colors focus-within:border-teal-400/50 focus-within:bg-white/[0.04]">
                  <span className="p-3 text-slate-500 group-focus-within:text-teal-400 transition-colors">
                    <LockIcon />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={values.password}
                    onChange={handleChange}
                    disabled={logInLoading}
                    className="w-full bg-transparent px-3 py-3 sm:py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none rounded disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="pr-3 text-slate-500 hover:text-slate-300 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>

                {/* strength meter */}
                {values.password && (
                  <div className="mt-2">
                    <div className="flex gap-1">
                      {[0, 1, 2, 3].map((i) => (
                        <span
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            i < strength ? strengthMeta[strength].color : 'bg-white/[0.08]'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500">
                      {strengthMeta[strength].label}
                    </p>
                  </div>
                )}
              </div>

              <label className="flex items-start gap-2 pt-1 select-none cursor-pointer">
                <span
                  onClick={() => setAgreed((a) => !a)}
                  className={`mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border transition-colors ${
                    agreed
                      ? 'border-teal-400 bg-teal-400 text-[#0B0D12]'
                      : 'border-white/20 bg-white/[0.03] text-transparent'
                  }`}
                >
                  <CheckIcon />
                </span>
                <span className="text-xs text-slate-500">
                  I agree to the{' '}
                  <a href="#" className="text-teal-400 hover:text-teal-300 transition-colors">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-teal-400 hover:text-teal-300 transition-colors">
                    Privacy Policy
                  </a>
                </span>
              </label>

              {error && (
                <p className="rounded-md border border-red-400/20 bg-red-400/[0.06] px-3 py-4 text-xs text-red-300">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={logInLoading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-teal-400 px-4 py-3 sm:py-2.5 text-sm font-semibold text-[#0B0D12] transition-all hover:bg-teal-300 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {logInLoading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Creating account…
                  </>
                ) : (
                  'Create account'
                )}
              </button>

              <div className="my-6 flex items-center">
                  <div className="flex-1 border-t border-white/10"></div>
              
                    <span className="mx-3 text-xs text-slate-500">
                       OR
                    </span>
              
              <div className="flex-1 border-t border-white/10"></div>
              </div>
              
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                      const user = await handleGoogleLogin(credentialResponse.credential);
              
                      if (user) {
                          navigate("/home");
                      }
                    } catch (err) {
                          console.log(err);
                    }
                  }}
                  theme="filled_black"
                  size="large"
                  shape="pill"
                  text="continue_with"
               />
            </form>
          </div>

          <div className="border-t border-white/[0.06] px-5 py-4 sm:px-8">
            <p className="text-center text-xs text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-teal-400 hover:text-teal-300 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-5 sm:mt-6 text-center font-mono text-[10px] tracking-[0.2em] text-slate-700 uppercase">
            Developed by @Manthan
        </p>
      </div>
    </main>
  )
}

export default Signup