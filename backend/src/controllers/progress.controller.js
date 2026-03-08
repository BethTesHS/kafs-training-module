const progressService = require('../services/progress.service');

class ProgressController {
  async getOverallProgress(req, res, next) {
    try {
      const userId = req.user.id;
      const progress = await progressService.getOverallProgress(userId);
      res.status(200).json({
        message: 'Overall progress retrieved successfully',
        data: progress,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getModuleProgress(req, res, next) {
    try {
      const userId = req.user.id;
      const { moduleId } = req.params;

      const progress = await progressService.getModuleProgress(userId, moduleId);
      res.status(200).json({
        message: 'Module progress retrieved successfully',
        data: progress,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateProgress(req, res, next) {
    try {
      const userId = req.user.id;
      const { moduleId } = req.params;
      const data = req.body;

      const progress = await progressService.updateProgress(
        userId,
        moduleId,
        data
      );
      res.status(200).json({
        message: 'Progress updated successfully',
        data: progress,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getLearningPath(req, res, next) {
    try {
      const userId = req.user.id;
      const recommendations =
        await progressService.getLearningPathRecommendations(userId);
      res.status(200).json({
        message: 'Learning path recommendations retrieved successfully',
        data: recommendations,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCertificates(req, res, next) {
    try {
      const userId = req.user.id;
      const certificates = await progressService.getEarnedCertificates(userId);
      res.status(200).json({
        message: 'Certificates retrieved successfully',
        data: certificates,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getQuizPerformance(req, res, next) {
    try {
      const userId = req.user.id;
      const performance = await progressService.getQuizPerformanceSummary(userId);
      res.status(200).json({
        message: 'Quiz performance summary retrieved successfully',
        data: performance,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserActivity(req, res, next) {
    try {
      const userId = req.user.id;
      const { timeframe } = req.query;
      const activity = await progressService.getUserActivitySummary(
        userId,
        timeframe
      );
      res.status(200).json({
        message: 'User activity summary retrieved successfully',
        data: activity,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProgressController();
