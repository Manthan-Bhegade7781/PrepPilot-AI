import {generateInterviewReport,getInterviewReportById,getAllInterviewReports,searchReports,generateResumePdf, deleteInterviewReport} from "../services/interview.api";
import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";
import { useParams } from "react-router";

export const useInterview =()=>{

    const context = useContext(InterviewContext)

    if(!context){
        throw new Error("UseInterview must be used within an InterviewProvider")
    }

    const {loading,setLoading,report,setReport,reportList, setReportList, search, setSearch} = context;
    const {reportId} = useParams();

    const generateReport = async({jobDescription, selfDescription, resumeFile})=>{
        setLoading(true);
        let response = null
        try {
            response = await generateInterviewReport({jobDescription,selfDescription,resumeFile});

            setReport(response.interviewReport)
        } catch (error) {
            throw(error)
        }finally{
            setLoading(false)
        }

        return response.interviewReport
    }

    const getReportById = async(interviewId)=>{
        setLoading(true);
        let response = null
        try {
            response = await getInterviewReportById(interviewId);

            setReport(response.interviewReport)
        } catch (error) {
           throw(error)
        }finally{
            setLoading(false)
        }

        return response.interviewReport
    }

    const getAllReport = async() =>{
        setLoading(true);
        let response = null
        try {
            response= await getAllInterviewReports();

            setReportList(response.interviewReports)
        } catch (error) {
           throw(error)
        }finally{
            setLoading(false)
        }

        return response.interviewReport
    }

    const getResumePdf = async (interviewId) => {
        setLoading(true)
        let response = null
        try {
            response = await generateResumePdf({ interviewId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const deleteReport = async (interviewId) => {
            try {
                await deleteInterviewReport(interviewId);
    
                setReportList((prev) =>
                    prev.filter((report) => report._id !== interviewId)
                );
            } catch (error) {
                throw error;
            }
    };

useEffect(() => {

    const timeout = setTimeout(async () => {

        let response;

        if (search.trim()) {
            response = await searchReports(search);
        } else {
            response = await getAllInterviewReports();
        }

        setReportList(response.interviewReports);

    }, 500);

    return () => clearTimeout(timeout);

}, [search]);

    return {loading , report, reportList, getAllReport, getReportById, generateReport,search,setSearch, getResumePdf,deleteReport}
}