// TODO: Implement files service functions to interact with backend API for file-related operations.

import apiClient from './api';

const filesService = {
  // Upload file
  uploadFile: async (formData) => {
    return apiClient.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Get user files
  getUserFiles: async (page = 1, limit = 10) => {
    return apiClient.get('/files', {
      params: { page, limit },
    });
  },

  // Get file by ID
  getFileById: async (id) => {
    return apiClient.get(`/files/${id}`);
  },

  // Delete file
  deleteFile: async (id) => {
    return apiClient.delete(`/files/${id}`);
  },

  // Get module resources
  getModuleResources: async (moduleId) => {
    return apiClient.get(`/files/module/${moduleId}/resources`);
  },
};

export default filesService;
