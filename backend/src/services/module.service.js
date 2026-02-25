const prisma = require('../config/database');

class ModuleService {
  // Get all modules
  async getAllModules(withProgress = false, userId = null) {
    const modules = await prisma.module.findMany({
      orderBy: { orderNumber: 'asc' },
      include: {
        content: true,
        _count: {
          select: { quizQuestions: true, resources: true }
        }
      }
    });

    if (withProgress && userId) {
      return await Promise.all(modules.map(async (module) => {
        const progress = await prisma.userProgress.findUnique({
          where: {
            userId_moduleId: { userId, moduleId: module.id }
          }
        });

        return { ...module, userProgress: progress };
      }));
    }

    return modules;
  }

  // Get single module with all content
  async getModuleById(moduleId, userId = null) {
    const module = await prisma.module.findUnique({
      where: { id: moduleId },
      include: {
        content: true,
        quizQuestions: {
          orderBy: { orderNumber: 'asc' }
        },
        resources: {
          orderBy: { orderNumber: 'asc' }
        },
        assignments: true,
        _count: {
          select: { 
            quizQuestions: true, 
            resources: true,
            assignments: true 
          }
        }
      }
    });

    if (!module) {
      throw new Error('Module not found');
    }

    // Get user progress if userId provided
    if (userId) {
      const progress = await prisma.userProgress.findUnique({
        where: {
          userId_moduleId: { userId, moduleId }
        }
      });

      return { ...module, userProgress: progress };
    }

    return module;
  }

  // Get module overview
  async getModuleOverview(moduleId) {
    const module = await prisma.module.findUnique({
      where: { id: moduleId },
      select: {
        id: true,
        title: true,
        description: true,
        estimatedDurationHours: true,
        difficultyLevel: true,
        colorCode: true,
        content: {
          select: {
            overview: true,
            learningObjectives: true,
            keyConcepts: true,
            estimatedTime: true,
          }
        }
      }
    });

    if (!module) {
      throw new Error('Module not found');
    }

    return module;
  }

  // Get module resources
  async getModuleResources(moduleId) {
    const resources = await prisma.resource.findMany({
      where: { moduleId },
      orderBy: { orderNumber: 'asc' },
      select: {
        id: true,
        title: true,
        description: true,
        fileUrl: true,
        fileType: true,
        fileSizeBytes: true,
      }
    });

    return resources;
  }

  // Get module assignments
  async getModuleAssignments(moduleId) {
    const assignments = await prisma.assignment.findMany({
      where: { moduleId },
      select: {
        id: true,
        title: true,
        description: true,
        dueDate: true,
        createdAt: true,
      }
    });

    return assignments;
  }

  // Mark module as complete
  async markModuleComplete(userId, moduleId) {
    const progress = await prisma.userProgress.upsert({
      where: {
        userId_moduleId: { userId, moduleId }
      },
      update: {
        status: 'completed',
        progressPercentage: 100,
        completedAt: new Date()
      },
      create: {
        userId,
        moduleId,
        status: 'completed',
        progressPercentage: 100,
        completedAt: new Date()
      }
    });

    return progress;
  }

  // Update module progress
  async updateProgressPercentage(userId, moduleId, percentage) {
    const progress = await prisma.userProgress.upsert({
      where: {
        userId_moduleId: { userId, moduleId }
      },
      update: {
        progressPercentage: percentage,
        status: percentage === 100 ? 'completed' : 'in_progress',
        completedAt: percentage === 100 ? new Date() : null,
      },
      create: {
        userId,
        moduleId,
        progressPercentage: percentage,
        status: percentage === 100 ? 'completed' : 'in_progress',
        completedAt: percentage === 100 ? new Date() : null,
      }
    });

    return progress;
  }
}

module.exports = new ModuleService();
