import React,{useEffect}from 'react'
import { useNavigate, useParams } from 'react-router'
import AppLayout from '../layouts/AppLayout.jsx'
import HeroCard from '../components/home/Herocard.jsx'
import RecentReports from '../components/home/Recentreports.jsx'
import { useInterview } from '../hooks/useInterview.js'

const Dashboard = () => {
  const navigate = useNavigate()
  const {reportList, getAllReport}= useInterview()
  const {reportId} = useParams();
      useEffect(()=>{
          if(reportId){
              getReportById(reportId)
          }else{
              getAllReport();
          }
      },[reportId])

  return (
    <AppLayout activeNav="Dashboard">
      <HeroCard onCtaClick={() => navigate('/generate-report')} 
      stat={{
        label: "Total Reports",
        value: `${reportList.length}`,
        caption: "generated so far"
      }}/>

      <RecentReports
        reports={reportList.slice(0, 5)}
        onViewAll={() => navigate('/reports')}
        onViewReport={(report) => navigate(`/report/${report._id}`)}
      />
    </AppLayout>
  )
}

export default Dashboard