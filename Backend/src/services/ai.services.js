const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const interviewSchema = {
  type: "object",
  properties: {
    matchscore: {
      type: "number"
    },

    title:{
      type:"string"
    },

    technicalQuestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: {
            type: "string"
          },
          intention: {
            type: "string"
          },
          answer: {
            type: "string"
          }
        },
        required: [
          "question",
          "intention",
          "answer"
        ]
      }
    },

    behavioralQuestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          intention: { type: "string" },
          answer: { type: "string" }
        },
        required: [
          "question",
          "intention",
          "answer"
        ]
      }
    },

    skillsGaps: {
      type: "array",
      items: {
        type: "object",
        properties: {
          skill: {
            type: "string"
          },
          severity: {
            type: "string",
            enum: ["low", "medium", "high"]
          }
        },
        required: [
          "skill",
          "severity"
        ]
      }
    },

    preparationPlan: {
      type: "array",
      items: {
        type: "object",
        properties: {
          day: { type: "number" },
          focus: { type: "string" },
          tasks: {
            type: "array",
            items: {
              type: "string"
            }
          }
        },
        required: [
          "day",
          "focus",
          "tasks"
        ]
      }
    }
  },

  required: [
    "matchscore",
    "title",
    "technicalQuestions",
    "behavioralQuestions",
    "skillsGaps",
    "preparationPlan"
  ]
};

async function generateInterviewReport({
  resume,
  jobDescription,
  selfDescription,
}) {
  const prompt = `
You are an expert Technical Interviewer and Career Coach.

Your task is to analyze the candidate and generate an interview preparation report.

Candidate Resume:
${resume}

Job Description:
${jobDescription}

Self Description:
${selfDescription}

IMPORTANT INSTRUCTIONS

Return ONLY valid JSON.

DO NOT wrap the response in markdown.

DO NOT explain anything.

DO NOT add extra properties.

The response MUST exactly match the provided JSON schema.

Generate:

• matchscore (0-100)

• 10 technical interview questions
Each question must contain:
- question
- intention
- answer

• 5 behavioral interview questions
Each question must contain:
- question
- intention
- answer

• 5 skill gaps
Each gap contains:
- skill
- severity (low | medium | high)

• 7-day preparation plan

Each day contains:
- day
- focus
- tasks
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: prompt,

      config: {
            responseMimeType: "application/json",
            responseSchema: interviewSchema
        }
    });

    return JSON.parse(response.text);
   
  } catch (err) {
    console.error("Gemini Error:");
    console.error(err);

    throw new Error("Failed to generate interview report.");
  }
}


async function pdfGenerate(htmlContent) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4", margin: {
            top: "10mm",
            bottom: "10mm",
            left: "15mm",
            right: "15mm"
        }
    })

    await browser.close()

    return pdfBuffer
}

async function generateResumePdf({resume, selfDescription, jobDescription}){
  
  const resumeSchema = {
    type: "object",
    properties: {
      html: {
        type: "string",
        description:
          "The HTML content of the resume which can be converted to PDF using any library like puppeteer"
      }
    },
    required: ["html"]
  };

  const prompt =`Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.

                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. 
                        
                        The HTML content should be well-formatted and structured, making it easy to read and visually appealing.

                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.

                        You can highlight the content using some colors or different font styles but the overall design should be simple and professional.

                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.

                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. 
                        
                        Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: prompt,

      config: {
            responseMimeType: "application/json",
            responseSchema: resumeSchema
        }
    });
    const jsonContent= JSON.parse(response.text);

    const pdfBuffer = await pdfGenerate(jsonContent.html);

    return pdfBuffer
   
  } catch (err) {
    console.error("Gemini Error:");
    console.error(err);

    throw new Error("Failed to generate Resume.");
  }


}

module.exports = {generateInterviewReport, generateResumePdf };