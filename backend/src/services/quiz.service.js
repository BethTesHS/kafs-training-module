const prisma = require('../config/database');

class QuizService {
  // Get quiz questions for a module
  async getQuizQuestions(moduleId) {
    const questions = await prisma.quizQuestion.findMany({
      where: { moduleId },
      orderBy: { orderNumber: 'asc' },
      select: {
        id: true,
        questionText: true,
        questionType: true,
        options: true,
        difficultyLevel: true,
        orderNumber: true,
        // Don't send correct answer to client
      }
    });

    if (questions.length === 0) {
      throw new Error('No quiz questions found for this module');
    }

    return questions;
  }

  // Get single question with answer (admin)
  async getQuestion(questionId) {
    const question = await prisma.quizQuestion.findUnique({
      where: { id: questionId }
    });

    if (!question) {
      throw new Error('Question not found');
    }

    return question;
  }

  // Submit quiz answers
  async submitQuiz(userId, moduleId, answers, timeTaken) {
    // Get all questions for the module
    const questions = await prisma.quizQuestion.findMany({
      where: { moduleId }
    });

    if (questions.length === 0) {
      throw new Error('No quiz questions found for this module');
    }

    // Calculate score
    let correctAnswersCount = 0;
    const detailedAnswers = [];

    questions.forEach((question) => {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) {
        correctAnswersCount++;
      }

      detailedAnswers.push({
        questionId: question.id,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect
      });
    });

    const score = (correctAnswersCount / questions.length) * 100;

    // Save quiz result
    const result = await prisma.quizResult.create({
      data: {
        userId,
        moduleId,
        questionId: questions[0].id, // Store first question ID
        totalQuestions: questions.length,
        correctAnswers: correctAnswersCount,
        score: Math.round(score * 100) / 100,
        timeTakenMinutes: Math.round(timeTaken / 60),
        userAnswers: detailedAnswers
      }
    });

    // Update user progress
    await prisma.userProgress.upsert({
      where: {
        userId_moduleId: { userId, moduleId }
      },
      update: {
        quizScore: Math.round(score * 100) / 100,
        status: 'completed',
        progressPercentage: 100,
        completedAt: new Date(),
      },
      create: {
        userId,
        moduleId,
        quizScore: Math.round(score * 100) / 100,
        status: 'completed',
        progressPercentage: 100,
        completedAt: new Date(),
      }
    });

    return {
      result: {
        id: result.id,
        score: result.score,
        correctAnswers: result.correctAnswers,
        totalQuestions: result.totalQuestions,
        timeTaken: result.timeTakenMinutes,
        answers: detailedAnswers,
      }
    };
  }

  // Get quiz results for user
  async getQuizResults(userId, moduleId = null) {
    const where = { userId };
    if (moduleId) {
      where.moduleId = moduleId;
    }

    const results = await prisma.quizResult.findMany({
      where,
      include: {
        module: {
          select: {
            id: true,
            title: true,
          }
        }
      },
      orderBy: { submittedAt: 'desc' }
    });

    return results;
  }

  // Get quiz result details
  async getQuizResultDetails(resultId, userId) {
    const result = await prisma.quizResult.findUnique({
      where: { id: resultId }
    });

    if (!result || result.userId !== userId) {
      throw new Error('Quiz result not found or access denied');
    }

    return result;
  }

  // Create new quiz question (admin)
  async createQuestion(data) {
    const question = await prisma.quizQuestion.create({
      data: {
        moduleId: data.moduleId,
        questionText: data.questionText,
        questionType: data.questionType,
        options: data.options,
        correctAnswer: data.correctAnswer,
        explanation: data.explanation,
        difficultyLevel: data.difficultyLevel || 'intermediate',
        orderNumber: data.orderNumber,
      }
    });

    return question;
  }

  // Update quiz question (admin)
  async updateQuestion(questionId, data) {
    const question = await prisma.quizQuestion.update({
      where: { id: questionId },
      data: {
        questionText: data.questionText,
        questionType: data.questionType,
        options: data.options,
        correctAnswer: data.correctAnswer,
        explanation: data.explanation,
        difficultyLevel: data.difficultyLevel,
        orderNumber: data.orderNumber,
      }
    });

    return question;
  }

  // Delete quiz question (admin)
  async deleteQuestion(questionId) {
    await prisma.quizQuestion.delete({
      where: { id: questionId }
    });

    return { message: 'Question deleted successfully' };
  }
}

module.exports = new QuizService();
