const fileService = require('../services/file.service');

class FileController {
  async uploadFile(req, res) {
    try {
      // Mock file upload (in production, use multer for actual file handling)
      const { fileName, fileUrl, fileSizeBytes, fileType, moduleId } = req.body;

      if (!fileName || !fileUrl || !fileSizeBytes) {
        return res.status(400).json({ 
          error: 'fileName, fileUrl, and fileSizeBytes are required' 
        });
      }

      const file = await fileService.uploadFile(
        req.user.userId,
        { fileName, fileUrl, fileSizeBytes, fileType },
        moduleId
      );

      res.status(201).json({
        message: 'File uploaded successfully',
        data: file
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUserFiles(req, res) {
    try {
      const files = await fileService.getUserFiles(
        req.user.userId,
        req.query.moduleId || null
      );

      res.status(200).json({
        message: 'User files retrieved successfully',
        data: files,
        total: files.length
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getFileById(req, res) {
    try {
      const file = await fileService.getFileById(req.params.id, req.user.userId);

      res.status(200).json({
        message: 'File retrieved successfully',
        data: file
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async deleteFile(req, res) {
    try {
      const result = await fileService.deleteFile(req.params.id, req.user.userId);

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getModuleResources(req, res) {
    try {
      const resources = await fileService.getModuleResources(req.params.moduleId);

      res.status(200).json({
        message: 'Module resources retrieved successfully',
        data: resources,
        total: resources.length
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new FileController();
