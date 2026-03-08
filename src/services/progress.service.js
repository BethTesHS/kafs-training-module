// TODO: Implement progress service functions to interact with backend API for progress-related operations.

import apiClient from './api';

const progressService = {
  // Get overall progress
  getOverallProgress: async () => {
    return apiClient.get('/progress');
  },

  // Get module progress
  getModuleProgress: async (moduleId) => {
    return apiClient.get(`/progress/${moduleId}`);
  },

  // Update module progress
  updateProgress: async (moduleId, data) => {
    return apiClient.put(`/progress/${moduleId}`, data);
  },

  // Get learning path recommendations
  getLearningPath: async () => {
    return apiClient.get('/progress/learning-path');
  },

  // Get earned certificates
  getCertificates: async () => {
    return apiClient.get('/progress/certificates');
  },

  // Get quiz performance
  getQuizPerformance: async () => {
    return apiClient.get('/progress/quiz-performance');
  },

  // Get user activity
  getUserActivity: async () => {
    return apiClient.get('/progress/activity');
  },
};

export default progressService;
