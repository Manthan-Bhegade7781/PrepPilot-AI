const mongoose = require('mongoose');

/**
 * - job description: The job description for the interview report, String
 * - resume text : String
 * - self description: The self description for the interview report, String
 * 
 * - match score : Number
 * 
 * - Technical questions :[
 *   {
 *     question: String,
 *      intension: String,
 *     answer: String
 *   }
 *  ]
 * 
 *  - Behavioral questions :[
 *   {
 *     question: String,
 *    intension: String,
 *     answer: String
 *   }
 *  ]
 * 
 *  - Skills gaps :[
 *  {
 *    skill: String,
 *    severity:{
 *     type: String,
 *    enum: ['low', 'medium', 'high']
 *      }
 *  }]
 * 
 *  - Preparation Plan :[
 *  {
 *   day: Number,
 *   focus: String,
 *  tasks: [String]
 *  }]
 */

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Question is required'],
    },
    intention: {
        type: String,
        required: [true, 'Intention is required'],
    },
    answer: {
        type: String,
        required: [true, 'Answer is required'],
    }
}, { _id: false });


const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Question is required'],
    },
    intention: {
        type: String,
        required: [true, 'Intention is required'],
    },
    answer: {
        type: String,
        required: [true, 'Answer is required'],
    }
}, { _id: false });


const skillsGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, 'Skill is required'],
    },
    severity: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: [true, 'Severity is required'],
    }
}, { _id: false });


const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, 'Day is required'],
    },
    focus: {
        type: String,
        required: [true, 'Focus is required'],
    },
    tasks: [{
        type: String,
        required: [true, 'Task is required'],
    }]
}, { _id: false });



const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, 'Job description is required'],
    },
    resumeText: {
        type: String,
    },
    selfDescription: {
        type: String,
    },
    matchscore: {
        type: Number,
        min: 0,
        max: 100,
        required: [true, 'Match score is required'],
    },
    title:{
        type: String
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillsGaps: [skillsGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, { timestamps: true });

const interviewReportModel = mongoose.model('InterviewReport', interviewReportSchema);

module.exports = interviewReportModel;