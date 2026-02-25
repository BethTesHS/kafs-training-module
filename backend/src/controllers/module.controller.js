const moduleService = require('../services/module.service');

class ModuleController {
  async getAllModules(req, res) {
    try {
      const withProgress = req.query.withProgress === 'true';
      const modules = await moduleService.getAllModules(withProgress, req.user?.userId);
      
      res.status(200).json({
        message: 'Modules retrieved successfully',
        data: modules,
        total: modules.length
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getModuleById(req, res) {
    try {
      const module = await moduleService.getModuleById(req.params.id, req.user?.userId);
      
      res.status(200).json({
        message: 'Module retrieved successfully',
        data: module
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getModuleOverview(req, res) {
    try {
      const overview = await moduleService.getModuleOverview(req.params.id);
      
      res.status(200).json({
        message: 'Module overview retrieved successfully',
        data: overview
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getModuleResources(req, res) {
    try {
      const resources = await moduleService.getModuleResources(req.params.id);
      
      res.status(200).json({
        message: 'Module resources retrieved successfully',
        data: resources
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getModuleAssignments(req, res) {
    try {
      const assignments = await moduleService.getModuleAssignments(req.params.id);
      
      res.status(200).json({
        message: 'Module assignments retrieved successfully',
        data: assignments
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async markModuleComplete(req, res) {
    try {
      const progress = await moduleService.markModuleComplete(
        req.user.userId,
        req.params.id
      );
      
      res.status(200).json({
        message: 'Module marked as complete',
        data: progress
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateProgress(req, res) {
    try {
      const { percentage } = req.body;
      
      if (typeof percentage !== 'number' || percentage < 0 || percentage > 100) {
        return res.status(400).json({ error: 'Percentage must be between 0 and 100' });
      }

      const progress = await moduleService.updateProgressPercentage(
        req.user.userId,
        req.params.id,
        percentage
      );
      
      res.status(200).json({
        message: 'Progress updated successfully',
        data: progress
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ModuleController();
