// TODO: Implement discussion service functions to interact with backend API for discussion-related operations.

import apiClient from './api';

const discussionService = {
  // Get module discussions
  getModuleDiscussions: async (moduleId, page = 1, limit = 10) => {
    return apiClient.get(`/discussion/modules/${moduleId}`, {
      params: { page, limit },
    });
  },

  // Get specific discussion post
  getPost: async (postId) => {
    return apiClient.get(`/discussion/posts/${postId}`);
  },

  // Create discussion post
  createPost: async (moduleId, data) => {
    return apiClient.post(`/discussion/modules/${moduleId}`, data);
  },

  // Update discussion post
  updatePost: async (postId, data) => {
    return apiClient.put(`/discussion/posts/${postId}`, data);
  },

  // Delete discussion post
  deletePost: async (postId) => {
    return apiClient.delete(`/discussion/posts/${postId}`);
  },

  // Create reply
  createReply: async (postId, data) => {
    return apiClient.post(`/discussion/posts/${postId}/replies`, data);
  },

  // Delete reply
  deleteReply: async (replyId) => {
    return apiClient.delete(`/discussion/replies/${replyId}`);
  },
};

export default discussionService;
