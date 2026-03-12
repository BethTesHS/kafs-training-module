const progressService = {
  // Mock fetching progress
  getModuleProgress: async (moduleId) => {
    return { 
      data: { 
        status: 'not_started', 
        progressPercentage: 0 
      } 
    };
  },

  // Mock updating progress
  updateProgress: async (moduleId, data) => {
    console.log(`Mock progress update for module ${moduleId}:`, data);
    return { data: { success: true, ...data } };
  }
};

export default progressService;