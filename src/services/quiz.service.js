// TODO: Implement quiz service functions to interact with backend API for quiz-related operations.

import apiClient from './api';

const quizService = {
  // Get quiz questions for a module
  getQuizQuestions: async (moduleId) => {
    return apiClient.get(`/quiz/${moduleId}/questions`);
  },

  // Submit quiz
  submitQuiz: async (moduleId, answers) => {
    return apiClient.post(`/quiz/${moduleId}/submit`, { answers });
  },

  // Get user's quiz results
  getResults: async (page = 1, limit = 10) => {
    return apiClient.get('/quiz/results', {
      params: { page, limit },
    });
  },

  // Get specific result details
  getResultDetails: async (resultId) => {
    return apiClient.get(`/quiz/results/${resultId}`);
  },
};

export default quizService;
