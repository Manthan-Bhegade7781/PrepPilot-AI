import React, { useRef, useState, useCallback } from 'react'
import { ResumeIcon, UploadIcon, FileTextIcon, TrashIcon, CheckIcon } from '../Icons'

const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/**
 * ResumeUploadCard
 *
 * Props:
 * - file: File | null
 * - onFileSelect: (file: File) => void  — parent validates and stores it
 * - onRemove: () => void
 * - error: string | null
 * - acceptExt: string[] — e.g. ['.pdf', '.doc', '.docx']
 * - maxSizeMB: number
 */
const ResumeUploadCard = ({
  file,
  onFileSelect,
  onRemove,
  error,
  acceptExt = '.pdf',
  maxSizeMB = 10,
}) => {
  const fileInputRef = useRef(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e, isOver) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(isOver)
  }, [])

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      setDragActive(false)
      const dropped = e.dataTransfer.files?.[0]
      if (dropped) onFileSelect(dropped)
    },
    [onFileSelect]
  )

  return (
    <section className="rounded-xl border border-white/[0.08] bg-[#12151C]/90 backdrop-blur-xl overflow-hidden">
      <div className="flex items-center gap-2 px-5 sm:px-6 py-4 border-b border-white/[0.06]">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-teal-400/10 text-teal-400">
          <ResumeIcon width={15} height={15} />
        </span>
        <h2 className="text-sm font-semibold text-slate-100">Resume</h2>
        <span className="text-xs text-slate-500">
          {acceptExt} — up to {maxSizeMB} MB
        </span>
      </div>

      <div className="p-5 sm:p-6">
        {!file ? (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => handleDrag(e, true)}
            onDragEnter={(e) => handleDrag(e, true)}
            onDragLeave={(e) => handleDrag(e, false)}
            onClick={() => fileInputRef.current?.click()}
            className={`flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed px-6 py-10 text-center cursor-pointer transition-colors ${
              dragActive
                ? 'border-teal-400/60 bg-teal-400/[0.06]'
                : 'border-white/[0.12] hover:border-white/[0.2] hover:bg-white/[0.02]'
            }`}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-400/10 text-teal-400">
              <UploadIcon />
            </span>
            <div>
              <p className="text-sm text-slate-200">
                <span className="text-teal-400 font-medium">Click to upload</span> or drag and drop
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {acceptExt} — max {maxSizeMB} MB
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptExt}
              className="hidden"
              onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])}
            />
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-lg border border-teal-400/20 bg-teal-400/[0.05] px-4 py-3.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-400/10 text-teal-400">
              <FileTextIcon />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-slate-100 truncate">{file.name}</p>
              <p className="text-xs text-slate-500">{formatBytes(file.size)} · Uploaded</p>
            </div>
            <span className="text-teal-400">
              <CheckIcon />
            </span>
            <button
              onClick={onRemove}
              className="ml-1 shrink-0 text-slate-500 hover:text-red-300 transition-colors p-1.5"
              aria-label="Remove resume"
            >
              <TrashIcon />
            </button>
          </div>
        )}
        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      </div>
    </section>
  )
}

export default ResumeUploadCard