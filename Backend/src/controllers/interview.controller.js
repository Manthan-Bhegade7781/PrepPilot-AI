const pdfParser = require("pdf-parse");
const {generateInterviewReport, generateResumePdf}  = require("../services/ai.services");
const interviewReportModel = require("../model/interviewReport.model");


const generateInterviewReportController  = async (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Resume PDF is required."
        });
    }


    const { jobDescription , selfDescription } = req.body;
    
    if (!jobDescription || !selfDescription) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
    }
    const resumeContent = await (new pdfParser.PDFParse(Uint8Array.from(req.file.buffer))).getText();


    const generateReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        jobDescription,
        selfDescription
    });

    const interviewReport = await interviewReportModel.create({
        resumeText: resumeContent.text,
        jobDescription,
        selfDescription,
        ...generateReportByAi,
        user: req.user.id
    });

    res.status(201).json({
        message:"Interview report generated successfully",
        interviewReport
    });
}

const getInterviewReportByID = async(req,res)=>{
    const {interviewId} = req.params;

    const interviewReport = await interviewReportModel.findOne({_id: interviewId, user: req.user.id});

    if(!interviewReport){
        return res.status(404).json({
            message:"Interview report not found"
        })
    }

    res.status(200).json({
        message:"Interview report fetch Successfully.",
        interviewReport
    })
}

const getAllInterviewReport = async(req,res)=>{
    const interviewReports= await interviewReportModel.find({user: req.user.id}).sort({createdAt: -1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message:"Interview reports fetched Successfully.",
        interviewReports
    })
}

const searchByNav = async (req, res) => {
    try {

        const interviewReports = await interviewReportModel
            .find({
                user: req.user.id,
                title: {
                    $regex: req.params.query,
                    $options: "i"
                }
            })
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Reports fetched successfully",
            interviewReports
        });

    } catch (error) {

        res.status(500).json({
            message: "Something went wrong"
        });

    }
}

const deleteInterviewReport = async (req, res) => {
    const { interviewId } = req.params;

    const report = await interviewReportModel.findOneAndDelete({
        _id: interviewId,
        user: req.user.id,
    });

    if (!report) {
        return res.status(404).json({
            message: "Interview report not found",
        });
    }

    res.status(200).json({
        message: "Interview report deleted successfully.",
    });
};

const generatePDFController = async(req,res)=>{
    const{interviewId}= req.params;

    const interviewReport = await interviewReportModel.findById(interviewId);

    if(!interviewReport){
        return res.status(404).json({
            message:"Interview Report Not Found"
        })
    }
    
    const{resumeText, jobDescription, selfDescription}=interviewReport

    const pdfBuffer = await generateResumePdf({resume: resumeText, jobDescription, selfDescription});

    res.set({
        "Content-Type":"application/pdf",
        "Content-Disposition":`attachment; filename=resume_${interviewId}.pdf`
    })

    res.send(pdfBuffer);
}

module.exports = {generateInterviewReportController, getInterviewReportByID, getAllInterviewReport, searchByNav, generatePDFController,deleteInterviewReport};