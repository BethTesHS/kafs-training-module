const prisma = require('../config/database');

class ProgressService {
  // Get user's overall progress
  async getOverallProgress(userId) {
    try {
      const totalModules = await prisma.module.count();
      
      const userProgress = await prisma.userProgress.findMany({
        where: { userId },
        include: {
          module: true,
        },
      });

      const completedModules = userProgress.filter(
        (p) => p.status === 'completed'
      ).length;

      const inProgressModules = userProgress.filter(
        (p) => p.status === 'in_progress'
      ).length;

      const notStartedModules = totalModules - completedModules - inProgressModules;

      const overallProgress = (
        (completedModules / totalModules) * 100
      ).toFixed(2);

      return {
        totalModules,
        completedModules,
        inProgressModules,
        notStartedModules,
        overallProgress,
        modules: userProgress,
      };
    } catch (error) {
      throw new Error(`Failed to get overall progress: ${error.message}`);
    }
  }

  // Get progress for a specific module
  async getModuleProgress(userId, moduleId) {
    try {
      const progress = await prisma.userProgress.findUnique({
        where: {
          userId_moduleId: {
            userId,
            moduleId,
          },
        },
        include: {
          module: true,
          quizResults: true,
        },
      });

      if (!progress) {
        return {
          status: 'not_started',
          progressPercentage: 0,
          timeSpent: 0,
          quizAttempts: 0,
          bestScore: 0,
          resourcesViewed: 0,
        };
      }

      return progress;
    } catch (error) {
      throw new Error(`Failed to get module progress: ${error.message}`);
    }
  }

  // Update user progress
  async updateProgress(userId, moduleId, data) {
    try {
      const progress = await prisma.userProgress.upsert({
        where: {
          userId_moduleId: {
            userId,
            moduleId,
          },
        },
        update: {
          status: data.status || undefined,
          progressPercentage: data.progressPercentage || undefined,
          timeSpent: data.timeSpent || undefined,
          resourcesViewed: data.resourcesViewed || undefined,
          lastAccessedAt: new Date(),
        },
        create: {
          userId,
          moduleId,
          status: data.status || 'in_progress',
          progressPercentage: data.progressPercentage || 0,
          timeSpent: data.timeSpent || 0,
          resourcesViewed: data.resourcesViewed || 0,
        },
      });

      return progress;
    } catch (error) {
      throw new Error(`Failed to update progress: ${error.message}`);
    }
  }

  // Get user's learning path recommendations
  async getLearningPathRecommendations(userId) {
    try {
      const userProgress = await prisma.userProgress.findMany({
        where: { userId },
        include: { module: true },
      });

      const completedModules = userProgress
        .filter((p) => p.status === 'completed')
        .map((p) => p.moduleId);

      const inProgressModules = userProgress
        .filter((p) => p.status === 'in_progress')
        .sort((a, b) => b.progressPercentage - a.progressPercentage)
        .slice(0, 3);

      const notStartedModules = await prisma.module.findMany({
        where: {
          id: {
            notIn: userProgress.map((p) => p.moduleId),
          },
        },
        take: 3,
      });

      return {
        continueModules: inProgressModules,
        recommendedModules: notStartedModules,
        completedCount: completedModules.length,
      };
    } catch (error) {
      throw new Error(
        `Failed to get learning path recommendations: ${error.message}`
      );
    }
  }

  // Get earned certificates
  async getEarnedCertificates(userId) {
    try {
      const completedModules = await prisma.userProgress.findMany({
        where: {
          userId,
          status: 'completed',
        },
        include: {
          module: true,
        },
        orderBy: {
          completedAt: 'desc',
        },
      });

      return {
        totalCertificates: completedModules.length,
        certificates: completedModules.map((p) => ({
          moduleId: p.moduleId,
          moduleName: p.module.title,
          completedDate: p.completedAt,
          certificateUrl: `/certificates/${p.userId}-${p.moduleId}.pdf`,
        })),
      };
    } catch (error) {
      throw new Error(`Failed to get certificates: ${error.message}`);
    }
  }

  // Get quiz performance summary
  async getQuizPerformanceSummary(userId) {
    try {
      const quizResults = await prisma.quizResult.findMany({
        where: { userId },
        include: {
          module: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const avgScore =
        quizResults.length > 0
          ? (
              quizResults.reduce((sum, r) => sum + r.score, 0) /
              quizResults.length
            ).toFixed(2)
          : 0;

      const bestScore =
        quizResults.length > 0
          ? Math.max(...quizResults.map((r) => r.score))
          : 0;

      const worstScore =
        quizResults.length > 0
          ? Math.min(...quizResults.map((r) => r.score))
          : 0;

      return {
        totalAttempts: quizResults.length,
        averageScore: avgScore,
        bestScore,
        worstScore,
        recentAttempts: quizResults.slice(0, 5),
      };
    } catch (error) {
      throw new Error(
        `Failed to get quiz performance summary: ${error.message}`
      );
    }
  }

  // Get user activity summary (for analytics)
  async getUserActivitySummary(userId, timeframe = '30days') {
    try {
      let since = new Date();
      switch (timeframe) {
        case '7days':
          since.setDate(since.getDate() - 7);
          break;
        case '30days':
          since.setDate(since.getDate() - 30);
          break;
        case '90days':
          since.setDate(since.getDate() - 90);
          break;
        default:
          since.setDate(since.getDate() - 30);
      }

      const activity = await prisma.userProgress.findMany({
        where: {
          userId,
          lastAccessedAt: {
            gte: since,
          },
        },
        include: { module: true },
      });

      const totalTimeSpent = activity.reduce((sum, a) => sum + a.timeSpent, 0);
      const avgTimePerModule = activity.length
        ? (totalTimeSpent / activity.length).toFixed(2)
        : 0;

      return {
        timeframe,
        modulesAccessed: activity.length,
        totalTimeSpent,
        avgTimePerModule,
        activityByModule: activity,
      };
    } catch (error) {
      throw new Error(
        `Failed to get user activity summary: ${error.message}`
      );
    }
  }
}

module.exports = new ProgressService();
