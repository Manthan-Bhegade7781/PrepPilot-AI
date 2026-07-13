import React, { useState , useEffect } from 'react'
import { useNavigate,useParams } from 'react-router'
import ReportNav from '../components/reportDisplay/Reportnav.jsx'
import QAList from '../components/reportDisplay/Qalist.jsx'
import RoadmapTimeline from '../components/reportDisplay/Roadmaptimeline.jsx'
import SkillGapsPanel from '../components/reportDisplay/Skillgapspanel.jsx'
import { useInterview } from '../hooks/useInterview.js'
import PageLoader from '../../auth/components/LoadingPage.jsx'

/**
 * PageBackground
 * Shared ambient background (dot grid + glow) for every state this page renders.
 */
const PageBackground = ({ children }) => (
  <div className="relative min-h-screen w-full bg-[#0B0D12] text-slate-100">
    <div
      className="pointer-events-none fixed inset-0 opacity-[0.35]"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(94,234,212,0.10) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    />
    <div className="pointer-events-none fixed -top-40 left-1/3 h-72 w-[36rem] rounded-full bg-teal-400/10 blur-[110px]" />
    <div className="relative">{children}</div>
  </div>
)

/**
 * InterviewReport
 *
 * Standalone page (no dashboard AppLayout/Sidebar/Topbar). Three panes:
 * - left: report title + back button + section nav — fixed, own scroll if needed
 * - center: active section's content — the only pane that scrolls with page content
 * - right: match score + skill gaps — fixed, own scroll if needed
 */
const InterviewReport = () => {
  const [activeTab, setActiveTab] = useState('technical')
  const navigate = useNavigate()

  const { report, loading, getAllReport,getReportById} = useInterview()

    const {reportId} = useParams();
      useEffect(()=>{
          if(reportId){
              getReportById(reportId)
          }else{
              getAllReport();
          }
      },[reportId])

  if (loading || !report) {
    return <PageLoader />
  }


  return (
    <PageBackground>
      <div className="flex flex-col lg:flex-row lg:h-screen">
        {/* ---------- Left: report title + back + section nav ---------- */}
        <aside className="lg:h-screen lg:w-[260px] bg-[#0D1017]/95 lg:shrink-0 border-b lg:border-b-0 lg:border-r border-white/[0.06] px-4 sm:px-6 py-5 sm:py-6 space-y-5 sm:space-y-6">
          <div>
            <span className="font-mono text-[10px] tracking-[0.24em] text-slate-500 uppercase">
              Interview Report
            </span>
            <h1 className="mt-2 text-xl sm:text-2xl font-semibold text-slate-50 tracking-tight leading-snug">
              {report.title}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Generated from your resume, self description, and the job description.
            </p>
          </div>

          <ReportNav
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onBack={() => navigate('/home')}
          />
        </aside>

        {/* ---------- Center: scrollable main content ---------- */}
        <main className="flex-1 min-w-0 lg:h-screen lg:overflow-y-auto hide-scrollbar px-4 sm:px-6 py-5 sm:py-6">
          {activeTab === 'technical' && (
            <QAList
              title="Technical Questions"
              subtitle="Based on your resume and the target job description."
              items={report.technicalQuestions}
            />
          )}
          {activeTab === 'behavioral' && (
            <QAList
              title="Behavioral Questions"
              subtitle="Common STAR-style questions tailored to your background."
              items={report.behavioralQuestions}
            />
          )}
          {activeTab === 'roadmap' && <RoadmapTimeline plan={report.preparationPlan} />}
        </main>

        {/* ---------- Right: match score + skill gaps ---------- */}
        <aside className="lg:h-screen lg:w-[350px] bg-[#0D1017]/95 lg:shrink-0 lg:overflow-y-auto hide-scrollbar border-t lg:border-t-0 lg:border-l border-white/[0.06] px-4 sm:px-6 py-5 sm:py-6">
          <SkillGapsPanel matchScore={report.matchscore} skillsGaps={report.skillsGaps} />
        </aside>
      </div>
    </PageBackground>
  )
}

export default InterviewReport