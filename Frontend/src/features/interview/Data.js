import {
  HomeIcon,
  SparklesIcon,
  ReportIcon,
  ResumeIcon,
  TargetIcon,
  PlannerIcon,
  SettingsIcon,
} from './components/Icons'

export const defaultNavItems = [
  { label: 'Dashboard', icon: HomeIcon, href: '/home' },
  { label: 'Generate Report', icon: SparklesIcon, href: '/generate-report' },
  { label: 'Interview Reports', icon: ReportIcon, href: '/reports' },
  { label: 'Download Resume', icon: ResumeIcon, href: '/get-resume' },
  { label: 'Settings', icon: SettingsIcon, href: '/settings' },
]
