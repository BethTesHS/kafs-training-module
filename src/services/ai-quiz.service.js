import apiClient from './api';

/**
 * Submit AI quiz answers for AI grading
 * @param {Object} params
 * @param {Object} params.moduleData - Full module data object
 * @param {Array} params.questions - Array of { id, question, hint }
 * @param {Object} params.answers - Map of questionId -> answer text
 * @returns {Promise<Object>} Grading results
 */
export const gradeAiQuiz = async ({ moduleData, questions, answers }) => {
  const response = await apiClient.post('/ai-quiz/grade', {
    moduleData,
    questions,
    answers,
  });
  return response;
};
