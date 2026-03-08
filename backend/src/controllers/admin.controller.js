const adminService = require('../services/admin.service');

class AdminController {
  async getAllUsers(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const users = await adminService.getAllUsers(parseInt(page), parseInt(limit));

      res.status(200).json({
        message: 'Users retrieved successfully',
        data: users,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserDetails(req, res, next) {
    try {
      const { userId } = req.params;
      const user = await adminService.getUserDetails(userId);

      res.status(200).json({
        message: 'User details retrieved successfully',
        data: user,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateUserRole(req, res, next) {
    try {
      const { userId } = req.params;
      const { role } = req.body;

      if (!role) {
        return res.status(400).json({ error: 'Role is required' });
      }

      const user = await adminService.updateUserRole(userId, role);

      res.status(200).json({
        message: 'User role updated successfully',
        data: user,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { userId } = req.params;
      const result = await adminService.deleteUser(userId);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllModules(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const modules = await adminService.getAllModules(
        parseInt(page),
        parseInt(limit)
      );

      res.status(200).json({
        message: 'Modules retrieved successfully',
        data: modules,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createModule(req, res, next) {
    try {
      const { title, description, difficulty, estimatedDuration, color, orderNumber } = req.body;

      if (!title || !color || !orderNumber) {
        return res.status(400).json({
          error: 'Title, color, and orderNumber are required',
        });
      }

      const module = await adminService.createModule({
        title,
        description,
        difficulty,
        estimatedDuration,
        color,
        orderNumber,
      });

      res.status(201).json({
        message: 'Module created successfully',
        data: module,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateModule(req, res, next) {
    try {
      const { moduleId } = req.params;
      const data = req.body;

      const module = await adminService.updateModule(moduleId, data);

      res.status(200).json({
        message: 'Module updated successfully',
        data: module,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteModule(req, res, next) {
    try {
      const { moduleId } = req.params;
      const result = await adminService.deleteModule(moduleId);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSystemStats(req, res, next) {
    try {
      const stats = await adminService.getSystemStats();

      res.status(200).json({
        message: 'System statistics retrieved successfully',
        data: stats,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getActivityLog(req, res, next) {
    try {
      const { page = 1, limit = 20, userId, action, startDate, endDate } = req.query;

      const activityLog = await adminService.getActivityLog(
        { userId, action, startDate, endDate },
        parseInt(page),
        parseInt(limit)
      );

      res.status(200).json({
        message: 'Activity log retrieved successfully',
        data: activityLog,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getModulePerformanceReport(req, res, next) {
    try {
      const { moduleId } = req.params;
      const report = await adminService.getModulePerformanceReport(moduleId);

      res.status(200).json({
        message: 'Module performance report retrieved successfully',
        data: report,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AdminController();
