// const prisma = require('../config/database');

// class AdminService {
//   // Get all users
//   // Note: User data is now managed by Supabase Auth
//   // This method returns a message directing to use Supabase console
//   async getAllUsers(page = 1, limit = 10) {
//     try {
//       return {
//         message: 'User management is now handled by Supabase Auth',
//         note: 'Please use the Supabase console to manage users',
//         hint: 'You can query user activity from other tables like UserProgress, QuizResult, etc.'
//       };
//     } catch (error) {
//       throw new Error(`Failed to get users: ${error.message}`);
//     }
//   }

//   // Get user details
//   // Returns activity and progress data for a user
//   async getUserDetails(userId) {
//     try {
//       const userProgress = await prisma.userProgress.findMany({
//         where: { userId },
//         include: { module: true }
//       });

//       const quizResults = await prisma.quizResult.findMany({
//         where: { userId }
//       });

//       const fileUploads = await prisma.fileUpload.findMany({
//         where: { userId },
//         include: { module: true }
//       });

//       return {
//         userId,
//         progress: userProgress,
//         quizResults,
//         fileUploads,
//         note: 'Auth details available in Supabase console'
//       };
//     } catch (error) {
//       throw new Error(`Failed to get user details: ${error.message}`);
//     }
//   }

//   // Update user role
//   // Note: Roles are now managed in Supabase Custom Claims or separate role table
//   async updateUserRole(userId, newRole) {
//     try {
//       const validRoles = ['trainee', 'supervisor', 'admin'];

//       if (!validRoles.includes(newRole)) {
//         throw new Error('Invalid role');
//       }

//       // User roles should be managed through Supabase Custom Claims or a separate role table
//       return {
//         message: 'Role update should be done through Supabase Auth',
//         userId,
//         newRole,
//         note: 'Configure custom claims in Supabase dashboard'
//       };
//     } catch (error) {
//       throw new Error(`Failed to update user role: ${error.message}`);
//     }
//   }

//   // Delete user
//   // Note: User deletion should be done through Supabase console
//   async deleteUser(userId) {
//     try {
//       // Clean up all user-related data in the application database
//       await prisma.userProgress.deleteMany({ where: { userId } });
//       await prisma.quizResult.deleteMany({ where: { userId } });
//       await prisma.fileUpload.deleteMany({ where: { userId } });
//       await prisma.assignmentSubmission.deleteMany({ where: { userId } });
//       await prisma.discussionPost.deleteMany({ where: { userId } });
//       await prisma.discussionReply.deleteMany({ where: { userId } });

//       return {
//         message: 'User data cleaned from application database. Delete user from Supabase Auth console.',
//         userId
//       };
//     } catch (error) {
//       throw new Error(`Failed to delete user data: ${error.message}`);
//     }
//   }

//   // Get all modules
//   async getAllModules(page = 1, limit = 10) {
//     try {
//       const skip = (page - 1) * limit;

//       const modules = await prisma.module.findMany({
//         skip,
//         take: limit,
//         orderBy: { orderNumber: 'asc' },
//       });

//       const total = await prisma.module.count();

//       return {
//         modules,
//         pagination: {
//           total,
//           page,
//           limit,
//           pages: Math.ceil(total / limit),
//         },
//       };
//     } catch (error) {
//       throw new Error(`Failed to get modules: ${error.message}`);
//     }
//   }

//   // Create a new module
//   async createModule(data) {
//     try {
//       const module = await prisma.module.create({
//         data: {
//           title: data.title,
//           description: data.description,
//           difficulty: data.difficulty || 'intermediate',
//           estimatedDuration: data.estimatedDuration || 120,
//           color: data.color,
//           orderNumber: data.orderNumber,
//         },
//       });

//       return module;
//     } catch (error) {
//       throw new Error(`Failed to create module: ${error.message}`);
//     }
//   }

//   // Update module
//   async updateModule(moduleId, data) {
//     try {
//       const module = await prisma.module.update({
//         where: { id: moduleId },
//         data: {
//           title: data.title || undefined,
//           description: data.description || undefined,
//           difficulty: data.difficulty || undefined,
//           estimatedDuration: data.estimatedDuration || undefined,
//           color: data.color || undefined,
//           orderNumber: data.orderNumber || undefined,
//         },
//       });

//       return module;
//     } catch (error) {
//       throw new Error(`Failed to update module: ${error.message}`);
//     }
//   }

//   // Delete module
//   async deleteModule(moduleId) {
//     try {
//       await prisma.module.delete({
//         where: { id: moduleId },
//       });

//       return { message: 'Module deleted successfully' };
//     } catch (error) {
//       throw new Error(`Failed to delete module: ${error.message}`);
//     }
//   }

//   // Get system statistics
//   async getSystemStats() {
//     try {
//       // User stats are now managed by Supabase
//       const totalModules = await prisma.module.count();
//       const totalQuizAttempts = await prisma.quizResult.count();
//       const uniqueUsers = await prisma.userProgress.findMany({
//         select: { userId: true },
//         distinct: ['userId']
//       });

//       const moduleProgress = await prisma.userProgress.groupBy({
//         by: ['status'],
//         _count: true,
//       });

//       const avgQuizScore = await prisma.quizResult.aggregate({
//         _avg: {
//           score: true,
//         },
//       });

//       return {
//         totalUsers: uniqueUsers.length, // Derived from user progress
//         totalModules,
//         totalQuizAttempts,
//         moduleProgress,
//         avgQuizScore: (avgQuizScore._avg.score || 0).toFixed(2),
//         note: 'User roles and detailed user info managed by Supabase Auth',
//         timestamp: new Date(),
//       };
//     } catch (error) {
//       throw new Error(`Failed to get system stats: ${error.message}`);
//     }
//   }

//   // Get activity log
//   async getActivityLog(filters = {}, page = 1, limit = 20) {
//     try {
//       const skip = (page - 1) * limit;
//       const { userId, action, startDate, endDate } = filters;

//       const whereClause = {};

//       if (userId) {
//         whereClause.userId = userId;
//       }

//       if (startDate || endDate) {
//         whereClause.updatedAt = {};
//         if (startDate) {
//           whereClause.updatedAt.gte = new Date(startDate);
//         }
//         if (endDate) {
//           whereClause.updatedAt.lte = new Date(endDate);
//         }
//       }

//       const activities = await prisma.userProgress.findMany({
//         where: whereClause,
//         include: {
//           module: {
//             select: {
//               id: true,
//               title: true,
//             },
//           },
//         },
//         orderBy: { updatedAt: 'desc' },
//         skip,
//         take: limit,
//       });

//       const total = await prisma.userProgress.count({
//         where: whereClause,
//       });

//       return {
//         activities,
//         pagination: {
//           total,
//           page,
//           limit,
//           pages: Math.ceil(total / limit),
//         },
//       };
//     } catch (error) {
//       throw new Error(`Failed to get activity log: ${error.message}`);
//     }
//   }

//   // Get module performance report
//   async getModulePerformanceReport(moduleId) {
//     try {
//       const module = await prisma.module.findUnique({
//         where: { id: moduleId },
//         include: {
//           userProgress: true,
//           quizQuestions: true,
//         },
//       });

//       if (!module) {
//         throw new Error('Module not found');
//       }

//       const quizResults = await prisma.quizResult.findMany({
//         where: { moduleId },
//       });

//       const avgScore =
//         quizResults.length > 0
//           ? (
//               quizResults.reduce((sum, r) => sum + r.score, 0) /
//               quizResults.length
//             ).toFixed(2)
//           : 0;

//       const completionRate = module.userProgress.length > 0
//         ? (
//             (module.userProgress.filter((p) => p.status === 'completed').length /
//               module.userProgress.length) *
//             100
//           ).toFixed(2)
//         : 0;

//       return {
//         module: {
//           id: module.id,
//           title: module.title,
//           description: module.description,
//         },
//         stats: {
//           totalEnrollments: module.userProgress.length,
//           completedCount: module.userProgress.filter(
//             (p) => p.status === 'completed'
//           ).length,
//           completionRate,
//           quizAttempts: quizResults.length,
//           avgQuizScore: avgScore,
//         },
//         progress: module.userProgress,
//         quizResults: quizResults.slice(0, 10),
//       };
//     } catch (error) {
//       throw new Error(
//         `Failed to get module performance report: ${error.message}`
//       );
//     }
//   }
// }

// module.exports = new AdminService();
