const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { generateInterviewReportController, getInterviewReportByID, getAllInterviewReport,searchByNav,generatePDFController,deleteInterviewReport} = require("../controllers/interview.controller");
const upload = require("../middleware/file.middleware");


const router = express.Router();

/**
 * @route POST /api/interview/
 * @desc Generate interview questions and answers based on the provided resume and job description.
 * @access Private
 */

router.post("/", authMiddleware, upload.single("resume"), generateInterviewReportController);

/**
 * @route GET /api/interview/report/:interviewID
 * @desc  get interview report by interviewID
 * @access private
 */

router.get("/report/:interviewId",authMiddleware, getInterviewReportByID)


/**
 * @route GET /api/interview/
 * @desc get all interview reports of logged in user
 * @access private
 */

router.get("/",authMiddleware, getAllInterviewReport)

/**
 * @route GET /api/interview/search/:query
 * @desc get all filter reports by query
 * @access private
 */
router.get("/search/:query" , authMiddleware, searchByNav);

/**
 * @route post /api/interview/resume/:interviewID
 * @desc  generate report based on jobDescription, resume and selfDescription
 * @access private
 */
router.post("/resume/:interviewId", authMiddleware , generatePDFController);

router.delete("/:interviewId", authMiddleware, deleteInterviewReport);

module.exports = router;