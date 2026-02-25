const quizService = require('../services/quiz.service');

class QuizController {
  async getQuizQuestions(req, res) {
    try {
      const questions = await quizService.getQuizQuestions(req.params.moduleId);
      
      res.status(200).json({
        message: 'Quiz questions retrieved successfully',
        data: questions,
        total: questions.length
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async submitQuiz(req, res) {
    try {
      const { answers, timeTaken } = req.body;
      
      if (!answers || typeof answers !== 'object') {
        return res.status(400).json({ error: 'Invalid answers format' });
      }

      if (!timeTaken || typeof timeTaken !== 'number') {
        return res.status(400).json({ error: 'Time taken is required' });
      }

      const result = await quizService.submitQuiz(
        req.user.userId,
        req.params.moduleId,
        answers,
        timeTaken
      );

      res.status(201).json({
        message: 'Quiz submitted successfully',
        data: result
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getResults(req, res) {
    try {
      const results = await quizService.getQuizResults(
        req.user.userId,
        req.query.moduleId || null
      );

      res.status(200).json({
        message: 'Quiz results retrieved successfully',
        data: results,
        total: results.length
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getResultDetails(req, res) {
    try {
      const result = await quizService.getQuizResultDetails(
        req.params.resultId,
        req.user.userId
      );

      res.status(200).json({
        message: 'Quiz result details retrieved successfully',
        data: result
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async createQuestion(req, res) {
    try {
      const question = await quizService.createQuestion(req.body);
      
      res.status(201).json({
        message: 'Question created successfully',
        data: question
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateQuestion(req, res) {
    try {
      const question = await quizService.updateQuestion(req.params.id, req.body);
      
      res.status(200).json({
        message: 'Question updated successfully',
        data: question
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteQuestion(req, res) {
    try {
      const result = await quizService.deleteQuestion(req.params.id);
      
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new QuizController();
