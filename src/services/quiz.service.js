import apiClient from './api';
import {
  module1Data, module2Data, module3Data, module4Data, module5Data,
  module6Data, module7Data, module8Data, module9Data, module10Data,
  module11Data, module12Data, module13Data, module14Data, module15Data,
  module16Data, module17Data
} from '../constants/modules';

const MODULES_MAP = {
  1: module1Data, 2: module2Data, 3: module3Data, 4: module4Data, 5: module5Data,
  6: module6Data, 7: module7Data, 8: module8Data, 9: module9Data, 10: module10Data,
  11: module11Data, 12: module12Data, 13: module13Data, 14: module14Data, 15: module15Data,
  16: module16Data, 17: module17Data,
};

const quizService = {
  // Get questions locally from constants (Fixes the 404 for /api/quiz/1/questions)
  getQuizQuestions: async (moduleId) => {
    const module = MODULES_MAP[parseInt(moduleId)];
    if (module) {
      // Look for quizQuestions array in your module data
      return { data: module.quizQuestions || [] };
    }
    return { data: [] };
  },

  // Keep this pointing to the API, because we kept the quiz_submissions table!
  submitQuiz: async (moduleId, answers) => {
    // We calculate score here quickly or let backend do it
    const module = MODULES_MAP[parseInt(moduleId)];
    const questions = module?.quizQuestions || [];
    
    let score = 0;
    questions.forEach((q, index) => {
      // Matches the index/answer logic depending on how ModulePage submits
      if (answers[q.id] === q.correctAnswer || answers[q.id] === index) {
        score++;
      }
    });

    return apiClient.post('/quiz/submit', {
      module_id: String(moduleId),
      score: score,
      total_questions: questions.length || 10,
      answers: answers
    });
  },

  // Keep this pointing to the API to fetch past scores
  getSubmission: async (moduleId, userId) => {
    return apiClient.get(`/quiz/${moduleId}/submission`, {
      params: { user_id: userId }
    });
  }
};

export default quizService;