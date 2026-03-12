const discussionService = {
  // Mock fetching discussions
  getModuleDiscussions: async (moduleId) => {
    return { data: [] };
  },

  // Mock creating a post
  createPost: async (moduleId, data) => {
    console.log(`Mock discussion post for module ${moduleId}:`, data);
    return { 
      data: { 
        id: Date.now(), 
        ...data, 
        createdAt: new Date().toISOString() 
      } 
    };
  }
};

export default discussionService;