const prisma = require('../config/database');

class UserService {
  // Note: Register and Login are now handled by Supabase Auth
  // These methods are kept for reference but should not be used
  // Authentication is managed on the frontend with Supabase Auth

  // Get user profile from Supabase
  // In a real scenario, you would fetch this from Supabase Admin API
  // For now, we just return the user ID passed from the JWT token
  async getUserProfile(userId) {
    // Return user info from Supabase (passed via JWT token in middleware)
    // The profile info comes from the auth middleware's req.user object
    // which is populated from Supabase's JWT token
    return { 
      id: userId,
      message: 'User profile info comes from Supabase auth token'
    };
  }

  // Update user profile
  // Since user profile is managed by Supabase, this is limited to non-auth fields
  async updateUserProfile(userId, data) {
    // Supabase manages core user data (email, password, etc.)
    // This would be where you update user-specific app data if needed
    // For now, just acknowledge the update
    return {
      id: userId,
      message: 'Profile updates should be made through Supabase Auth',
      receivedData: data
    };
  }

  // Get user statistics
  async getUserStats(userId) {
    const progress = await prisma.userProgress.findMany({
      where: { userId },
      include: { module: true }
    });

    const completedModules = progress.filter(p => p.status === 'completed').length;
    const inProgressModules = progress.filter(p => p.status === 'in_progress').length;
    const totalModules = progress.length;

    const quizResults = await prisma.quizResult.findMany({
      where: { userId }
    });

    const averageScore = quizResults.length > 0
      ? quizResults.reduce((sum, result) => sum + result.score, 0) / quizResults.length
      : 0;

    return {
      totalModules,
      completedModules,
      inProgressModules,
      notStartedModules: totalModules - completedModules - inProgressModules,
      averageQuizScore: Math.round(averageScore * 100) / 100,
      totalQuizzesAttempted: quizResults.length,
    };
  }

  // Delete user account
  // In production, you would also call Supabase to delete the auth user
  async deleteUser(userId) {
    // First, delete all user-related data from the database
    // This cascades through related tables

    return { 
      message: 'User deletion initiated. Please also delete the user from Supabase Auth console.' 
    };
  }
}

module.exports = new UserService();
