const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quiz.controller');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Get quiz questions (public)
router.get('/:moduleId/questions', quizController.getQuizQuestions);

// Submit quiz (protected)
router.post('/:moduleId/submit', authMiddleware, quizController.submitQuiz);

// Get user's quiz results
router.get('/results', authMiddleware, quizController.getResults);

// Get specific result details
router.get('/results/:resultId', authMiddleware, quizController.getResultDetails);

// Admin routes
router.post('/questions', authMiddleware, roleMiddleware(['admin']), quizController.createQuestion);
router.put('/questions/:id', authMiddleware, roleMiddleware(['admin']), quizController.updateQuestion);
router.delete('/questions/:id', authMiddleware, roleMiddleware(['admin']), quizController.deleteQuestion);

module.exports = router;
