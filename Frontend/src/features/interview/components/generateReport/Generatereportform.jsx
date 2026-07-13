import React, { useCallback, useState } from 'react'
import ResumeUploadCard from './ResumeUploadCard.jsx'
import DescriptionCard from './DescriptionCard.jsx'
import ReadinessPanel from './ReadinessPanel.jsx'
import { UserIcon, BriefcaseIcon, SparklesIcon, LoaderIcon } from '../Icons.jsx'

const ACCEPT_EXT = [".pdf"]
const MAX_FILE_MB = 10
const SELF_DESC_LIMIT = 600
const JOB_DESC_LIMIT = 4000

/**
 * GenerateReportForm
 *
 * Owns all the form state (resume, descriptions, readiness) and composes
 * ResumeUploadCard + DescriptionCard + ReadinessPanel. The actual network
 * call is delegated to the parent page via `onSubmit`.
 *
 * Props:
 * - onSubmit: ({ resumeFile, selfDescription, jobDescription }) => Promise
 * - onViewReports: () => void — called from the "View reports" link after success
 */
const GenerateReportForm = ({ onSubmit = async () => {}, onViewReports = () => {} }) => {
  const [resumeFile, setResumeFile] = useState(null)
  const [fileError, setFileError] = useState('')
  const [selfDescription, setSelfDescription] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [status, setStatus] = useState('idle') // idle | generating | done
  const [errorMessage, setErrorMessage] = useState('')

  const validateAndSetFile = useCallback((file) => {
    if (!file) return
    const ext = '.' + file.name.split('.').pop().toLowerCase()
    if (!ACCEPT_EXT.includes(ext)) {
      setFileError(`Please upload a ${ACCEPT_EXT} file.`)
      return
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setFileError(`File is too large. Max size is ${MAX_FILE_MB} MB.`)
      return
    }
    setFileError('')
    setResumeFile(file)
  }, [])

  const steps = [
    { label: 'Resume', done: !!resumeFile },
    { label: 'Self description', done: selfDescription.trim().length >= 20 },
    { label: 'Job description', done: jobDescription.trim().length >= 40 },
  ]
  const canGenerate = steps.every((s) => s.done) && status !== 'generating'

  const handleGenerate = async () => {
    if (!canGenerate) return
    setErrorMessage('')
    setStatus('generating')
    try {
      await onSubmit({ resumeFile, selfDescription, jobDescription })
      setStatus('done')
    } catch (err) {
      setStatus('idle')
      setErrorMessage(err?.response?.data?.message || err?.message || 'Could not generate the report. Try again.')
    }
  }

  const handleReset = () => {
    setResumeFile(null)
    setFileError('')
    setSelfDescription('')
    setJobDescription('')
    setStatus('idle')
    setErrorMessage('')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
      {/* ---------------- Left: form ---------------- */}
      <div className="space-y-6">
        <ResumeUploadCard
          file={resumeFile}
          onFileSelect={validateAndSetFile}
          onRemove={() => {
            setResumeFile(null)
            setFileError('')
          }}
          error={fileError}
          acceptExt={ACCEPT_EXT}
          maxSizeMB={MAX_FILE_MB}
        />

        <DescriptionCard
          icon={UserIcon}
          title="Self description"
          subtitle="Who you are, in your own words"
          value={selfDescription}
          onChange={setSelfDescription}
          placeholder="e.g. Third-year CS student focused on backend systems, comfortable with Go and Postgres, building a distributed task queue as a side project…"
          rows={5}
          maxLength={SELF_DESC_LIMIT}
          helperText="Aim for a few honest sentences — strengths, focus areas, goals."
        />

        <DescriptionCard
          icon={BriefcaseIcon}
          title="Job description"
          subtitle="Paste the role you're preparing for"
          value={jobDescription}
          onChange={setJobDescription}
          placeholder="Paste the full job posting — responsibilities, requirements, and any preferred qualifications…"
          rows={8}
          maxLength={JOB_DESC_LIMIT}
          helperText="The more detail, the sharper the skill-gap match."
        />

        {/* Mobile generate button (readiness panel button is desktop-only) */}
        <button
          onClick={handleGenerate}
          disabled={!canGenerate}
          className={`lg:hidden flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-sm font-semibold transition-all ${
            canGenerate
              ? 'bg-teal-400 text-[#0B0D12] hover:bg-teal-300 active:scale-[0.99]'
              : 'bg-white/[0.04] text-slate-600 cursor-not-allowed'
          }`}
        >
          {status === 'generating' ? (
            <>
              <LoaderIcon className="animate-spin" />
              Generating report…
            </>
          ) : (
            <>
              <SparklesIcon width={16} height={16} />
              Generate Interview Report
            </>
          )}
        </button>

        {errorMessage && (
          <p className="lg:hidden rounded-md border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-300">
            {errorMessage}
          </p>
        )}
      </div>

      {/* ---------------- Right: readiness panel ---------------- */}
      <ReadinessPanel
        steps={steps}
        status={status}
        errorMessage={errorMessage}
        onGenerate={handleGenerate}
        onReset={handleReset}
        onViewReports={onViewReports}
      />
    </div>
  )
}

export default GenerateReportForm