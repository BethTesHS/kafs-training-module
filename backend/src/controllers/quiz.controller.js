const quizService = require('../services/quiz.service');

class QuizController {
  // Handle saving/updating a quiz
  async submitQuiz(req, res) {
    try {
      const { user_id, module_id, score, total_questions, answers } = req.body;

      if (!user_id || !module_id || score === undefined || !total_questions) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const submission = await quizService.submitQuiz(
        user_id,
        module_id,
        score,
        total_questions,
        answers
      );

      res.status(200).json({ success: true, data: submission });
    } catch (error) {
      console.error('Error submitting quiz:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Handle fetching a previous submission
  async getSubmission(req, res) {
    try {
      const { moduleId } = req.params;
      const { user_id } = req.query; // Usually passed as a query param if not using an auth middleware

      if (!user_id || !moduleId) {
        return res.status(400).json({ error: 'Missing user_id or module_id' });
      }

      const submission = await quizService.getSubmission(user_id, moduleId);
      
      if (!submission) {
        // Return 404 so the frontend knows they haven't taken it yet
        return res.status(404).json({ message: 'No previous submission found' });
      }

      res.status(200).json({ success: true, data: submission });
    } catch (error) {
      console.error('Error fetching quiz submission:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new QuizController();