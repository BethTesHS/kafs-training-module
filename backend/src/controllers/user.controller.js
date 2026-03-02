const userService = require('../services/user.service');

class UserController {

  async getProfile(req, res, next) {
    try {
      const user = await userService.getUserProfile(req.user.userId);
      res.status(200).json({
        message: 'Profile retrieved successfully',
        data: user
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateProfile(req, res, next) {
    try {
      const user = await userService.updateUserProfile(req.user.userId, req.body);
      res.status(200).json({
        message: 'Profile updated successfully',
        data: user
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getStats(req, res, next) {
    try {
      const stats = await userService.getUserStats(req.user.userId);
      res.status(200).json({
        message: 'Statistics retrieved successfully',
        data: stats
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteAccount(req, res, next) {
    try {
      const result = await userService.deleteUser(req.user.userId);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
