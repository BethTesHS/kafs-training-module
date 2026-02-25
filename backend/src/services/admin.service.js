const prisma = require('../config/database');

class AdminService {
  // Get all users
  async getAllUsers(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          fullName: true,
          username: true,
          role: true,
          createdAt: true,
          lastLogin: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      });

      const total = await prisma.user.count();

      return {
        users,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new Error(`Failed to get users: ${error.message}`);
    }
  }

  // Get user details
  async getUserDetails(userId) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          fullName: true,
          username: true,
          role: true,
          bio: true,
          createdAt: true,
          lastLogin: true,
          progress: {
            select: {
              moduleId: true,
              status: true,
              progressPercentage: true,
            },
          },
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      throw new Error(
        `Failed to get user details: ${error.message}`
      );
    }
  }

  // Update user role
  async updateUserRole(userId, newRole) {
    try {
      const validRoles = ['trainee', 'supervisor', 'admin'];

      if (!validRoles.includes(newRole)) {
        throw new Error('Invalid role');
      }

      const user = await prisma.user.update({
        where: { id: userId },
        data: { role: newRole },
        select: {
          id: true,
          email: true,
          fullName: true,
          role: true,
        },
      });

      return user;
    } catch (error) {
      throw new Error(`Failed to update user role: ${error.message}`);
    }
  }

  // Delete user
  async deleteUser(userId) {
    try {
      await prisma.user.delete({
        where: { id: userId },
      });

      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }

  // Get all modules
  async getAllModules(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      const modules = await prisma.module.findMany({
        skip,
        take: limit,
        orderBy: { orderNumber: 'asc' },
      });

      const total = await prisma.module.count();

      return {
        modules,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new Error(`Failed to get modules: ${error.message}`);
    }
  }

  // Create a new module
  async createModule(data) {
    try {
      const module = await prisma.module.create({
        data: {
          title: data.title,
          description: data.description,
          difficulty: data.difficulty || 'intermediate',
          estimatedDuration: data.estimatedDuration || 120,
          color: data.color,
          orderNumber: data.orderNumber,
        },
      });

      return module;
    } catch (error) {
      throw new Error(`Failed to create module: ${error.message}`);
    }
  }

  // Update module
  async updateModule(moduleId, data) {
    try {
      const module = await prisma.module.update({
        where: { id: moduleId },
        data: {
          title: data.title || undefined,
          description: data.description || undefined,
          difficulty: data.difficulty || undefined,
          estimatedDuration: data.estimatedDuration || undefined,
          color: data.color || undefined,
          orderNumber: data.orderNumber || undefined,
        },
      });

      return module;
    } catch (error) {
      throw new Error(`Failed to update module: ${error.message}`);
    }
  }

  // Delete module
  async deleteModule(moduleId) {
    try {
      await prisma.module.delete({
        where: { id: moduleId },
      });

      return { message: 'Module deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete module: ${error.message}`);
    }
  }

  // Get system statistics
  async getSystemStats() {
    try {
      const totalUsers = await prisma.user.count();
      const totalModules = await prisma.module.count();
      const totalQuizAttempts = await prisma.quizResult.count();

      const usersByRole = await prisma.user.groupBy({
        by: ['role'],
        _count: true,
      });

      const moduleProgress = await prisma.userProgress.groupBy({
        by: ['status'],
        _count: true,
      });

      const avgQuizScore = await prisma.quizResult.aggregate({
        _avg: {
          score: true,
        },
      });

      return {
        totalUsers,
        totalModules,
        totalQuizAttempts,
        usersByRole,
        moduleProgress,
        avgQuizScore: (avgQuizScore._avg.score || 0).toFixed(2),
        timestamp: new Date(),
      };
    } catch (error) {
      throw new Error(`Failed to get system stats: ${error.message}`);
    }
  }

  // Get activity log
  async getActivityLog(filters = {}, page = 1, limit = 20) {
    try {
      const skip = (page - 1) * limit;
      const { userId, action, startDate, endDate } = filters;

      const whereClause = {};

      if (userId) {
        whereClause.userId = userId;
      }

      if (startDate || endDate) {
        whereClause.createdAt = {};
        if (startDate) {
          whereClause.createdAt.gte = new Date(startDate);
        }
        if (endDate) {
          whereClause.createdAt.lte = new Date(endDate);
        }
      }

      const activities = await prisma.userProgress.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
            },
          },
          module: {
            select: {
              id: true,
              title: true,
            },
          },
        },
        orderBy: { updatedAt: 'desc' },
        skip,
        take: limit,
      });

      const total = await prisma.userProgress.count({
        where: whereClause,
      });

      return {
        activities,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new Error(`Failed to get activity log: ${error.message}`);
    }
  }

  // Get module performance report
  async getModulePerformanceReport(moduleId) {
    try {
      const module = await prisma.module.findUnique({
        where: { id: moduleId },
        include: {
          progress: {
            include: {
              user: {
                select: {
                  id: true,
                  fullName: true,
                },
              },
            },
          },
          quizQuestions: true,
        },
      });

      if (!module) {
        throw new Error('Module not found');
      }

      const quizResults = await prisma.quizResult.findMany({
        where: { moduleId },
      });

      const avgScore =
        quizResults.length > 0
          ? (
              quizResults.reduce((sum, r) => sum + r.score, 0) /
              quizResults.length
            ).toFixed(2)
          : 0;

      const completionRate = (
        (module.progress.filter((p) => p.status === 'completed').length /
          module.progress.length) *
        100
      ).toFixed(2);

      return {
        module: {
          id: module.id,
          title: module.title,
          description: module.description,
        },
        stats: {
          totalEnrollments: module.progress.length,
          completedCount: module.progress.filter(
            (p) => p.status === 'completed'
          ).length,
          completionRate,
          quizAttempts: quizResults.length,
          avgQuizScore: avgScore,
        },
        progress: module.progress,
        quizResults: quizResults.slice(0, 10),
      };
    } catch (error) {
      throw new Error(
        `Failed to get module performance report: ${error.message}`
      );
    }
  }
}

module.exports = new AdminService();
