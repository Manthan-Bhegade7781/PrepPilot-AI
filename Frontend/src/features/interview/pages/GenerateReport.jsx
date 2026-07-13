import React from 'react'
import { useNavigate } from 'react-router'
import AppLayout from '../layouts/AppLayout.jsx'
import GenerateReportForm from '../components/generateReport/Generatereportform.jsx'
import { useInterview } from '../hooks/useInterview.js'

const GenerateReport = () => {
  const navigate = useNavigate()
  const {loading , generateReport} = useInterview();

  const handleSubmit = async ({ resumeFile, selfDescription, jobDescription }) => {
    
    const data=await generateReport({jobDescription, selfDescription, resumeFile})

    navigate(`/report/${data._id}`)

    await new Promise((resolve) => setTimeout(resolve, 2200)) 
  }

  return (
    <AppLayout activeNav="Generate Report">
      <div className="mb-6 sm:mb-8">
        <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.24em] text-slate-500 uppercase">
          New session
        </span>
        <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-50 tracking-tight">
          Generate Interview Report
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
          Add your resume, a short self description, and the job you're targeting. We'll match them against each
          other to score your readiness and generate a tailored report.
        </p>
      </div>

      <GenerateReportForm onSubmit={handleSubmit} onViewReports={() => navigate(`/report/${data._id}`)} />
    </AppLayout>
  )
}

export default GenerateReport