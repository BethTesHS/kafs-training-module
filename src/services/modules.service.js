// TODO: Implement modules service functions to interact with backend API for module-related operations.

import apiClient from './api';

const modulesService = {
  // Get all modules
  getAllModules: async (page = 1, limit = 17) => {
    return apiClient.get('/modules', {
      params: { page, limit },
    });
  },

  // Get single module
  getModuleById: async (id) => {
    return apiClient.get(`/modules/${id}`);
  },

  // Get module overview
  getModuleOverview: async (id) => {
    return apiClient.get(`/modules/${id}/overview`);
  },

  // Get module resources
  getModuleResources: async (id) => {
    return apiClient.get(`/modules/${id}/resources`);
  },

  // Get module assignments
  getModuleAssignments: async (id) => {
    return apiClient.get(`/modules/${id}/assignments`);
  },

  // Mark module as complete
  markModuleComplete: async (id) => {
    return apiClient.post(`/modules/${id}/complete`);
  },

  // Update module progress
  updateProgress: async (id, data) => {
    return apiClient.put(`/modules/${id}/progress`, data);
  },
};

export default modulesService;
