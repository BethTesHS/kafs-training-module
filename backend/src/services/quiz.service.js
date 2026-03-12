const prisma = require('../config/database');

class QuizService {
  async submitQuiz(userId, moduleId, score, totalQuestions, answers) {
    // Look for an existing submission for this user and module
    const existingSubmission = await prisma.quiz_submissions.findFirst({
      where: {
        user_id: userId,
        module_id: String(moduleId)
      }
    });

    if (existingSubmission) {
      // Update existing record
      return await prisma.quiz_submissions.update({
        where: { id: existingSubmission.id },
        data: {
          score,
          total_questions: totalQuestions,
          answers,
          updated_at: new Date()
        }
      });
    } else {
      // Create new record
      return await prisma.quiz_submissions.create({
        data: {
          user_id: userId,
          module_id: String(moduleId),
          score,
          total_questions: totalQuestions,
          answers
        }
      });
    }
  }

  async getSubmission(userId, moduleId) {
    return await prisma.quiz_submissions.findFirst({
      where: {
        user_id: userId,
        module_id: String(moduleId)
      }
    });
  }
}

module.exports = new QuizService();