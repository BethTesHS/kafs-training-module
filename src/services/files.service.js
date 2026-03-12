const filesService = {
  // Mock fetching resources
  getModuleResources: async (moduleId) => {
    return { data: [] }; 
  },

  // Mock uploading a file
  uploadFile: async (fileData) => {
    console.log("Mock file upload:", fileData);
    return { data: { success: true, message: "File uploaded locally" } };
  },

  // Mock deleting a file
  deleteFile: async (fileId) => {
    return { data: { success: true } };
  }
};

export default filesService;