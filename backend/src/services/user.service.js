const prisma = require('../config/database');
const { hashPassword, comparePassword } = require('../utils/password');
const { generateToken } = require('../utils/jwt');

class UserService {
  // Register a new user
  async register(data) {
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          { username: data.username }
        ]
      }
    });

    if (existingUser) {
      throw new Error('Email or username already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        fullName: data.fullName,
        username: data.username,
        role: 'trainee', // Default role
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        username: true,
        role: true,
        createdAt: true,
      }
    });

    // Generate token
    const token = generateToken(user.id, user.role);

    return { user, token };
  }

  // Login user
  async login(email, password) {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });

    // Generate token
    const token = generateToken(user.id, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        username: user.username,
        role: user.role,
      },
      token
    };
  }

  // Get user profile
  async getUserProfile(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        username: true,
        role: true,
        profilePictureUrl: true,
        bio: true,
        createdAt: true,
        lastLogin: true,
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  // Update user profile
  async updateUserProfile(userId, data) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        fullName: data.fullName,
        username: data.username,
        bio: data.bio,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        username: true,
        role: true,
        profilePictureUrl: true,
        bio: true,
      }
    });

    return user;
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

  // Delete user account (admin only)
  async deleteUser(userId) {
    await prisma.user.delete({
      where: { id: userId }
    });

    return { message: 'User deleted successfully' };
  }
}

module.exports = new UserService();
