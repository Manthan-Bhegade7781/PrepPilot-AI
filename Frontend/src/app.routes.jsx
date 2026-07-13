import {createBrowserRouter} from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import GenerateReport from "./features/interview/pages/GenerateReport";
import Dashboard from "./features/interview/pages/Dashboard";
import InterviewReport from "./features/interview/pages/Interviewreport";
import InterviewReports from "./features/interview/pages/Interviewreports";
import GetResume from "./features/interview/pages/GetResume";
import Settings from "./features/interview/pages/Settings";
import LandingPage from "./features/landing/pages/LandingPage";


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },{
        path: "/home",
        element: <Protected><Dashboard /></Protected>
    },{
        path:"/generate-report",
        element: <Protected><GenerateReport /></Protected>
    },{
        path:"/report/:reportId",
        element: <Protected><InterviewReport /></Protected>
    },{
        path:"/reports",
        element: <Protected><InterviewReports /></Protected>
    },{
        path:"/get-resume",
        element: <Protected><GetResume /></Protected>
    },{
        path:"/settings",
        element: <Protected><Settings /></Protected>
    },{
        path:"/dashboard",
        element: <LandingPage />
    }
])