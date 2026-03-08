// const Anthropic = require('@anthropic-ai/sdk');
// const { ANTHROPIC_API_KEY } = require('../config/env');

// let anthropicClient = null;

// function getAnthropicClient() {
//   if (!anthropicClient) {
//     if (!ANTHROPIC_API_KEY) {
//       throw new Error('ANTHROPIC_API_KEY is not configured. Please set it in your environment variables.');
//     }
//     anthropicClient = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
//   }
//   return anthropicClient;
// }

const { GoogleGenerativeAI } = require('@google/generative-ai');
const { GEMINI_API_KEY } = require('../config/env');

let geminiClient = null;

function getGeminiClient() {
  if (!geminiClient) {
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured. Please set it in your environment variables.');
    }
    geminiClient = new GoogleGenerativeAI(GEMINI_API_KEY);
  }
  return geminiClient;
}

/**
 * Build context string from module data for the AI to use when grading
 */
function buildModuleContext(moduleData) {
  const parts = [];

  parts.push(`MODULE TITLE: ${moduleData.title}`);
  parts.push(`MODULE DESCRIPTION: ${moduleData.description || moduleData.shortDescription || ''}`);

  // Objectives
  if (moduleData.objectives) {
    if (typeof moduleData.objectives === 'string') {
      parts.push(`OBJECTIVES: ${moduleData.objectives}`);
    } else {
      parts.push(`OBJECTIVES: ${moduleData.objectives.intro || ''}`);
      if (moduleData.objectives.points) {
        parts.push(`KEY OBJECTIVES:\n${moduleData.objectives.points.map(p => `- ${p}`).join('\n')}`);
      }
    }
  }

  // Learning outcomes
  if (moduleData.learningOutcomes && moduleData.learningOutcomes.length > 0) {
    parts.push(`LEARNING OUTCOMES:\n${moduleData.learningOutcomes.map(o => `- ${o}`).join('\n')}`);
  }

  // Course content description
  if (moduleData.courseContent) {
    parts.push(`COURSE CONTENT: ${moduleData.courseContent.description || ''}`);
    if (moduleData.courseContent.aboutText) {
      parts.push(`ABOUT: ${moduleData.courseContent.aboutText.intro || ''}`);
      if (moduleData.courseContent.aboutText.points) {
        parts.push(`TOPICS COVERED:\n${moduleData.courseContent.aboutText.points.map(p => `- ${p}`).join('\n')}`);
      }
    }
    // Resource titles and descriptions
    if (moduleData.courseContent.resources) {
      const resourceInfo = moduleData.courseContent.resources.map(r => `- ${r.title}: ${r.description}`).join('\n');
      parts.push(`RESOURCES:\n${resourceInfo}`);
    }
  }

  // Assignment context
  if (moduleData.assignments) {
    if (moduleData.assignments.dataFiles) {
      const dataInfo = moduleData.assignments.dataFiles.map(f => `- ${f.title}: ${f.description}`).join('\n');
      parts.push(`ASSIGNMENT DATA FILES:\n${dataInfo}`);
    }
    if (moduleData.assignments.workingFiles) {
      const workInfo = moduleData.assignments.workingFiles.map(f => `- ${f.title}: ${f.description}`).join('\n');
      parts.push(`WORKING FILES/TEMPLATES:\n${workInfo}`);
    }
  }

  // Quiz questions as additional context (helps AI understand the domain)
  if (moduleData.quizQuestions && moduleData.quizQuestions.length > 0) {
    const quizContext = moduleData.quizQuestions.slice(0, 10).map(q =>
      `Q: ${q.question}\nCorrect: ${q.correctAnswer}\nExplanation: ${q.explanation || 'N/A'}`
    ).join('\n\n');
    parts.push(`SAMPLE QUIZ Q&A (for domain context):\n${quizContext}`);
  }

  return parts.join('\n\n');
}

/**
 * Grade AI quiz answers using Google Gemini
 * @param {Object} params
 * @param {Object} params.moduleData - Full module data (title, objectives, content, etc.)
 * @param {Array} params.questions - Array of { id, question, hint? }
 * @param {Object} params.answers - Map of questionId -> user's answer text
 * @returns {Object} { results: [{ questionId, isCorrect, score, feedback, correctGuidance }], overallScore }
 */
async function gradeAiQuiz({ moduleData, questions, answers }) {
  const genAI = getGeminiClient();
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const moduleContext = buildModuleContext(moduleData);

  // Build the questions + answers payload for the AI
  const qaPayload = questions.map((q, idx) => ({
    questionNumber: idx + 1,
    questionId: q.id,
    question: q.question,
    hint: q.hint || null,
    userAnswer: answers[q.id] || '(No answer provided)',
  }));

  const systemPrompt = `You are an expert actuarial science tutor and grader for Kenbright Actuarial and Financial Services (KAFS) training program. Your job is to evaluate trainee answers to assignment questions based on the module's training materials and domain knowledge.

GRADING GUIDELINES:
- Be fair but thorough in your evaluation
- Grade based on accuracy, completeness, and understanding demonstrated
- Consider partial credit: answers can be partially correct
- Use the module context extensively to verify correctness
- Be encouraging but honest — clearly explain what's wrong and why
- Provide the correct answer or guidance when the answer is wrong or incomplete
- Score each answer from 0 to 10 (0 = completely wrong, 10 = perfect)
- An answer scoring 6 or above is considered "correct" (passing)

MODULE CONTEXT:
${moduleContext}

RESPONSE FORMAT:
You MUST respond with valid JSON only (no markdown, no code fences). Use this exact structure:
{
  "results": [
    {
      "questionId": <number or string>,
      "questionNumber": <number>,
      "score": <0-10>,
      "isCorrect": <boolean>,
      "feedback": "<detailed feedback explaining what the student got right or wrong>",
      "correctGuidance": "<the correct answer or key points the student should have included>"
    }
  ],
  "overallScore": <average score as percentage 0-100>,
  "overallFeedback": "<brief overall assessment of the student's performance>"
}

Please grade the following quiz answers:

${JSON.stringify(qaPayload, null, 2)}`;

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: systemPrompt }] }],
    generationConfig: {
      maxOutputTokens: 8000,
      temperature: 0.3,
      responseMimeType: 'application/json',
    },
  });

  const response = result.response;
  const content = response.text();

  if (!content) {
    throw new Error('No response received from AI service');
  }

  // Parse the JSON response
  let gradingResult;
  try {
    // Try direct parse first (responseMimeType should give clean JSON)
    gradingResult = JSON.parse(content);
  } catch (parseError) {
    try {
      // Fallback: strip markdown code fences and any preamble text
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        gradingResult = JSON.parse(jsonMatch[0]);
      } else {
        throw parseError;
      }
    } catch (fallbackError) {
      console.error('Failed to parse AI response:', content.substring(0, 500));
      throw new Error('Failed to parse AI grading response. Please try again.');
    }
  }

  return gradingResult;
}

module.exports = {
  gradeAiQuiz,
};
